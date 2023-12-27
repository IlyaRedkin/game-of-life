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
const getState = (point, map) => {
  return map?.[point.y]?.[point.x] || POINT_STATE.DEAD
}

const getPointState = ({point, maxCellCountHeight, maxCellCountWidth, aliveMap, neighbours}) => {
  const pointState = getState(
    getPointPosition({
      point,
      maxCellCountHeight,
      maxCellCountWidth
    }),
    aliveMap)
  const aliveNeighbours = Object.values(neighbours).filter((neighbour) => {
    return getState(
      getPointPosition({
        point: neighbour,
        maxCellCountHeight,
        maxCellCountWidth
      }),
      aliveMap
    ) === POINT_STATE.ALIVE
  })

  if (aliveNeighbours.length === MAX_NEIGHBOURS) {
    return POINT_STATE.ALIVE
  }
  if (pointState === POINT_STATE.ALIVE && aliveNeighbours.length === MIN_NEIGHBOURS) {
    return POINT_STATE.ALIVE
  }
  return POINT_STATE.DEAD
}

const setAliveMapValue = (aliveMap, point, state, maxCellCountHeight, maxCellCountWidth) => {
  const realPoint = getPointPosition({
    point,
    maxCellCountHeight,
    maxCellCountWidth
  })
  if (!aliveMap[realPoint.y]) {
    aliveMap[realPoint.y] = {}
  }
  aliveMap[realPoint.y][realPoint.x] = state
}
const getCycle = ({pointsToCheck, maxCellCountHeight, maxCellCountWidth, aliveMap}) => {
  const newAliveMap = {}
  const nextCyclePointsToCheck = {}
  pointsToCheck.forEach((pointToCheck) => {
    const neighbours = getNeighbours(pointToCheck)
    const checkedPointState = getPointState({
      point: pointToCheck,
      maxCellCountHeight,
      maxCellCountWidth,
      aliveMap,
      neighbours
    })
    setAliveMapValue(newAliveMap, pointToCheck, checkedPointState, maxCellCountHeight, maxCellCountWidth)
    if (getState(pointToCheck, aliveMap) !== checkedPointState || checkedPointState === POINT_STATE.ALIVE) {
      Object.values(neighbours).forEach((point) => {
        const realPoint = getPointPosition({point, maxCellCountHeight, maxCellCountWidth})
        nextCyclePointsToCheck[`${realPoint.y}_${realPoint.x}`] = realPoint
      })
    }
  })
  return {
    newAliveMap,
    nextCyclePointsToCheck: Object.values(nextCyclePointsToCheck)
  }
}

const getPointsToCheck = (data) => {
  const pointList = Object.entries(data).reduce((acc, [y, xObj]) => {
    Object.keys(xObj).forEach((x) => {
      acc.push({y: Number(y), x: Number(x)})
    })
    return acc
  }, [])
  const initialNeighbours = pointList.reduce((acc, point) => {
    acc.push(...Object.values(getNeighbours(point)))
    return acc
  }, [])
  return [...pointList, ...initialNeighbours]
}

const putNewFormOfLifeIntoPool = (pool, formLifeMap, referencePoint) => {
  Object.entries(formLifeMap).forEach(([indexY, xLine]) => {
    Object.entries(xLine).forEach(([indexX, state]) => {
      const y = Number(referencePoint.y) + Number(indexY)
      const x = Number(referencePoint.x) + Number(indexX)
      if (!pool[y]) {
        pool[y] = {}
      }
      pool[y][x] = state
    })
  })
}
