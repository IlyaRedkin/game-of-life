const getRealValue = (value, maxValue) => {
  if (value < 0) {
    return (maxValue - Math.abs(value)) % maxValue
  }
  if (value > maxValue) {
    return value % maxValue
  }

  return value
}

const getPointPosition = ({ point, maxCellCountHeight, maxCellCountWidth }) => {
  const {x, y} = point
  const realX = getRealValue(x, maxCellCountWidth)
  const realY = getRealValue(y, maxCellCountHeight)
  if (y > maxCellCountHeight) {
    console.log('y', y)
    console.log('realY', realY)
  }
  if (x > maxCellCountWidth) {
    console.log('x', x)
    console.log('realX', realX)
  }
  return {y: realY, x: realX}
}

const getObjectFromArray = (arr) => {
  return arr.reduce((acc, xLine, y) => {
    if (!acc[y]) {
      acc[y] = {}
    }
    xLine.forEach((state, x) => {
      if (state === '1') {
        acc[y][x] = state
      }
    })
    return acc
  }, {})
}
