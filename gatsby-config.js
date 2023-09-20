/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const strapiConfig = {
  apiURL: process.env.GATSBY_STRAPI_API_URL,
  accessToken: process.env.GATSBY_STRAPI_TOKEN,
  collectionTypes: [
      {
        singularName: "setting",
        queryParams: {
          populate: {
            image: { populate: "*" }, 
            footer: { 
              id: 'String',
              is_active: "Boolean",
              text: "String"
            }
          },

        }
      },
      {
        singularName: "about",
        queryParams: {
          populate: {
            team: { populate: "*" }, 
            benefits_block: { populate: "*" }
          },
        }
      },
      {
        singularName: "news",
        queryParams: {
          populate: {
            images: { populate: "*" }, 
            type: { populate: "*" }, 
            artists: { populate: "*" },
            metatags: { populate: "*" }
          },
        }
      },
      {
        singularName: "yarmarki",
        queryParams: {
          populate: {
            images: { populate: "*" }, 
            location: { populate: "*" }, 
            artists: { populate: "*" },
            metatags: { 
              description: "*",
              image: {populate: "*" }
            }
          },
        }
      },
      {
        singularName: "artist",
        queryParams: {
          populate: {
            image: { populate: "*" }, 
            education: { populate: "*" }, 
            solo_exhibitions: { populate: "*" },
            group_exhibitions: { populate: "*" },
            metatags: { populate: "*" }
          },
        }
      },
      {
        singularName: "exhibition",
        queryParams: {
          populate: {
            images: { populate: "*" }, 
            gallery_images: { populate: "*" }, 
            cards: { populate: "*" }, 
            text: { populate: "*" }, 
            metatags: { populate: "*" }, 
            title: { populate: "*" },
            description: { populate: "*" }
          },
        }
      },
      {
        singularName: "product",
        queryParams: {
          populate: {
            image: { populate: "*" }, 
            size: { populate: "*" }, 
            type: { populate: "*" }, 
            artist: { populate: "*" },
            metatags: { populate: "*" }
          },
        }
      },
      {
        singularName: "product-type",
        queryParams: {
          populate: "*"
        }
      },
  ],

};

module.exports = {
  siteMetadata: {
    title: `Lazy Mike`,
    description: `Lazy Mike gallery`,
    twitterUsername: `@lazymike`,
    image: `/Snippet_logo.jpg`,
    image_og: `/Snippet_main.jpg`,
    siteUrl: process.env.SITE_URL
  },
  plugins: [ "gatsby-plugin-image", `gatsby-plugin-sharp`, `gatsby-transformer-sharp`,"gatsby-plugin-sitemap", 
  {
    resolve: `gatsby-plugin-remote-images`,
    options: {
      nodeType: 'MyNodes',
      imagePath: '/',
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/logo_green.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-transformer-remark", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, 
  {
    resolve: `gatsby-source-strapi`,
    options: strapiConfig,
  },
  {
    resolve: `gatsby-omni-font-loader`,
    options: {
      enableListener: true,
      preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
      web: [
        {
          name: `Bebas Neue Cyrillic`,
          file: `https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap`,
        },
        {
          name: `Open Sans`,
          file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
        },
      ],
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};