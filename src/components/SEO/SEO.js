import React from "react"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

export const SEO = ({ title, title_og, description, description_og, pathname, image, image_og, serverUrl, children }) => {
  const { title: defaultTitle, description: defaultDescription, image: defaultImage, image_og: defaultImage_og, siteUrl, twitterUsername } = useSiteMetadata()
  const seo = {
    title: title || defaultTitle,
    title_og: title_og || defaultTitle,
    description: description || defaultDescription,
    description_og: description_og || defaultDescription,
    image: `${siteUrl}${image}` || `${siteUrl}${defaultImage}`,
    image_og: `${siteUrl}${image_og}` || `${siteUrl}${defaultImage_og}`,  
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title_og} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description_og} />
      <meta name="twitter:image" content={seo.image_og} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title_og} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description_og} />
      <meta property="og:image" content={seo.image_og} />
      <link rel="icon" href={seo.image} />
      {children}
    </>
  )
}
