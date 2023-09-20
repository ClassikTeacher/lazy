import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/Layout/Layout'
import { ArtistCv } from '../modules/Card_Artist'
import { SEO } from '../components/SEO/SEO'
import moment from 'moment'


const CVPage = ({data, location})=>{
    const pageData = data.strapiArtist
    const dataEducation = initEducation()
    const dataEx = initExhibition()
    const dataExGruop = initExhibitionGroup()

    function initEducation(){
        const newArr = pageData?.education.sort((b, a) => {
            const dateA =  new Date(a?.date);
            const dateB = new Date(b?.date)
         return dateA-dateB
        })
        return newArr
    }

    function initExhibition(){
        const newArr = []
        const sorted_solo_exhibitions = pageData?.solo_exhibitions.sort((b, a) => {
            const dateA =  new Date(a.date);
            const dateB = new Date(b.date)
         return dateA-dateB
        })
        let currentDateYear = moment(sorted_solo_exhibitions?.[0].date, 'YYYY-MM-DD').year() || ''
        let currentArrExhibitions = []
        sorted_solo_exhibitions?.map(item => {
            // moment(item.date, 'YYYY-MM-DD').year()
            if(currentDateYear === moment(item.date, 'YYYY-MM-DD').year()){
                currentArrExhibitions.push(item.name)
            } else {
                newArr.push({
                    "date": currentDateYear,
                    "list": currentArrExhibitions
                },)
                currentDateYear = moment(item.date, 'YYYY-MM-DD').year()
                currentArrExhibitions = [item.name]
            }
        })
        newArr.push({
            "date": currentDateYear,
            "list": currentArrExhibitions
        },)
        return newArr
    }
    function initExhibitionGroup(){
      const newArr = []
      const sorted_gruop_exhibitions = pageData?.group_exhibitions?.sort((b, a) => {
          const dateA =  new Date(a.date);
          const dateB = new Date(b.date)
       return dateA-dateB
      })
      let currentDateYear = moment(sorted_gruop_exhibitions?.[0]?.date, 'YYYY-MM-DD').year() || ''
      let currentArrExhibitions = []
      sorted_gruop_exhibitions?.map(item => {
          // moment(item.date, 'YYYY-MM-DD').year()
          if(currentDateYear === moment(item?.date, 'YYYY-MM-DD').year()){
              currentArrExhibitions.push(item?.name)
          } else {
              newArr.push({
                  "date": currentDateYear,
                  "list": currentArrExhibitions
              },)
              currentDateYear = moment(item?.date, 'YYYY-MM-DD').year()
              currentArrExhibitions = [item?.name]
          }
      })
      newArr.push({
          "date": currentDateYear,
          "list": currentArrExhibitions
      },)
      return newArr
  }
    const metaData = {
        title:pageData?.metatags?.title || 'Lazy Mike: artist',
        title_og:  pageData?.metatags?.og_title || 'Lazy Mike: artist',
        description: pageData?.metatags?.description || `A list of artists represented by Lazy Mike gallery.`,
        description_og: pageData?.metatags?.og_description || `A list of artists represented by Lazy Mike gallery.`,
        image: pageData.metatags?.image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_logo.jpg`,
        image_og: pageData.metatags?.og_image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_main.jpg`,
        pathname:pageData.slug,
        serverUrl: pageData?.metatags?.og_image?.url ? true : false
      }


    return(
        <SEO title={metaData.title} 
        title_og={metaData.title_og}
        description={metaData.description} 
        description_og={metaData.description_og}
        image={metaData.image}
        image_og={metaData.image_og}
        pathname={`/cv/${metaData.pathname}`}
        serverUrl={metaData.serverUrl}
      >
        <div className='page'>
            <Layout location={location}>
                <div className="pageWrapper cv">
                    <ArtistCv
                        artist={pageData.name}
                        educations={dataEducation}
                        exhibitions={dataEx}
                        gruopExhibitions={dataExGruop}
                    />
                </div>
            </Layout>           
        </div>
        </SEO>
    )
}
export default CVPage

export const query = graphql`
query MyQuery($id: String) {
    strapiArtist(id: {eq: $id}) {
      id
      name
      slug
      education {
        date
        name
      }
      solo_exhibitions {
        date
        name
      }
      group_exhibitions{
        date
        name
      }
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