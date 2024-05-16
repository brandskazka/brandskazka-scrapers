export function generateProductUrlHandle(
  product: LouisVuittonProduct | LouisVuittonSearchResultItem
) {
  const merchantId = 'lv';
  const brand = 'louis-vuitton';

  const shortDescription = product.name
    .toLowerCase()
    .replace(/[а-яё]+/g, '')
    .replace(/\s+/g, '-');

  return `${brand}-${shortDescription}-${merchantId}-${
    (product as LouisVuittonProduct).productId ||
    (product as LouisVuittonSearchResultItem).productId
  }`;
}
