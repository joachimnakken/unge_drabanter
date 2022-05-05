import React from "react";
import Head from "next/head";


interface metaType {
  title?: string;
  description?: string;
  url?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  jsonLd?: {};
  children?: React.ReactNode;
}

const DEFAULT_TAGS = {
  title: "Unge Drabanter - ",
  description: "Unge Drabanter",
  image: "https://cdn.britannica.com/71/192771-050-CEF9CEC3/Glass-scotch-whiskey-ice.jpg",
  url: "https://ungedrabanter.no/",
};

const Meta: React.FC<metaType> = ({
  title = DEFAULT_TAGS.title, description = '', ogTitle = '', ogDescription = '', ogImage = DEFAULT_TAGS.image, jsonLd = {}, url = '', children = null,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.png" />
      {url && <link rel="canonical" href={url || DEFAULT_TAGS.url} />}
      <meta name="description" content={description || DEFAULT_TAGS.description} />
      <meta property="og:title" content={ogTitle || title || DEFAULT_TAGS.title} key="title" />
      <meta
        property="og:description"
        content={ogDescription || description || DEFAULT_TAGS.description}
        key="description"
      />
      <meta property="og:image" content={ogImage} key="ogImage" />
      <meta property="og:url" content="https://wisihe.no" key="url" />
      {jsonLd && (
        <script
          key={`jobJSON-${title}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      {children}
    </Head>
  );
};

export default Meta;
