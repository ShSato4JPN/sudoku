import { data, values } from './sudoku-data.js'
import { VERTICAL, VerticalType, HORIZONTAL, HorizontalType } from './sudoku-types.js'
import * as Utils from './sudoku-utils.js'

const fields = Utils.convertSudokuFormat(data)

// 縦軸同値チェック
const isExistsSameValueOnVertical = (fieldX: HorizontalType, cellX: number, checkVal: number) => {
  let chkList: Array<number> = [checkVal]
  for (const v of Object.values(VERTICAL)) {
    for (let i = 0; i < 3; i++) {
      if (fields[v][fieldX][i][cellX].length === 1 && checkVal === fields[v][fieldX][i][cellX][0]) {
        return true
      }
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
      if (fields[fieldY][v][cellY][i].length === 1 && checkVal === fields[fieldY][v][cellY][i][0]) {
        return true
      }
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
      if (
        fields[fieldY][fieldX][y][x].length === 1 &&
        checkVal === fields[fieldY][fieldX][y][x][0]
      ) {
        return true
      }
    }
  }
  return false
}

//isExistsSameValueInField(VERTICAL.MIDDLE, HORIZONTAL.RIGHT, 2)

const getFieldCandidatesList = (fieldY: VerticalType, fieldX: HorizontalType) => {
  let tmpAry: number[] = Array()
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (fields[fieldY][fieldX][y][x].length === 0 && fields[fieldY][fieldX][y][x][0] !== 0) {
        tmpAry.push(fields[fieldY][fieldX][y][x][0])
      }
    }
  }
  return values.filter((v) => !tmpAry.includes(v))
}

const isExistsCandidatesData = () => {
  for (const v of Object.values(VERTICAL)) {
    for (const h of Object.values(HORIZONTAL)) {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          if (1 < fields[v][h][y][x].length) return true
        }
      }
    }
  }
  return false
}

// console.log(getFieldCandidatesList(VERTICAL.TOP, HORIZONTAL.LEFT))

//const fields = Utils.initMatrix()
let count = 1
while (isExistsCandidatesData) {
  for (const v of Object.values(VERTICAL)) {
    for (const h of Object.values(HORIZONTAL)) {
      // 候補リストを取得
      const candidatesList = getFieldCandidatesList(v, h)
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          //const insertList: number[] = []
          if (fields[v][h][y][x].length === 1) {
            if (fields[v][h][y][x][0] === 0) {
              // 候補リストの中からさらに絞り込む
              const tempAry: number[] = []
              for (const val of candidatesList) {
                if (
                  !isExistsSameValueOnVertical(h, x, Number(val)) &&
                  !isExistsSameValueOnHorizontal(v, y, Number(val)) &&
                  !isExistsSameValueInField(v, h, Number(val))
                ) {
                  tempAry.push(Number(val))
                }
              }
              fields[v][h][y][x] = tempAry
            } else {
              fields[v][h][y][x] = [fields[v][h][y][x][0]]
            }
          } else {
            const tempAry: number[] = []
            for (const val of fields[v][h][y][x]) {
              if (
                !isExistsSameValueOnVertical(h, x, Number(val)) &&
                !isExistsSameValueOnHorizontal(v, y, Number(val)) &&
                !isExistsSameValueInField(v, h, Number(val))
              ) {
                tempAry.push(Number(val))
              }
            }
            fields[v][h][y][x] = tempAry
          }
          //candidatesList[v][h][y].push(insertList)
        }
      }
    }
  }
  console.log(`count: ${count}`)
  count++
}

console.log('fin')
