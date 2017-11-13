export const areDateRangesOverlapping = (range1, range2) => (
  range1.start < range2.end && range2.start < range1.end
)
