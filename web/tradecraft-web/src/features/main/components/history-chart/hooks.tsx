const useInvertColors = (inverted: boolean) => {
  const firstColor = "var(--color-orange-400)";
  const secondColor = "var(--color-lime-500)";
  return inverted ? [firstColor, secondColor] : [secondColor, firstColor];
}

export {useInvertColors}
