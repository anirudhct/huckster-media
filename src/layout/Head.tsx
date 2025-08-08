type HeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

export default function Head({
  title = "Huckster Productions",
  description = "The UAE-based video production house with a narrative driven approach to one exceptional story at a time.",
  keywords = "",
}: HeadProps) {
  return (
    <article>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
    </article>
  );
}
