export const isValidDoubleCheck = <T>(ary: Array<T>) => {
  let t = ary.filter((x, i, self) => {
    return self.indexOf(x) !== i
  })
  return 0 < t.length ? true : false
}
