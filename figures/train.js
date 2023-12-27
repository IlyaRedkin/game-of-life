const trainStr = `.OOO...........OOO
O..O..........O..O
...O....OOO......O
...O....O..O.....O
..O....O........O.`

const trainMap = getObjectFromArray(trainStr
  .replaceAll('O', '1')
  .split('\n')
  .map((i) => i.split(''))
)
