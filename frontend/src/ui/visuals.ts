export function visualStyle(image: string) {
  if (image.startsWith("http")) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(19, 34, 56, 0.08), rgba(19, 34, 56, 0.2)), url("${image}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    } as const;
  }

  return { background: image } as const;
}
