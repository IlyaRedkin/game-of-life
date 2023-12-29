const getCanvasContext = ({width: widthCount, height: heightCount}) => {
  const canvas = document.querySelector('#canvas');
  canvas.width = widthCount;
  canvas.height = heightCount;

  return canvas.getContext('2d');
}

const getFieldSize = ({width: widthCount, height: heightCount}) => {
  const width = widthCount * (cellSizePx + 1);
  const height = heightCount * (cellSizePx + 1);

  return {width, height}
}

const drawGrid = ({y, x, context, pointState}) => {
  // "life" rect
  context.beginPath();
  context.fillStyle = pointState === '1' ? '#000000' : '#FFFFFF';
  context.fillRect(x, y, cellSizePx, cellSizePx);
}

const getCellPoint = (px) => parseInt(px / cellSizePx, 10)
const redrawGrid = ({from, to, context, dataMap}) => {
  const {x: xFrom, y: yFrom} = from
  const {x: xTo, y: yTo} = to
  const iFrom = getCellPoint(yFrom)
  const iTo = getCellPoint(yTo)
  const jFrom = getCellPoint(xFrom)
  const jTo = getCellPoint(xTo)

  for (let i = iFrom; i < iTo; i++) {
    for (let j = jFrom; j < jTo; j++) {
      drawGrid({
        y: (i - iFrom) * cellSizePx,
        x: (j - jFrom) * cellSizePx,
        context,
        pointState: dataMap?.[i]?.[j]
      })
    }
  }
}
const updateGrid = ({from, to, context, dataMap}) => {
  const {x: xFrom, y: yFrom} = from
  const {x: xTo, y: yTo} = to
  const iFrom = getCellPoint(yFrom)
  const iTo = getCellPoint(yTo)
  const jFrom = getCellPoint(xFrom)
  const jTo = getCellPoint(xTo)

  for (let i = iFrom; i < iTo; i++) {
    if (dataMap?.[i]) {
      for (let j = jFrom; j < jTo; j++) {
        if (dataMap?.[i]?.[j]) {
          drawGrid({
            y: (i - iFrom) * cellSizePx,
            x: (j - jFrom) * cellSizePx,
            context,
            pointState: dataMap?.[i]?.[j]
          })
        }
      }
    }
  }
}

const drawLifeForm = (startPoint, lifeMap, context) => {
  Object.entries(lifeMap).forEach(([indexY, lineX]) => {
    Object.entries(lineX).forEach(([indexX, state]) => {
      drawGrid({
        y: startPoint.y + Number(indexY) * cellSizePx,
        x: startPoint.x + Number(indexX) * cellSizePx,
        context,
        pointState: state
      })
    })
  }, [])
}
