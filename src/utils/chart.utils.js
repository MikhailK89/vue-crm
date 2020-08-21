export function getChartColors(categories) {
  let basicColors = []

  const randomColorsPicker = () => {
    basicColors = categories.map(_ => {
      const red = Math.floor(Math.random() * 255)
      const green = Math.floor(Math.random() * 255)
      const blue = Math.floor(Math.random() * 255)
      const colorStr = `${red}, ${green}, ${blue}`

      if (basicColors.includes(colorStr)) {
        randomColorsPicker()
      } else {
        return colorStr
      }
    })
  }

  return (type) => {
    if (type === 'background') {
      randomColorsPicker()
      return basicColors.map(clr => `rgba(${clr}, 0.2)`)
    } else {
      return basicColors.map(clr => `rgba(${clr}, 1)`)
    }
  }
}
