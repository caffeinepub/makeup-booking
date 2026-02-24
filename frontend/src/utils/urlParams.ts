/**
 * Reads a parameter from the URL query string or hash fragment.
 * Used by useActor.ts to retrieve secret tokens passed via URL.
 */
export function getSecretParameter(key: string): string | null {
  if (typeof window === 'undefined') return null;

  // Check URL search params first
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has(key)) {
    return searchParams.get(key);
  }

  // Check hash fragment params
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const hashParams = new URLSearchParams(hash.slice(1));
    if (hashParams.has(key)) {
      return hashParams.get(key);
    }
  }

  return null;
}
