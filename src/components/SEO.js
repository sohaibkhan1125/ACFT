import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO component for managing meta tags and titles
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.canonical - Canonical path (e.g., /about)
 * @param {boolean} props.noindex - Whether to hide the page from search engines
 */
const SEO = ({ title, description, canonical, noindex = false }) => {
  const siteTitle = 'ACFT CALCULATOR';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = 'https://www.armyacftcalculatororg.org';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Robots indexing */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/logo512.png`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}/logo512.png`} />
    </Helmet>
  );
};

export default SEO;
