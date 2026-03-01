const useInvertColors = (inverted: boolean) => {
  const firstColor = "var(--color-lime-400)";
  const secondColor = "var(--color-orange-400)";
  return inverted ? [firstColor, secondColor] : [secondColor, firstColor];
}

export {useInvertColors}
