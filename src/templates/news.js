import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/Layout/Layout'


import { NewsImagesBlock, NewsTextBlock } from '../modules/NewsSingl'
import { SEO } from '../components/SEO/SEO'

const NewsPage = ({data, location, ...props})=>{

    const dataNews = {
        id: data.strapiNews.id,
        title: data.strapiNews.title,
        text: data.strapiNews.description ,
        link: data.strapiNews.link,
        images: 
        data.strapiNews.images
             
    }

    const metaData = {
        title:data.strapiNews?.metatags?.title || 'Lazy Mike: News',
        title_og:  data.strapiNews?.metatags?.og_title || 'Lazy Mike: News',
        description: data.strapiNews?.metatags?.description || `News about artists represented by Lazy Mike gallery.`,
        description_og: data.strapiNews?.metatags?.og_description || `News about artists represented by Lazy Mike gallery.`,
        image: data.strapiNews.metatags?.image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_logo.jpg`,
        image_og: data.strapiNews.metatags?.og_image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_logo.jpg`,
        pathname:data.strapiNews.id,
        serverUrl: data.strapiNews?.metatags?.og_image?.url ? true : false
      }

    return(
        <SEO title={metaData.title} 
        title_og={metaData.title_og}
        description={metaData.description} 
        description_og={metaData.description_og}
        image={metaData.image}
        image_og={metaData.image_og}
        pathname={`/news/${metaData.pathname}`}
        serverUrl={metaData.serverUrl}
      >
        <div className='page'>
            <Layout location={location}>
                <div className="pageWrapper fair">
                    <NewsTextBlock
                        title={dataNews.title}
                        text={dataNews.text}
                        link={dataNews.link}
                    />
                    <NewsImagesBlock
                        images={dataNews.images}
                    />
                </div>
            </Layout>
           
        </div>
    </SEO>
    )
}
export default NewsPage

export const query = graphql`
query MyQuery($id: String) {
    strapiNews(id: {eq: $id}) {
        description
        id
        strapi_id
        title
        images {
          image {
            url
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          description
        }
        link
        type
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