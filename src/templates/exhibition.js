import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/Layout/Layout'
import { CardBlockExhibition, ImageBlockExhibition, TextBlockExhibition, TitleBlockExhibition } from '../modules/Exhibition'
import { SEO } from '../components/SEO/SEO'


const ExhibitionPage = ({data, location, ...props})=>{

    const pageData = data.strapiExhibition
    const exhibition_cards ={
      card_1:{"id_card": pageData.cards?.[0].strapi_id, "image": pageData.cards?.[0].image.localFile, "artist": pageData.cards?.[0].artist?.name, artist_other:  pageData.cards?.[0].artist_other, "name": pageData.cards?.[0].name, height: pageData.cards?.[0].size.height, width: pageData.cards?.[0].size.width, length: pageData.cards?.[0].size.length, "type": pageData.cards?.[0]?.tipy_produktov?.name, "date": pageData.cards?.[0].creation_date},
      card_2:{"id_card": pageData.cards?.[1].strapi_id, "image": pageData.cards?.[1].image.localFile, "artist": pageData.cards?.[1].artist?.name, artist_other:  pageData.cards?.[1].artist_other,  "name": pageData.cards?.[1].name, height: pageData.cards?.[1].size.height, width: pageData.cards?.[1].size.width, length: pageData.cards?.[1].size.length, "type": pageData.cards?.[1]?.tipy_produktov?.name, "date": pageData.cards?.[1].creation_date},
      card_3:{"id_card": pageData.cards?.[2].strapi_id, "image": pageData.cards?.[2].image.localFile, "artist": pageData.cards?.[2].artist?.name, artist_other:  pageData.cards?.[2].artist_other,  "name": pageData.cards?.[2].name, height: pageData.cards?.[2].size.height, width: pageData.cards?.[2].size.width, length: pageData.cards?.[2].size.length, "type": pageData.cards?.[2]?.tipy_produktov?.name, "date": pageData.cards?.[2].creation_date},
      card_4:{"id_card": pageData.cards?.[3].strapi_id, "image": pageData.cards?.[3].image.localFile, "artist": pageData.cards?.[3].artist?.name, artist_other:  pageData.cards?.[3].artist_other,  "name": pageData.cards?.[3].name, height: pageData.cards?.[3].size.height, width: pageData.cards?.[3].size.width, length: pageData.cards?.[3].size.length, "type": pageData.cards?.[3]?.tipy_produktov?.name, "date": pageData.cards?.[3].creation_date},

    }
    const metaData = {
      title:pageData?.metatags?.title || 'Lazy Mike: Exhibition',
      title_og:  pageData?.metatags?.og_title || 'Lazy Mike: Exhibition',
      description: pageData?.metatags?.description || `Explore upcoming and past exhibitions at Lazy Mike gallery.`,
      description_og: pageData?.metatags?.og_description || `Explore upcoming and past exhibitions at Lazy Mike gallery.`,
      image: pageData.metatags?.image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_logo.jpg`,
      image_og: pageData.metatags?.og_image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_exhibition.jpg`,
      pathname:pageData.id,
      serverUrl: pageData?.metatags?.og_image?.url ? true : false
    }

    return(
          <SEO title={metaData.title} 
          title_og={metaData.title_og}
          description={metaData.description} 
          description_og={metaData.description_og}
          image={metaData.image}
          image_og={metaData.image_og}
          pathname={`/exhibition/${pageData.id}`}
          serverUrl={metaData.serverUrl}
        >
          <div className='page'>
              <Layout location={location}>
                  <div className="pageWrapper exhbition">
                      <TitleBlockExhibition
                          text={pageData.description.text}
                          title={pageData.title}
                          description={pageData.description.description}
                      />
                      <CardBlockExhibition
                          card_1={exhibition_cards.card_1}
                          card_2={exhibition_cards.card_2}
                      />
                      <ImageBlockExhibition 
                        image={pageData.gallery_images.image1.localFile}
                        margin={'top'}
                        description={pageData.text.text1}
                      />
                      <TextBlockExhibition
                        text={pageData.text.text2}
                      />
                      <ImageBlockExhibition 
                        image={pageData.gallery_images.image2.localFile}
                        margin={'bottom'}
                        description={pageData.text.text1}
                      />
                        <CardBlockExhibition
                          card_1={exhibition_cards.card_3}
                          card_2={exhibition_cards.card_4}
                      />
                  </div>
              </Layout>       
          </div>
        </SEO>
    )
}
export default ExhibitionPage

export const query = graphql`
query MyQuery($id: String) {
 strapiExhibition(id: {eq: $id}) {
      gallery_images {
        image1 {
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        image2 {
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      cards {
        artist_other
        artist {
          name
        }
        tipy_produktov {
          name
        }
        size {
          width
          height
          length
        }
        creation_date
        name
        strapi_id
        image {
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      text {
        text1
        text2
      }
      id
      date
      end_date
      description {
        text
        description
      }
      title 
      metatags {
        description
        og_title
        title
        og_description
        image {
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        og_image {
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
  }
}
`