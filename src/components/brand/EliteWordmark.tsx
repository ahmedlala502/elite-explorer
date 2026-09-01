type Props = { className?: string };

/**
 * Refined ELITƎ wordmark — geometric, hairline-thin bars, reversed final E.
 * Drawn on a 252 x 60 grid so it stays crisp at any size.
 */
export function EliteWordmark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 252 60"
      fill="currentColor"
      role="img"
      aria-label="ELITƎ"
      className={className}
    >
      <rect x="0" y="0" width="6" height="60" />
      <rect x="0" y="0" width="40" height="6" />
      <rect x="0" y="27" width="29" height="6" />
      <rect x="0" y="54" width="40" height="6" />

      <rect x="62" y="0" width="6" height="60" />
      <rect x="62" y="54" width="34" height="6" />

      <rect x="118" y="0" width="6" height="60" />

      <rect x="146" y="0" width="44" height="6" />
      <rect x="165" y="0" width="6" height="60" />

      <rect x="246" y="0" width="6" height="60" />
      <rect x="212" y="0" width="40" height="6" />
      <rect x="223" y="27" width="29" height="6" />
      <rect x="212" y="54" width="40" height="6" />
    </svg>
  );
}

/** Symmetric E + Ǝ monogram, used for the favicon, badges and loaders. */
export function EliteMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      role="img"
      aria-label="ELITƎ monogram"
      className={className}
    >
      <rect x="4" y="12" width="3.5" height="40" />
      <rect x="4" y="12" width="24" height="3.5" />
      <rect x="4" y="30.25" width="17.5" height="3.5" />
      <rect x="4" y="48.5" width="24" height="3.5" />
      <rect x="56.5" y="12" width="3.5" height="40" />
      <rect x="36" y="12" width="24" height="3.5" />
      <rect x="42.5" y="30.25" width="17.5" height="3.5" />
      <rect x="36" y="48.5" width="24" height="3.5" />
    </svg>
  );
}
