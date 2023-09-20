import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { ArtistBlock } from '../modules/Artists'
import { SEO } from '../components/SEO/SEO'
import { graphql } from 'gatsby'
import { defaultState } from '../context/GlobalContext'

const urlStrapi = defaultState.urlStrapi

const ArtistsPage = (props)=>{
    const dataStrapi = props.data.allStrapiArtist.nodes
    const data = initData()

    function initData(){
        const newArtist = []
        dataStrapi?.map(item=>{
            newArtist.push({"id": item.id, "slug": item.slug, "name": item.name, "image": item.image.localFile})
        })
        console.log(newArtist)
        newArtist.sort((a, b) => {   
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
          return 0
        })
        return newArtist
    }

    useEffect(()=> {
        initData()
    }, [])

    return(
        <div className='page'>
                <Layout location={props.location}>
                    <div className="pageWrapper artists" >                      
                        <ArtistBlock
                            artistList={data}
                        />
                    </div>
                </Layout>
            
        </div>
    )
}
export default ArtistsPage

export const Head = () => (
  <SEO title={'Lazy Mike: Artists'}
      title_og={'Lazy Mike: Artists'} 
      description_og={`A list of artists represented by Lazy Mike gallery.`}
      description={`A list of artists represented by Lazy Mike gallery.`} 
      image={'/Snippet_logo.jpg'}
      image_og={'/Snippet_artist.jpg'}
      pathname={'/artist'}
  />
)

  export const query = graphql`
 query MyQuery {
    allStrapiArtist {
      nodes {
        about
        slug
        education {
          date
          name
        }
        image {
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        name
  
        strapi_id
        id
        solo_exhibitions {
          date
          name
        }
      }
    }
  }
`