/**
 * Safe one-time migration: assign selling units to existing products
 * that are missing a `unit` field, or still have the blind "piece" default
 * when the product name/category clearly implies another unit.
 *
 * Usage (from /server):
 *   npm run migrate:units:list   # inspect current DB products
 *   npm run migrate:units:dry    # show planned updates
 *   npm run migrate:units        # apply updates
 *
 * - Uses the native collection (not Mongoose defaults) so missing fields are visible
 * - Does not change price, stock, images, shopOwner, or other fields
 * - Does not touch createdAt/updatedAt
 * - Does not create duplicate products
 * - Safe to re-run
 */

import "dotenv/config";
import mongoose from "mongoose";

const VALID_UNITS = [
  "kg",
  "g",
  "litre",
  "ml",
  "piece",
  "packet",
  "box",
];

/**
 * Keyword → unit rules (checked in order; first match wins).
 */
const NAME_RULES = [
  {
    unit: "litre",
    keywords: [
      "sunflower oil",
      "mustard oil",
      "coconut oil",
      "groundnut oil",
      "olive oil",
      "oil",
    ],
  },
  {
    unit: "litre",
    keywords: ["milk", "buttermilk", "lassi", "juice", "water"],
  },
  {
    unit: "packet",
    keywords: [
      "curd",
      "yogurt",
      "yoghurt",
      "maggi",
      "noodles",
      "pasta",
      "biscuit",
      "chips",
      "namkeen",
    ],
  },
  {
    unit: "piece",
    keywords: ["egg", "eggs", "bread", "bun", "roti"],
  },
  {
    unit: "kg",
    keywords: [
      "tomato",
      "tomatoes",
      "potato",
      "potatoes",
      "onion",
      "onions",
      "carrot",
      "cabbage",
      "cauliflower",
      "brinjal",
      "beans",
      "spinach",
      "lady finger",
      "okra",
      "ginger",
      "garlic",
      "green chilli",
      "chilli",
      "capsicum",
      "cucumber",
      "pumpkin",
      "lemon",
      "coriander",
    ],
  },
  {
    unit: "kg",
    keywords: [
      "rice",
      "basmati",
      "sona masoori",
      "wheat",
      "atta",
      "flour",
      "sugar",
      "salt",
      "dal",
      "toor",
      "moong",
      "chana",
      "urad",
      "pulses",
      "ragi",
      "jowar",
      "bajra",
      "maida",
      "sooji",
      "semolina",
    ],
  },
  {
    unit: "kg",
    keywords: [
      "apple",
      "banana",
      "orange",
      "mango",
      "grape",
      "papaya",
      "guava",
      "pomegranate",
      "watermelon",
      "pineapple",
    ],
  },
  {
    unit: "ml",
    keywords: ["sauce", "vinegar", "essence"],
  },
  {
    unit: "box",
    keywords: ["box", "carton"],
  },
  {
    unit: "g",
    keywords: [
      "spice",
      "masala",
      "turmeric",
      "chilli powder",
      "cumin",
      "pepper",
    ],
  },
];

const CATEGORY_DEFAULTS = {
  Vegetables: "kg",
  Fruits: "kg",
  Dairy: "litre",
  Groceries: "kg",
  Beverages: "litre",
  Snacks: "packet",
  Household: "piece",
  "Personal Care": "piece",
  Medicines: "piece",
  Other: "piece",
};

function inferUnit(name = "", category = "") {
  const n = String(name).toLowerCase().trim();

  for (const rule of NAME_RULES) {
    for (const keyword of rule.keywords) {
      if (n.includes(keyword)) {
        return rule.unit;
      }
    }
  }

  if (category && CATEGORY_DEFAULTS[category]) {
    return CATEGORY_DEFAULTS[category];
  }

  return "piece";
}

function shouldUpdate(product, inferred) {
  const current = product.unit;

  // Missing / empty / invalid → always set inferred unit
  if (current == null || current === "" || !VALID_UNITS.includes(current)) {
    return true;
  }

  // Blind "piece" default on old grocery data → remap when name/category says otherwise
  if (current === "piece" && inferred !== "piece") {
    return true;
  }

  return false;
}

async function main() {
  const args = process.argv.slice(2);
  const listOnly = args.includes("--list");
  const dryRun = args.includes("--dry-run");

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set. Create server/.env first.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB\n");

  // Native collection so Mongoose schema defaults do not hide missing `unit`
  const collection = mongoose.connection.db.collection("products");
  const products = await collection
    .find({})
    .project({ name: 1, category: 1, unit: 1, price: 1, stock: 1 })
    .toArray();

  console.log(`Total products: ${products.length}\n`);

  if (listOnly) {
    console.log("name | category | unit | price | stock | inferred");
    console.log("-".repeat(80));
    for (const p of products) {
      const inferred = inferUnit(p.name, p.category);
      console.log(
        `${p.name} | ${p.category} | ${p.unit ?? "(missing)"} | ₹${p.price} | ${p.stock} | → ${inferred}`
      );
    }
    await mongoose.disconnect();
    return;
  }

  const toUpdate = [];

  for (const product of products) {
    const inferred = inferUnit(product.name, product.category);

    if (!shouldUpdate(product, inferred)) continue;
    if (product.unit === inferred) continue;

    toUpdate.push({
      id: product._id,
      name: product.name,
      category: product.category,
      currentUnit: product.unit ?? "(missing)",
      newUnit: inferred,
    });
  }

  if (toUpdate.length === 0) {
    console.log("No products need a unit update. Nothing to do.");
    await mongoose.disconnect();
    return;
  }

  console.log(`Products to update: ${toUpdate.length}\n`);
  for (const row of toUpdate) {
    console.log(
      `  ${row.name} [${row.category}]  ${row.currentUnit} → ${row.newUnit}`
    );
  }

  if (dryRun) {
    console.log("\nDry run only — no changes written.");
    await mongoose.disconnect();
    return;
  }

  let updated = 0;

  for (const row of toUpdate) {
    await collection.updateOne(
      { _id: row.id },
      { $set: { unit: row.newUnit } }
    );
    updated += 1;
  }

  console.log(`\nUpdated ${updated} product(s).`);
  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
