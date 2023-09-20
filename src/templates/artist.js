import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { ArtistAbout, ArtistNewsBlock, ArtistWorksBlock, CardArtist } from '../modules/Card_Artist'
import useIsomorphicLayoutEffect from '../hooks/use-isomorphic-layout-effect'
import { SEO } from '../components/SEO/SEO'
import moment from 'moment'



const ArtistPage =  (props)=>{
    const dataProducts = props.data.allStrapiProduct.nodes
    const dataNews = props.data.allStrapiNews.nodes
    const dataArtist = props.data.strapiArtist
    const [scrollDerection, setScrollDerection] = useState('bottom')
    let scrollY = 0
    const metaData = {
      title:dataArtist?.metatags?.title || 'Lazy Mike: artist',
      title_og:  dataArtist?.metatags?.og_title || 'Lazy Mike: artist',
      description: dataArtist?.metatags?.description || `A list of artists represented by Lazy Mike gallery.`,
      description_og: dataArtist?.metatags?.og_description || `A list of artists represented by Lazy Mike gallery.`,
      image: dataArtist.metatags?.image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_logo.jpg`,
      image_og: dataArtist.metatags?.og_image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_main.jpg`,
      pathname:dataArtist.slug,
      serverUrl: dataArtist?.metatags?.og_image?.url ? true : false
    }

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
    const dataItems = initDataProduct()

    const newsItem = initDataNews()
 
    const data = initDataArtist()
   

    function initDataProduct(){
        const newProducts = []
        const sortData = dataProducts.sort((b, a) => {
          const dateA =  new Date(a?.date);
          const dateB = new Date(b?.date)
       return dateA-dateB
      })
        if(dataProducts?.lenght !== 0){
          sortData.map(item => {
                newProducts.push({"id": item.id, slug: item?.slug, "image": item.image[0].localFile, "artist": dataArtist.name, height: item.size.height, width: item.size.width,  length: item.size?.lenght, "name": item.name, "type": item.type?.technical_name, "date": item.date})
            })
        }
        return newProducts
    }

    function initDataNews(){
        const newNews = []
        const sortData = dataNews.sort((b, a) => {
          const dateA =  new Date(a?.date);
          const dateB = new Date(b?.date)
       return dateA-dateB
      })
        if(dataNews?.lenght !== 0){
          sortData.map(item => {
                newNews.push( {  "id": item.id, slug: item?.slug, "title": item.title, "description": item.description, "image": item.images[0].image.localFile, "artist": dataArtist.name, "type": item.type, "date": moment(item.date, 'YYYY-MM-DD').format("D MMMM YYYY")})
            })
        }
       
        return newNews
    }
    function initDataArtist(){
        const newData = {
            id: dataArtist.id,
            "artist": dataArtist.name, 
            slug: dataArtist.slug,
            image: dataArtist.image.localFile,
            education: dataArtist?.education,
            exhibition: dataArtist.solo_exhibitions,
            "about_artist": dataArtist.about,
         }
         

         return newData
    }

    return(
      <SEO title={metaData.title} 
        title_og={metaData.title_og}
        description={metaData.description} 
        description_og={metaData.description_og}
        image={metaData.image}
        image_og={metaData.image_og}
        pathname={`/artist/${dataArtist.slug}`}
        serverUrl={metaData.serverUrl}
      >
        <div className='page'>
        <Layout location={props.location}>
            <div className="pageWrapper product">
                <CardArtist
                    name={data.artist}
                    image={data.image}
                    scrollDerection={scrollDerection}
                />
                <ArtistAbout
                    about={data.about_artist}
                    education={data?.education}
                    exhibition={data.exhibition}
                    slug={data.slug}
                    id={data.id}
                    scrollDerection={scrollDerection}
                />
                <ArtistWorksBlock
                    artist={data.artist}
                    listWorks={dataItems}
                    scrollDerection={scrollDerection}
                />
                <ArtistNewsBlock
                    listNews={newsItem}
                    artist={data.artist}
                    scrollDerection={scrollDerection}
                />
            </div>
        </Layout>
       
    </div>
    </SEO>
    )
}
export default ArtistPage

export const head = (props) => (
  <SEO title={props.title} 
      description={`A list of upcoming, current and past art fairs.`} 
      image={`/Snippet_logo.jpg`}
      image_og={`/Snippet_main.jpg`}
      pathname={'/fairs'}
  />
)

export const query = graphql`
query MyQuery($id: String) {
    strapiArtist(id: {eq: $id}) {
      about
      id
      slug
      strapi_id
      name
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
    allStrapiProduct(filter: {artist: {id: {eq: $id}}}) {
      nodes {
        strapi_id
        id
        slug
        date
        name
        size {
          height
          width
          length
        }
        image {
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        type {
            name
            technical_name
        }
      }
    }
    allStrapiNews(filter: {artists: {elemMatch: {id: {eq: $id}}}}) {
      nodes {
        id
        slug
        strapi_id
        date
        artists {
          name
        }
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
        }
        description
        type
        metatags {
          description
          og_title
          title
          og_description
          image {
            url
          }
          og_image {
            url
          }
        }
      }
    }
  }
`
