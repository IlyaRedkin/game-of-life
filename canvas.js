
const getCanvasContext = ({ width: widthCount, height: heightCount }) => {
  const canvas = document.querySelector('#canvas');
  canvas.width = widthCount;
  canvas.height = heightCount;

  return canvas.getContext('2d');
}

const getFieldSize = ({ width: widthCount, height: heightCount }) => {
  const width = widthCount * (cellSizePx + 1);
  const height = heightCount * (cellSizePx + 1);

  return { width, height }
}

const drawGrid = ({ i, j, x, y, context, dataMap }) => {
  const startXpx = j * cellSizePx;
  const startYpx = i * cellSizePx;
    // "life" rect
  context.beginPath();
  context.fillStyle = dataMap?.[y]?.[x] === '1' ? '#000000' : '#FFFFFF';
  context.fillRect(startXpx, startYpx, cellSizePx, cellSizePx);
}

const getCellPoint = (px) => parseInt(px/cellSizePx, 10)
const updateGrid = ({ from, to, context, dataMap }) => {
  const { x: xFrom, y: yFrom } = from
  const { x: xTo, y: yTo } = to
  const iFrom = getCellPoint(yFrom)
  const iTo = getCellPoint(yTo)
  const jFrom = getCellPoint(xFrom)
  const jTo = getCellPoint(xTo)

  for (let i = iFrom; i < iTo; i++) {
    for (let j = jFrom; j < jTo; j++) {
      drawGrid({ y: i, x: j, i: i - iFrom, j: j - jFrom,  context, dataMap })
    }
  }
}
