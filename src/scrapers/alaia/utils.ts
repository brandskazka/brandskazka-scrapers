import { ExternalMerchantId, ProductId } from 'types/types';

export function generateProductUrlHandleForSearchResultItem({
  id,
  name
}: {
  name?: string;
  id?: string;
}) {
  const merchantId: ExternalMerchantId = 'alaia';
  const brand = 'alaia';

  const shortDescription = name
    ?.toString() // Convert input to string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .normalize('NFD') // Normalize characters to decomposed form
    .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
    .replaceAll('/', '-');

  return `${brand}-${shortDescription}-${merchantId}-${id}`;
}

export function generateProductUrlHandleForSingleItem({
  id,
  name
}: {
  name: string;
  id: ProductId;
}) {
  const merchantId: ExternalMerchantId = 'goldengoose';
  const brand = 'goldengoose';

  const shortDescription = name
    ?.toString() // Convert input to string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .normalize('NFD') // Normalize characters to decomposed form
    .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
    .replaceAll('/', '-');

  return `${brand}-${shortDescription}-${merchantId}-${id}`;
}

export function formatImage(formatSize: string) {
  // Define the regular expression pattern to match the screen size at the end
  const pattern = /_[0-9]+x[0-9]+$/;

  // Remove the screen size at the end of the string
  return formatSize.replace(pattern, '_940x940');
}
