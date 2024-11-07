export function colorWithOpacity(color: string, alpha: string | number): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
    throw new Error(`Invalid color value "${color}". Must be a six-digit hex code.`);
  }

  let alphaHex: string;

  if (typeof alpha === 'number') {
    if (alpha < 0 || alpha > 1) {
      throw new Error('Alpha must be a number between 0 and 1.');
    }
    const alphaValue = Math.round(alpha * 255);
    alphaHex = alphaValue.toString(16).padStart(2, '0');
  } else if (typeof alpha === 'string') {
    if (!/^([0-9a-fA-F]{2})$/.test(alpha)) {
      throw new Error(`Invalid alpha value "${alpha}". Must be a two-digit hex.`);
    }
    alphaHex = alpha;
  } else {
    throw new Error('Alpha must be a number between 0 and 1 or a two-digit hex string.');
  }

  return `${color}${alphaHex}`;
}

export function appendSearchParams<T extends Record<string, string>>(url: URL, params: T) {
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
}

export function parseUrl<SearchParams = {}>(
  url: string,
): { baseUrl: string; searchParams: SearchParams } {
  const [baseUrl, paramsString] = url.split('?');

  const searchParams: Partial<Record<string, string>> = {};

  if (paramsString) {
    paramsString.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      searchParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }

  return { baseUrl, searchParams: searchParams as SearchParams };
}

export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
