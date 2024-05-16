import { ExternalMerchantId } from 'types/types';
import { SearchResultItem, SingleItem } from './types';

export function generateProductUrlHandleForSearchResultItem({ id, name }: SearchResultItem) {
  const merchantId: ExternalMerchantId = 'dolcegabbana';
  const brand = 'dolcegabbana';

  const shortDescription = name
    .toLowerCase()
    .replace(/[а-яё]+/g, '')
    .replace(/\s+/g, '-');

  return `${brand}-${shortDescription}-${merchantId}-${id}`;
}

export function generateProductUrlHandleForSingleItem(item?: SingleItem) {
  if (!item) return null;

  const { id, name } = item;
  const merchantId: ExternalMerchantId = 'dolcegabbana';
  const brand = 'dolcegabbana';

  const shortDescription = name
    ?.toLowerCase()
    .replace(/[а-яё]+/g, '')
    .replace(/\s+/g, '-');

  return `${brand}-${shortDescription}-${merchantId}-${id}`;
}
