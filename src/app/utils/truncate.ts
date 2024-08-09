export const truncate = (text: string, index: number, size: number): string => {
  if (index - 20 > 0) {
    text = `...${text.substring(index - size / 2, index + size / 2)}...`
  } else {
    text = `${text.substring(index - size / 2, index + size / 2 + 20)}...`
  }
  return text
}
