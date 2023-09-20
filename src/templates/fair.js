import React, { useState } from 'react'
import { graphql } from "gatsby"
import Layout from '../components/Layout/Layout'
import { ImagesBlock, TextBlock } from '../modules/Fair'
import { SEO } from '../components/SEO/SEO'

const FairPage = ({data, location})=>{
    const dataFair = {
        id: 1,
        title: data.strapiYarmarki.title,
        text: data.strapiYarmarki.text,
        link: data.strapiYarmarki?.link,
        images: 
        data.strapiYarmarki.images
    }
    const dataF = {
        id: 1,
        title: "Architectural Digest: Lazy Mike gallery artists in Interior from the cover",
        text: 'Anna Zinkovskaya and her family love the historical center of Moscow, they have lived here for many years and are attached to places and friends. Therefore, when the children grew up and it was necessary to find more housing, the search was limited to certain streets. The choice was also limited by other wishes of Anna and her husband: high ceilings, large windows and a house with history.',
        link: "https://www.youtube.com/",
        images: [
            {"image": "https://s0.rbk.ru/v6_top_pics/media/img/5/90/756781807819905.webp", "description": "Image 1: View from the living room to the hallway, where a painting by Daniel Lergon from the Lazy Mike Gallery hangs."},
            {"image": "https://img.ixbt.site/live/topics/preview/00/03/74/58/605df6ac52.jpg", "description": "Image 1: View from the living room to the hallway, where a painting by Daniel Lergon from the Lazy Mike Gallery hangs."},
            {"image": "https://img.ixbt.site/live/topics/preview/00/03/74/58/605df6ac52.jpg", "description": "Image 1: View from the living room to the hallway, where a painting by Daniel Lergon from the Lazy Mike Gallery hangs."},
            {"image": "https://na-dostupnom.ru/wp-content/uploads/2021/12/aHpnkCFosvI.jpg.webp", "description": "Image 1: View from the living room to the hallway, where a painting by Daniel Lergon from the Lazy Mike Gallery hangs."},
            
        
        ]
    }

    const metaData = {
        title:data.strapiYarmarki?.metatags?.title || 'Lazy Mike: Fair',
        title_og:  data.strapiYarmarki?.metatags?.og_title || 'Lazy Mike: Fair',
        description: data.strapiYarmarki?.metatags?.description || `A list of upcoming, current and past art fairs.`,
        description_og: data.strapiYarmarki?.metatags?.og_description || `A list of upcoming, current and past art fairs.`,
        image: data.strapiYarmarki.metatags?.image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_logo.jpg`,
        image_og: data.strapiYarmarki.metatags?.og_image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_main.jpg`,
        pathname:data.strapiYarmarki.id,
        serverUrl: data.strapiYarmarki?.metatags?.og_image?.url ? true : false
      }

    return(
        <SEO title={metaData.title} 
        title_og={metaData.title_og}
        description={metaData.description} 
        description_og={metaData.description_og}
        image={metaData.image}
        image_og={metaData.image_og}
        pathname={`/fair/${data.strapiYarmarki.id}`}
        serverUrl={metaData.serverUrl}
      >
            <div className='page'>
                <Layout location={location}>
                    <div className="pageWrapper fair">
                        <TextBlock
                            title={dataFair.title}
                            text={dataFair.text}
                            link={dataFair?.link}
                        />
                        <ImagesBlock
                            images={dataFair.images}
                        />
                    </div>
                </Layout>           
            </div>
        </SEO>
    )
}
export default FairPage

export const query = graphql`
query MyQuery($id: String) {
    strapiYarmarki(id: {eq: $id}) {
      id
      date
      images {
        description
        image {
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      link
      text
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