import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import moment from 'moment'
import { Link, graphql } from 'gatsby'
import { FairItem, FairsBlock } from '../modules/Fairs'
import { SEO } from '../components/SEO/SEO'
import useIsomorphicLayoutEffect from '../hooks/use-isomorphic-layout-effect'

const FairsPage = (props)=>{
    const data = props.data.allStrapiYarmarki.nodes
    const [scrollDerection, setScrollDerection] = useState('bottom')
    let scrollY = 0


    function scrollTo(){
        if (typeof window !== 'undefined'){
            if(window.scrollY > scrollY){
                setScrollDerection('bottom')
            } else {
                setScrollDerection('top')
            }
            scrollY= window.scrollY

        }
    }

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined'){
       
            window.addEventListener('scroll', scrollTo);

            return () => window.removeEventListener('scroll', scrollTo);
        }
    }, []);
    const currentFairs = [
    ]
    const upcomingFairs = [
    ]
    const pastFairs = [
    ]
    
    function initCurrentFairs(item){
      const artists = []
      item.artists.map(artist => {
        artists.push(artist?.name)
      })
      currentFairs.push({id: item.id, slug: item.slug, name: item.title, date: `${moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY')} - ${moment(item.end_date, 'YYYY-MM-DD').format('D MMMM YYYY')}`, location:`${item.location.city}, ${item.location.country}`, artists: artists, artists_other:item.artists_other })
     
    }
    function initUpcomingFairs(item){
      const artists = []
      item.artists.map(artist => {
        artists.push(artist?.name)
      })
      upcomingFairs.push({id: item.id, slug: item.slug, name: item.title, date: `${moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY')} - ${moment(item.end_date, 'YYYY-MM-DD').format('D MMMM YYYY')}`, location:`${item.location.city}, ${item.location.country}`, artists: artists, artists_other:item.artists_other})

    }
    function initPastFairs(item){
      const artists = []
      item.artists.map(artist => {
        artists.push(artist?.name)
      })
      pastFairs.push({id: item.id, slug: item.slug, name: item.title, date:`${moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY')} - ${moment(item.end_date, 'YYYY-MM-DD').format('D MMMM YYYY')}`, location:`${item.location.city}, ${item.location.country}`, artists: artists, artists_other:item.artists_other })

    }
    
    function initData(){
      const sortData = data.sort((b, a) => {
        const dateA =  new Date(a?.date);
        const dateB = new Date(b?.date)
     return dateA-dateB
    })
    sortData.map(item=>{
        if(new Date() >= new Date(moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY')) && new Date() <= new Date(moment(item.end_date, 'YYYY-MM-DD').format('D MMMM YYYY'))){
          initCurrentFairs(item)
        } else  if(new Date() <= new Date(moment(item.date, 'YYYY-MM-DD').format('D MMMM YYYY'))){
          initUpcomingFairs(item)
        } else {
          initPastFairs(item)
        }

      })
    
    }

    initData()
    

    return(
        <div className='page'>
            <Layout location={props.location}>
                <div className="pageWrapper fairs">
                  <FairsBlock 
                    title={'current'}
                    arrFairs={currentFairs}
                    scrollDerection={scrollDerection}
                  />
                   <FairsBlock 
                    scrollDerection={scrollDerection}
                    title={'upcoming'}
                    arrFairs={upcomingFairs}
                  />
                   <FairsBlock 
                    scrollDerection={scrollDerection}
                    title={'past'}
                    arrFairs={pastFairs}
                  />
         
                </div>
            </Layout>
        </div>
    )
}
export default FairsPage

export const Head = () => (
  <SEO title={'Lazy Mike: Fairs'} 
  title_og={'Lazy Mike: Fairs'} 
  description_og={`Explore upcoming and past exhibitions at Lazy Mike gallery.`}
      description={`Explore upcoming and past exhibitions at Lazy Mike gallery.`} 
      image={`/Snippet_logo.jpg`}
      image_og={`/Snippet_main.jpg`}
      pathname={'/fairs'}
  />
)

export const query = graphql`
query MyQuery {
  allStrapiYarmarki {
    nodes {
      artists {
        name
      }
      text
      title
      artists_other
      date
      end_date
      id
      slug
      strapi_id
      location {
        city
        country
      }
    }
  }
}
`