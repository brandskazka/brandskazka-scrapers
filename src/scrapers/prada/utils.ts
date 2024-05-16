export function generateProductUrlHandle({ objectID, Title }: any) {
  const merchantId = "prada";
  const brand = "prada";

  const shortDescription = Title.toLowerCase()
    .replace(/[а-яё]+/g, "")
    .replace(/\s+/g, "-");

  return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}
