let cellSide = 10;
const borderWidth = 1;

const getCanvasContext = ({ width: widthCount, height: heightCount }) => {
  const canvas = document.querySelector('#canvas');
  canvas.width = widthCount;
  canvas.height = heightCount;

  return canvas.getContext('2d');
}

const getFieldSize = ({ width: widthCount, height: heightCount }) => {
  const width = widthCount * (cellSide + 1);
  const height = heightCount * (cellSide + 1);

  return { width, height }
}

const drawGrid = ({ i, j, x, y, context, dataMap }) => {
  const startX = j * cellSide + 2 * borderWidth;
  const startY = i * cellSide + 2 * borderWidth;
  context.beginPath();
  context.fillStyle = '#000000';
  context.fillRect(startX, startY, cellSide, cellSide);
  context.beginPath();
  context.fillStyle = dataMap?.[y]?.[x] === '1' ? '#000000' : '#FFFFFF';
  context.fillRect(startX + borderWidth, startY + borderWidth, cellSide - 2 * borderWidth, cellSide - 2 * borderWidth);
}

const getGridPoint = (coordinate) => parseInt(coordinate/cellSide, 10)
const updateGrid = ({ from, to, context, dataMap }) => {
  const { x: xFrom, y: yFrom } = from
  const { x: xTo, y: yTo } = to
  const iFrom = getGridPoint(yFrom)
  const iTo = getGridPoint(yTo)
  const jFrom = getGridPoint(xFrom)
  const jTo = getGridPoint(xTo)

  for (let i = iFrom; i < iTo; i++) {
    for (let j = jFrom; j < jTo; j++) {
      drawGrid({ y: i, x: j, i: i - iFrom, j: j - jFrom,  context, dataMap })
    }
  }
}



