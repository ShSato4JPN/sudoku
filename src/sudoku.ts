import { data as fields, values } from './sudoku-data.js'
import { VERTICAL, VerticalType, HORIZONTAL, HorizontalType } from './sudoku-types.js'
import * as Utils from './sudoku-utils.js'

// 縦軸同値チェック
const isExistsSameValueOnVertical = (fieldX: HorizontalType, cellX: number, checkVal: number) => {
  let chkList: Array<number> = [checkVal]
  for (const v of Object.values(VERTICAL)) {
    for (let i = 0; i < 3; i++) {
      if (checkVal === fields[v][fieldX][i][cellX]) return true
    }
  }
  return false
}

//isExistsSameValueOnVertical(HORIZONTAL.LEFT, 0)

//　横軸同値チェック
const isExistsSameValueOnHorizontal = (fieldY: VerticalType, cellY: number, checkVal: number) => {
  let chkList: Array<number> = [checkVal]
  for (const v of Object.values(HORIZONTAL)) {
    for (let i = 0; i < 3; i++) {
      if (checkVal === fields[fieldY][v][cellY][i]) return true
    }
  }
  return false
}

//isExistsSameValueOnHorizontal(VERTICAL.MIDDLE, 1)

// 所属フィールドチェック
const isExistsSameValueInField = (
  fieldY: VerticalType,
  fieldX: HorizontalType,
  checkVal: number
) => {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (checkVal === fields[fieldY][fieldX][y][x]) return true
    }
  }
  return false
}

//isExistsSameValueInField(VERTICAL.MIDDLE, HORIZONTAL.RIGHT, 2)

const getFieldCandidatesList = (fieldY: VerticalType, fieldX: HorizontalType) => {
  let tmpAry: number[] = Array()
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (fields[fieldY][fieldX][y][x] !== 0) {
        tmpAry.push(fields[fieldY][fieldX][y][x])
      }
    }
  }
  return values.filter((v) => !tmpAry.includes(v))
}

// console.log(getFieldCandidatesList(VERTICAL.TOP, HORIZONTAL.LEFT))

const saveAry = Utils.initMatrix()
for (const v of Object.values(VERTICAL)) {
  for (const h of Object.values(HORIZONTAL)) {
    // 候補リストを取得
    const candidatesList = getFieldCandidatesList(v, h)
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const insertList: number[] = []
        if (fields[v][h][y][x] === 0) {
          // 候補リストの中からさらに絞り込む
          const tempAry: number[] = []
          for (const val of candidatesList) {
            if (
              !isExistsSameValueOnVertical(h, x, Number(val)) &&
              !isExistsSameValueOnHorizontal(v, y, Number(val))
            ) {
              tempAry.push(Number(val))
            }
          }
          saveAry[v][h][y][x] = tempAry
        } else {
          saveAry[v][h][y][x] = [fields[v][h][y][x]]
        }
        //candidatesList[v][h][y].push(insertList)
      }
    }
  }
}

const list = getFieldCandidatesList(VERTICAL.TOP, HORIZONTAL.LEFT)
const temp = []
for (let y = 0; y < 3; y++) {
  for (let x = 0; x < 3; x++) {
    if (fields[VERTICAL.TOP][HORIZONTAL.LEFT][y][x] === 0) {
    }
  }
}
