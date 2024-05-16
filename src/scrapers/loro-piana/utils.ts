import { ExternalMerchantId } from 'types/types';
import { SearchResultItem } from './types';

export function generateProductUrlHandle({ objectID, name, priceValue }: SearchResultItem) {
  const merchantId: ExternalMerchantId = 'loropiana';
  const brand = 'loro-piana';

  const productId = objectID;
  const productName = name.en[0];

  const shortDescription = productName
    ?.toLowerCase()
    .replace(/[а-яё]+/g, '')
    .replace(/\s+/g, '-')
    .replaceAll('/', '');

  return `${brand}-${shortDescription}-${merchantId}-${productId}:${priceValue}`;
}
