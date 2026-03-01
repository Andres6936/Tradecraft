const useInvertColors = (inverted: boolean) => {
  const firstColor = "var(--color-orange-400)";
  const secondColor = "var(--color-lime-400)";
  return inverted ? [firstColor, secondColor] : [secondColor, firstColor];
}

export {useInvertColors}
