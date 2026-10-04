const UNIT_LABELS = {
  kg: "kg",
  g: "gram",
  litre: "litre",
  ml: "ml",
  piece: "piece",
  packet: "packet",
  box: "box",
};

const UNIT_PLURALS = {
  g: "grams",
  litre: "litres",
  ml: "ml",
  piece: "pieces",
  packet: "packets",
  box: "boxes",
  kg: "kg",
};

const PER_UNIT_MAP = {
  kg: "per kg",
  g: "per gram",
  litre: "per litre",
  ml: "per ml",
  piece: "per piece",
  packet: "per packet",
  box: "per box",
};

/**
 * Display label for a product unit (litre → litre, g → gram).
 */
export function formatUnit(unit) {
  if (!unit) return UNIT_LABELS.piece;
  return UNIT_LABELS[unit] || unit;
}

/**
 * Explicit "per unit" text (e.g. per litre, per kg, per gram, per packet).
 */
export function formatPerUnit(unit) {
  const key = unit || "piece";
  return PER_UNIT_MAP[key] || `per ${formatUnit(key)}`;
}

/**
 * Quantity-aware unit label for stock/order displays.
 * e.g. 1 piece, 12 pieces, 20 kg, 10 litres, 500 grams, 3 packets
 */
export function formatUnitLabel(unit, quantity = 1) {
  const key = unit || "piece";
  const count = Number(quantity);

  if (count !== 1 && UNIT_PLURALS[key]) {
    return UNIT_PLURALS[key];
  }

  return formatUnit(key);
}

/**
 * Price with unit: ₹65 / kg (per kg), ₹60 / litre (per litre)
 */
export const formatPriceWithUnit = (price, unit) => {
  const formattedPrice = `₹${price}`;

  const label =
    unit === "litre"
      ? "L"
      : unit || "piece";

  return `${formattedPrice} / ${label}`;
};
/**
 * Stock availability: Available: 20 kg, Available: 25 packets
 */
export function formatStock(stock, unit) {
  return `Available: ${stock} ${formatUnitLabel(unit, stock)}`;
}

