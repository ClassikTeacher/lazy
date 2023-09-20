const path= require('path')


exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs =`
  type STRAPI__MEDIA implements Node @derivedTypes @dontInfer {
    name: String
    width: Int
    height: Int
    formats: STRAPI__MEDIAFormats
    hash: String
    ext: String
    mime: String
    size: Float
    url: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    localFile: File @link(by: "id", from: "localFile___NODE")
    strapi_id: Int
  }
  
  type STRAPI__MEDIAFormats @derivedTypes {
    large: STRAPI__MEDIAFormatsLarge
    small: STRAPI__MEDIAFormatsSmall
    medium: STRAPI__MEDIAFormatsMedium
    thumbnail: STRAPI__MEDIAFormatsThumbnail
  }
  
  type STRAPI__MEDIAFormatsLarge {
    ext: String
    url: String
    hash: String
    mime: String
    name: String
    size: Float
    width: Int
    height: Int
  }
  
  type STRAPI__MEDIAFormatsSmall {
    ext: String
    url: String
    hash: String
    mime: String
    name: String
    size: Float
    width: Int
    height: Int
  }
  
  type STRAPI__MEDIAFormatsMedium {
    ext: String
    url: String
    hash: String
    mime: String
    name: String
    size: Float
    width: Int
    height: Int
  }
  
  type STRAPI__MEDIAFormatsThumbnail {
    ext: String
    url: String
    hash: String
    mime: String
    name: String
    size: Float
    width: Int
    height: Int
  }
  
  type STRAPI__COMPONENT_METATAGS_METATGS implements Node @dontInfer {
    title: String
    description: String
    og_title: String
    og_description: String
    strapi_id: Int
    image: STRAPI__MEDIA @link(by: "id", from: "image___NODE")
    og_image: STRAPI__MEDIA @link(by: "id", from: "og_image___NODE")
  }
  
  type STRAPI__COMPONENT_IMAGE_MAIN_IMAGE implements Node @dontInfer {
    title: String
    image_large: STRAPI__MEDIA @link(by: "id", from: "image_large___NODE")
    image_medium: STRAPI__MEDIA @link(by: "id", from: "image_medium___NODE")
    image_small: STRAPI__MEDIA @link(by: "id", from: "image_small___NODE")
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_IMAGE_FAIR_IMAGE implements Node @dontInfer {
    description: String
    image: STRAPI__MEDIA @link(by: "id", from: "image___NODE")
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_FOOTER_MAIN_FOOTER implements Node @dontInfer {
    text: String
    is_active: Boolean
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_FAIR_LOCATION implements Node @dontInfer {
    country: String
    city: String
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_EXHIBITIONS_GALLERY_IMAGE implements Node @dontInfer {
    image1: STRAPI__MEDIA @link(by: "id", from: "image1___NODE")
    image2: STRAPI__MEDIA @link(by: "id", from: "image2___NODE")
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_EXHIBITIONS_EXHIBITION_TITLE implements Node @dontInfer {
    text: String
    description: String
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_EXHIBITIONS_EXHIBITION_TEXT implements Node @dontInfer {
    text1: String
    text2: String
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_EXHIBITIONS_CARD_SIZE implements Node @dontInfer {
    width: Int
    height: Int
    length: Int
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_EXHIBITIONS_CARD implements Node @dontInfer {
    creation_date: Date @dateformat
    name: String
    artist_other: String
    image: STRAPI__MEDIA @link(by: "id", from: "image___NODE")
    size: STRAPI__COMPONENT_EXHIBITIONS_CARD_SIZE @link(by: "id", from: "size___NODE")
    artist: STRAPI_ARTIST @link(by: "id", from: "artist___NODE")
    tipy_produktov: STRAPI_PRODUCT_TYPE @link(by: "id", from: "tipy_produktov___NODE")
    strapi_id: Int
  }
  
  type STRAPI_ARTIST implements Node @dontInfer {
    name: String
    about: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    slug: String
    image: STRAPI__MEDIA @link(by: "id", from: "image___NODE")
    education: [STRAPI__COMPONENT_ARTIST_EDUCATION] @link(by: "id", from: "education___NODE")
    solo_exhibitions: [STRAPI__COMPONENT_ARTIST_EXHIBITION] @link(by: "id", from: "solo_exhibitions___NODE")
    group_exhibitions: [STRAPI__COMPONENT_ARTIST_EXHIBITION] @link(by: "id", from: "group_exhibitions___NODE")
    strapi_id: Int
    metatags: STRAPI__COMPONENT_METATAGS_METATGS @link(by: "id", from: "metatags___NODE")
  }
  
  type STRAPI__COMPONENT_ARTIST_EDUCATION implements Node @dontInfer {
    name: String
    date: Date @dateformat
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_ARTIST_EXHIBITION implements Node @dontInfer {
    name: String
    date: Date @dateformat
    strapi_id: Int
  }
  
  type STRAPI_PRODUCT_TYPE implements Node @dontInfer {
    name: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    technical_name: String
    slug: String
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_ABOUT_PAGE_TEAM_MEMBER implements Node @dontInfer {
    name: String
    position: String
    image: STRAPI__MEDIA @link(by: "id", from: "image___NODE")
    strapi_id: Int
  }
  
  type STRAPI__COMPONENT_ABOUT_PAGE_BENEFIT_BLOCK implements Node @dontInfer {
    text: String
    citation: String
    image: STRAPI__MEDIA @link(by: "id", from: "image___NODE")
    strapi_id: Int
  }
  
  type STRAPI_YARMARKI implements Node @dontInfer {
    title: String
    text: String
    link: String
    date: Date @dateformat
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    end_date: Date @dateformat
    slug: String
    artists_other: String
    images: [STRAPI__COMPONENT_IMAGE_FAIR_IMAGE] @link(by: "id", from: "images___NODE")
    location: STRAPI__COMPONENT_FAIR_LOCATION @link(by: "id", from: "location___NODE")
    artists: [STRAPI_ARTIST] @link(by: "id", from: "artists___NODE")
    strapi_id: Int
    metatags: STRAPI__COMPONENT_METATAGS_METATGS @link(by: "id", from: "metatags___NODE")
  }
  
  type STRAPI_SETTING implements Node @dontInfer {
    theme: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    type_event: String
    page_id: String
    start_date: Date @dateformat
    end_date: Date @dateformat
    image: STRAPI__COMPONENT_IMAGE_MAIN_IMAGE @link(by: "id", from: "image___NODE")
    footer: STRAPI__COMPONENT_FOOTER_MAIN_FOOTER @link(by: "id", from: "footer___NODE")
    strapi_id: Int
  }
  
  type STRAPI_PRODUCT implements Node @dontInfer {
    name: String
    date: Date @dateformat
    isBuy: Boolean
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    slug: String
    image: [STRAPI__MEDIA] @link(by: "id", from: "image___NODE")
    size: STRAPI__COMPONENT_EXHIBITIONS_CARD_SIZE @link(by: "id", from: "size___NODE")
    type: STRAPI_PRODUCT_TYPE @link(by: "id", from: "type___NODE")
    artist: STRAPI_ARTIST @link(by: "id", from: "artist___NODE")
    strapi_id: Int
    metatags: STRAPI__COMPONENT_METATAGS_METATGS @link(by: "id", from: "metatags___NODE")
  }
  
  type STRAPI_NEWS implements Node @dontInfer {
    title: String
    description: String
    type: String
    link: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    date: Date @dateformat
    slug: String
    images: [STRAPI__COMPONENT_IMAGE_FAIR_IMAGE] @link(by: "id", from: "images___NODE")
    artists: [STRAPI_ARTIST] @link(by: "id", from: "artists___NODE")
    metatags: STRAPI__COMPONENT_METATAGS_METATGS @link(by: "id", from: "metatags___NODE")
    strapi_id: Int
  }
  
  type STRAPI_EXHIBITION implements Node @dontInfer {
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    date: Date @dateformat
    end_date: Date @dateformat
    title: String
    slug: String
    gallery_images: STRAPI__COMPONENT_EXHIBITIONS_GALLERY_IMAGE @link(by: "id", from: "gallery_images___NODE")
    cards: [STRAPI__COMPONENT_EXHIBITIONS_CARD] @link(by: "id", from: "cards___NODE")
    text: STRAPI__COMPONENT_EXHIBITIONS_EXHIBITION_TEXT @link(by: "id", from: "text___NODE")
    description: STRAPI__COMPONENT_EXHIBITIONS_EXHIBITION_TITLE @link(by: "id", from: "description___NODE")
    strapi_id: Int
    metatags: STRAPI__COMPONENT_METATAGS_METATGS @link(by: "id", from: "metatags___NODE")
  }
  
  type STRAPI_ABOUT implements Node @dontInfer {
    title: String
    description: String
    founders: String
    philanthrophy: String
    education: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    artists: String
    team: [STRAPI__COMPONENT_ABOUT_PAGE_TEAM_MEMBER] @link(by: "id", from: "team___NODE")
    benefits_block: STRAPI__COMPONENT_ABOUT_PAGE_BENEFIT_BLOCK @link(by: "id", from: "benefits_block___NODE")
    strapi_id: Int
  }`

  createTypes(typeDefs);
};

