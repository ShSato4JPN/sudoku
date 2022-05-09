export const isValidDoubleCheck = <T>(ary: Array<T>) => {
  let t = ary.filter((x, i, self) => {
    return self.indexOf(x) !== i
  })
  return 0 < t.length ? true : false
}

export const convertSudokuFormat = (ary: number[][][][]) => {
  const hMatrix = []
  for (let h = 0; h < 3; h++) {
    const vMatrix = []
    for (let v = 0; v < 3; v++) {
      const yMatrix = []
      for (let y = 0; y < 3; y++) {
        yMatrix.push([[ary[h][v][y][0]], [ary[h][v][y][1]], [ary[h][v][y][2]]])
      }
      vMatrix.push(yMatrix)
    }
    hMatrix.push(vMatrix)
  }
  return hMatrix
}

export const initMatrix = () => {
  const hMatrix = []
  for (let h = 0; h < 3; h++) {
    const vMatrix = []
    for (let v = 0; v < 3; v++) {
      const yMatrix = []
      for (let y = 0; y < 3; y++) {
        yMatrix.push([[0], [0], [0]])
      }
      vMatrix.push(yMatrix)
    }
    hMatrix.push(vMatrix)
  }
  return hMatrix
}
