const getRealValue = (value, maxValue) => {
  if (value < 0) {
    return (maxValue - Math.abs(value)) % maxValue
  }
  if (value > maxValue) {
    return value % maxValue
  }

  return value
}

const getPointPosition = ({ point, mapHeight, mapWidth }) => {
  const {x, y} = point
  const realX = getRealValue(x, mapWidth)
  const realY = getRealValue(y, mapHeight)
  if (y > mapHeight) {
    console.log('y', y)
    console.log('realY', realY)
  }
  if (x > mapWidth) {
    console.log('x', x)
    console.log('realX', realX)
  }
  return {y: realY, x: realX}
}

const getEmptyField = ({width, height}) => {
  return new Array(height).fill('').map(() => new Array(width).fill('').map(() => POINT_STATE.DEAD))
}

const updateFieldByAddedFigure = (startPoint, field, figure) => {
  for (let y = 0; y < figure.length; y++) {
    for (let x = 0; x < figure[0].length; x++) {
      const putPoint = {y: startPoint.y + y, x: startPoint.x + x}
      const possiblePointPosition = getPointPosition(putPoint, field)
      field[possiblePointPosition.y][possiblePointPosition.x] = figure[y][x]
    }
  }
}

const getObjectFromArray = (arr) => {
  return arr.reduce((acc, xLine, y) => {
    if (!acc[y]) {
      acc[y] = {}
    }
    xLine.forEach((state, x) => {
      acc[y][x] = state
    })
    return acc
  }, {})
}
