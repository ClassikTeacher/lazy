import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import BlockNews from '../modules/News/components/BlockNews/BlockNews'
import { graphql } from 'gatsby'
import { SEO } from '../components/SEO/SEO'
import moment from 'moment'




const NewsPage = (props)=>{

  const dataStrapi = props.data.allStrapiNews.nodes
  const data = initData()
    function initData(){
      const newData = []
      const sortData = dataStrapi.sort((b, a) => {
        const dateA =  new Date(a?.date);
        const dateB = new Date(b?.date)
     return dateA-dateB
    })
    sortData?.map(item => {
          newData.push({"id": item.id,  slug: item.slug, "title": item.title, "description": item.description,  "image": item.images[0].image.localFile, "artist": item.artists, "type": item.type, "date": moment(item.date, 'YYYY-MM-DD').format("D MMMM YYYY")})
      })
      return newData
    }

    return(
        <div className='page'>
            <Layout location={props.location}>
                <div className="pageWrapper news">
                  <BlockNews
                  listNews={data}
                  />
                </div>
            </Layout>
         
        </div>
    )
}
export default NewsPage

export const Head = () => (
  <SEO title={'Lazy Mike: News'} 
  title_og={'Lazy Mike: News'} 
  description_og={`News about artists represented by Lazy Mike gallery.`}
      description={`News about artists represented by Lazy Mike gallery.`} 
      image={`/Snippet_logo.jpg`}
      image_og={`/Snippet_logo.jpg`}
      pathname={'/news'}
  />
)

export const query = graphql`
query MyQuery {
  allStrapiNews {
    nodes {
      description
      link
      id
      slug
      strapi_id
      title
      type
      images {
        strapi_id
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
      artists {
        name
      }
      date
    }
  }
}
`
