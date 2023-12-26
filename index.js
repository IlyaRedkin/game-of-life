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
// const getPointPosition = ({ point, mapHeight, mapWidth }) => {
//   const {x, y} = point
//   const realX = x >= 0 && x < mapWidth ? x : (mapWidth - Math.abs(x)) % mapWidth
//   const realY = y >= 0 && y < mapHeight ? y : (mapHeight - Math.abs(y)) % mapHeight
//   return {y: realY, x: realX}
// }

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
  const nextCyclePointsToCheck = new Map()
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
      const arr = [
        pointToCheck,
        ...Object.values(neighbours),
      ]
      arr.reduce((acc, item) => {
        const exists = acc.find((i) => i.x === item.x && i.y === item.y)
        if (!exists) {
          acc.push(item)
        }
        return acc
      }, []).forEach((point) => {
        nextCyclePointsToCheck.set(`${point.x}_${point.y}`, point)
      })
    }
  })
  return {
    newAliveMap,
    nextCyclePointsToCheck: Object.values(Object.fromEntries(nextCyclePointsToCheck))
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

// const getCyclesLocal = (data) => {
//   let count = 0
//   let cycleAliveMap = data
//   const pointsToCheck = getPointsToCheck(data)
//   while(count < 10) {
//     cycleAliveMap = getCycle({pointsToCheck, mapHeight: 100, mapWidth: 100, aliveMap: cycleAliveMap})
//     count += 1
//   }
//   return cycleAliveMap
// }

// const plannerMap = {
//   0: {
//     1: '1'
//   },
//   1: {
//     1: '1',
//     2: '1'
//   },
//   2: {
//     0: '1',
//     1: '1'
//   }
// }
// console.log('getCyclesLocal', getCyclesLocal(plannerMap))
