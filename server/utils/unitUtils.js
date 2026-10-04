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

export function formatUnit(unit) {
  if (!unit) return UNIT_LABELS.piece;
  return UNIT_LABELS[unit] || unit;
}

export function formatUnitLabel(unit, quantity = 1) {
  const key = unit || "piece";
  const count = Number(quantity);

  if (count !== 1 && UNIT_PLURALS[key]) {
    return UNIT_PLURALS[key];
  }

  return formatUnit(key);
}

