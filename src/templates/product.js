import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout/Layout'
import { ProductAboutArtist, ProductBlockWorks, ProductCard } from '../modules/Product'
import { defaultState } from '../context/GlobalContext'
import { SEO } from '../components/SEO/SEO'

const urlStrapi = defaultState.urlStrapi

const product = (props)=>{

    const allProducts = props.data.allStrapiProduct.nodes
    const dataProdcutStrapi = props.data.strapiProduct

    const dataProducts = initDataProducts()

    const data =initData()
    console.log(data)
    console.log(dataProdcutStrapi)
   

    function initDataProducts(){
        const newProducts = []  
        const productArtist = allProducts.filter(item => item.artist?.id === props.data.strapiProduct?.artist?.id)
        if(productArtist?.lenght !== 0){
            productArtist.map(item => {
                newProducts.push({"id": item.id, slug: item.slug, "image": item.image[0].localFile, "artist": dataProdcutStrapi.artist.name, height: item.size.height, width: item.size.width, length: item.size.length,  "name": item.name, "type": item.type?.technical_name, "date": item.date})
            })
        }
       return newProducts
    }

    function initData(){
        const newData = {
        id: dataProdcutStrapi.id,
        id_artist: dataProdcutStrapi.artist.id,
        slug_artist: dataProdcutStrapi.artist.slug,
        "artist": dataProdcutStrapi.artist.name, 
        length: dataProdcutStrapi.size?.length,
        height: dataProdcutStrapi.size.height, 
        width: dataProdcutStrapi.size.width,
        "name": dataProdcutStrapi.name, 
        "type": dataProdcutStrapi.type?.name, 
        "date": dataProdcutStrapi.date,
        images: [

        ],
        "about_artist": dataProdcutStrapi.artist.about,
        
    }

    dataProdcutStrapi.image.map(item=>{
        newData.images.push(item.localFile)
    })
        return newData
    }

    const metaData = {
      title:dataProdcutStrapi?.metatags?.title || 'Lazy Mike: Product',
      title_og:  dataProdcutStrapi?.metatags?.og_title || 'Lazy Mike: Product',
      description: dataProdcutStrapi?.metatags?.description || `Explore the catalog of artworks by artists represented by Lazy Mike gallery.`,
      description_og: dataProdcutStrapi?.metatags?.og_description || `Explore the catalog of artworks by artists represented by Lazy Mike gallery.`,
      image: dataProdcutStrapi?.image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_logo.jpg`,
      image_og: dataProdcutStrapi?.og_image?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src || `/Snippet_logo.jpg`,
      pathname:dataProdcutStrapi.id,
      serverUrl: dataProdcutStrapi?.metatags?.og_image?.url ? true : false
    }

    return(
      <SEO title={metaData.title} 
      title_og={metaData.title_og}
      description={metaData.description} 
      description_og={metaData.description_og}
      image={metaData.image}
      image_og={metaData.image_og}
      pathname={`/product/${metaData.pathname}`}
      serverUrl={metaData.serverUrl}
    >
        <div className='page'>
        <Layout location={props.location}>
            <div className="pageWrapper product">
                <ProductCard
                    artist={data.artist}
                    date={data.date}
                    height={data.height}
                    width={data.width}
                    length={data.length}
                    id={data.id}
                    images={data.images}
                    name={data.name}
                    type={data.type}
                />
                <ProductAboutArtist
                    about={data.about_artist}
                    id={data.slug_artist}
                />
                <ProductBlockWorks
                    artist={data.artist}
                    listWorks={dataProducts}
                />
            </div>
        </Layout>
       
    </div>
    </SEO>
    )
}
export default product


export const query = graphql`
query MyQuery($id: String) {
    strapiProduct(id: {eq: $id}) {
      date
      slug
      id
      image {
        url
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      name
      type {
        name
      }
      artist {
        name
        slug
        about
        id
      }
      size {
        height
        width
        length
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
    allStrapiProduct {
        nodes {
          id
          slug
          date
          name
          artist {
            id
          }
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
  }
`
