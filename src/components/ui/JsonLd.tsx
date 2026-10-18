/**
 * Structured data block.
 *
 * `<script type="application/ld+json">` is a data block, not an executable
 * script: the HTML spec returns from "prepare the script element" before the
 * CSP check for any type that is not classic, module or importmap. So this
 * renders fine under the strict `script-src` in next.config.mjs without a
 * nonce — which matters, because a nonce would force dynamic rendering and
 * every page here is static.
 *
 * `JSON.stringify` escapes `<` as-is, so the payload is additionally guarded
 * against a `</script>` sequence appearing in content.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const payload = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      // Required: the payload is a serialised object, escaped above.
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
