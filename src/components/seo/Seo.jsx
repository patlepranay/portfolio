import React from "react";
import { Helmet } from "react-helmet-async";
import { navItems, seo as seoMap, SITE_URL, ogImage } from "@/data/constants";

/* ------------------------------------------------------------------ */
/*  Per-page SEO <head>.                                                */
/*                                                                     */
/*  Renders title / description / canonical / OpenGraph / Twitter /     */
/*  JSON-LD for the given page `id` (a navItems id). On the client this  */
/*  keeps <head> in sync across route changes; during SSG the same tags  */
/*  are captured and baked into each static HTML file.                   */
/* ------------------------------------------------------------------ */

export const Seo = ({ id }) => {
  const meta = seoMap[id];
  const nav = navItems.find((n) => n.id === id);
  if (!meta) return null;

  const url = SITE_URL + (nav && nav.path !== "/" ? nav.path : "");
  const isHome = id === "home";

  const jsonLd = isHome
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Pranay Patle",
        url: SITE_URL,
        image: ogImage,
        jobTitle: "Full-Stack Software Engineer",
        email: "mailto:pranayhpatle@gmail.com",
        sameAs: [
          "https://github.com/patlepranay",
          "https://www.linkedin.com/in/pranayhpatle/",
        ],
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: meta.title,
        description: meta.desc,
        url,
        isPartOf: { "@type": "WebSite", name: "Pranay Patle", url: SITE_URL },
      };

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pranay Patle" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.desc} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};
