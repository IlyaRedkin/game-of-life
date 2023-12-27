const randomField = [
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
]

const getRandomFormLife = () => {
  return getObjectFromArray(randomField.reduce((acc, item, index) => {
      item.forEach(() => {
        if (!acc[index]) {
          acc.push([])
        }
        acc[index].push(Math.random() > 0.5 ? '1' : '0')
      })
      return acc
    }, [])
  )

}
