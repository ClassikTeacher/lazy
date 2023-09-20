import React from 'react'
import Layout from '../components/Layout/Layout'
import Footer from '../components/Footer/Footer'
import { Link, graphql } from 'gatsby'
import { BlockExhibitions, CurrentExhibition, ListExhibitions } from '../modules/Exhibitions'
import { SEO } from '../components/SEO/SEO'
import { defaultState } from '../context/GlobalContext'
import moment from 'moment'

const urlStrapi = defaultState.urlStrapi

const ExhibitionsPage = (props)=>{
   
    const data = props.data.allStrapiExhibition.nodes
    const exhibitions = {slug:'exhibition-one'}
    const currentEx = []
    const upcomingEx = []
    const pastEx = []
    function initCurrentExhibitions(item){
        currentEx.push({id: item.id, slug: item.slug, image: item.gallery_images.image1.localFile, title: item.title, description: item.description.text, date: `${moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY')} - ${moment(item.end_date, 'YYYY-MM-DD').format('D MMMM YYYY')}`})
    }

    function initUpcomingExhibitions(item){
      upcomingEx.push({id: item.id, slug: item.slug, image: item.gallery_images.image1.localFile, title: item.title, description: item.description.text, date: `${moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY')} - ${moment(item.end_date, 'YYYY-MM-DD').format('D MMMM YYYY')}`})

    }

    function initPastExhibitions(item){
      pastEx.push({id: item.id, slug: item.slug, image: item.gallery_images.image1.localFile, title: item.title, description: item.description.text, date: `${moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY')} - ${moment(item.end_date, 'YYYY-MM-DD').format('D MMMM YYYY')}`})
    }


    function initData(){
      const sortData = data.sort((b, a) => {
        const dateA =  new Date(a?.date);
        const dateB = new Date(b?.date)
     return dateA-dateB
    })
    sortData.map(item=>{

        if(new Date() >= new Date(moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY')) && new Date() <= new Date(moment(item.end_date, 'YYYY-MM-DD').format('D MMMM YYYY'))){
          initCurrentExhibitions(item)
        } else  if(new Date() <= new Date(moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY'))){
          initUpcomingExhibitions(item)
        } else {
          initPastExhibitions(item)
        }
      })
    
    }

    initData()

    return(
        <div className='page'>
            <Layout location={props.location}>
            <div className="pageWrapper exhibitions">
                <BlockExhibitions
                  title={'current'}
                  list={currentEx}
                >
                  {currentEx?.map(item => {
                    return  <CurrentExhibition 
                              to={`/exhibition/${item.slug}`}
                              date={item.date}
                              title={item.title}
                              img={item.image}
                              text={item.description}
                            />
                  })}
                </BlockExhibitions>
                <BlockExhibitions title={'upcoming'} list={upcomingEx}>
                  <ListExhibitions 
                    listExhibitions={upcomingEx}
                    to={`/${exhibitions.slug}`}
                  />
                </BlockExhibitions>
                <BlockExhibitions title={'past'}  list={pastEx}>
                  <ListExhibitions 
                    listExhibitions={pastEx}
                    to={`/${exhibitions.slug}`}
                  />
                </BlockExhibitions>
              </div>
            </Layout>
           
        </div>
    )
}
export default ExhibitionsPage

export const Head = () => (
  <SEO title={'Lazy Mike: Exhibitions'} 
  title_og={'Lazy Mike: Exhibitions'} 
  description_og={`Explore upcoming and past exhibitions at Lazy Mike gallery.`}
      description={`Explore upcoming and past exhibitions at Lazy Mike gallery.`} 
      image={`/Snippet_logo.jpg`}
      image_og={`/Snippet_exhibition.jpg`}
      pathname={'/exhibitions'}
  />
)

export const query = graphql`
query MyQuery {
  allStrapiExhibition {
    nodes {
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
      text {
        text1
        text2
      }
      id
      slug
      date
      end_date
      description {
        text
        description
      }
      title 
    }
  }
}
`