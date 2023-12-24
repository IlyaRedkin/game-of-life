const getNeighbours = (point) => {
  const top = {
    y: point.y - 1,
  }
  const bottom = {
    y: point.y + 1,
  }
  const left = {
    x: point.x - 1,
  }
  const right = {
    x: point.x + 1,
  }
  const topLeft = {...top, ...left}
  const topRight = {...top, ...right}
  const bottomLeft = {...bottom, ...left}
  const bottomRight = {...bottom, ...right}

  return {
    top: {...point, ...top},
    bottom: {...point, ...bottom},
    left: {...point, ...left},
    right: {...point, ...right},
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
  }
}

const POINT_STATE = {
  ALIVE: '1',
  DEAD: '0',
}
const MIN_NEIGHBOURS = 2
const MAX_NEIGHBOURS = 3
const getPointPosition = (point, map) => {
  const mapH = map.length
  const mapW = map[0].length
  const {x, y} = point
  const realX = x >= 0 && x < mapW ? x : (mapW - Math.abs(x)) % mapW
  const realY = y >= 0 && y < mapH ? y : (mapH - Math.abs(y)) % mapH
  return {y: realY, x: realX}
}
const getState = (point, map) => {
  return map[point.y][point.x]
}
const getPointState = (point, map) => {
  const neighbours = getNeighbours(point)
  const pointState = getState(getPointPosition(point, map), map)
  const aliveNeighbours = Object.values(neighbours).filter((neighbour) => {
    return getState(getPointPosition(neighbour, map), map) === POINT_STATE.ALIVE
  })

  if (aliveNeighbours.length === MAX_NEIGHBOURS) {
    return POINT_STATE.ALIVE
  }
  if (pointState === POINT_STATE.ALIVE && aliveNeighbours.length === MIN_NEIGHBOURS) {
    return POINT_STATE.ALIVE
  }
  return POINT_STATE.DEAD
}

const getCycle = (map) => {
  const mapCopy = map.map((line) => [...line])
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      mapCopy[y][x] = getPointState({x, y}, map)
    }
  }
  return mapCopy
}
