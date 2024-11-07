import { useCallback } from 'react';

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

export const formatDuration = (duration: number) => {
  const minutes = String(Math.round(duration / (60 * 1000))).padStart(2, '0');
  const secs = String(duration % (60 * 1000))
    .padStart(2, '0')
    .substring(0, 2);

  return `${minutes}:${secs}`;
};

export const countFollowers = (followers: number | undefined): string => {
  if (!followers) return '0 Followers';

  if (followers < 1000) return `${followers}`;

  const counts = [
    { limit: 1000000000, suffix: 'B Followers' },
    { limit: 1000000, suffix: 'M Followers' },
    { limit: 1000, suffix: 'K Followers' },
  ];

  for (const { limit, suffix } of counts) {
    if (followers >= limit) {
      return (followers / limit).toFixed(1) + suffix;
    }
  }

  return followers.toString();
};
