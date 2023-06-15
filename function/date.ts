export const compareTimestamps = (timestamp1: number, timestamp2: number) => {
  const date1 = new Date(timestamp1)
  const date2 = new Date(timestamp2)

  const year1 = date1.getFullYear()
  const month1 = date1.getMonth()
  const day1 = date1.getDate()

  const year2 = date2.getFullYear()
  const month2 = date2.getMonth()
  const day2 = date2.getDate()

  return year1 === year2 && month1 === month2 && day1 === day2
}

export const getDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)

  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return formattedDate
}
