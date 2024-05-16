export function generateProductUrlHandle({ objectID, Title }: any) {
  const merchantId = "miumiu";
  const brand = "miumiu";

  const shortDescription = Title.toLowerCase()
    .replace(/[а-яё]+/g, "")
    .replace(/\s+/g, "-");

  return `${brand}-${shortDescription}-${merchantId}-${objectID}`;
}
