export const VERTICAL = {
  TOP: 0,
  MIDDLE: 1,
  BOTTOM: 2,
} as const
export type VerticalType = typeof VERTICAL[keyof typeof VERTICAL]

export const HORIZONTAL = {
  LEFT: 0,
  CENTER: 1,
  RIGHT: 2,
} as const
export type HorizontalType = typeof HORIZONTAL[keyof typeof HORIZONTAL]

export const MATRIX = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
} as const
export type MatricxType = typeof MATRIX[keyof typeof MATRIX]