exports.createPages = async ({graphql, actions}) => {
    const {data} = await graphql(`
    query MyQuery {
        allStrapiArtist {
          nodes {
            id
            slug
          }
        }
        allStrapiNews {
          nodes {
            id
            slug
          }
        }
        allStrapiExhibition {
          nodes {
            id
            slug
          }
        }
        allStrapiProduct {
          nodes {
            id
            slug
          }
        }
        allStrapiYarmarki {
          nodes {
            id
            slug
          }
        }
      }
    `)
    data.allStrapiArtist.nodes.forEach(node => {
        actions.createPage({
            path: `/artist/` + node.slug,
            component: path.resolve(`./src/templates/artist.js`),
            context: {slug: node.slug, id: node.id}
        })
    });
    data.allStrapiNews.nodes.forEach(node => {
        actions.createPage({
            path: `/news/` + node.slug,
            component: path.resolve(`./src/templates/news.js`),
            context: {slug: node.slug, id: node.id}
        })
    });
    data.allStrapiExhibition.nodes.forEach(node => {
        actions.createPage({
            path: `/exhibition/` + node.slug,
            component: path.resolve(`./src/templates/exhibition.js`),
            context: {slug: node.slug, id: node.id}
        })
    });
    data.allStrapiProduct.nodes.forEach(node => {
        actions.createPage({
            path: `/product/` + node.slug,
            component: path.resolve(`./src/templates/product.js`),
            context: {slug: node.slug, id: node.id}
        })
    });
    data.allStrapiYarmarki.nodes.forEach(node => {
        actions.createPage({
            path: `/fair/` + node.slug,
            component: path.resolve(`./src/templates/fair.js`),
            context: {slug: node.slug, id: node.id}
        })
    });
    data.allStrapiArtist.nodes.forEach(node => {
        actions.createPage({
            path: `/cv/` + node.slug,
            component: path.resolve(`./src/templates/cv.js`),
            context: {slug: node.slug, id: node.id} 
        })
    });
}