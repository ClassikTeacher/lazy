import * as React from "react"
import '../styles/index.css'
import Layout from "../components/Layout/Layout"
import {MainTitle, MainBackground, MainFooter} from "../modules/Main/index.js"
import { graphql, useStaticQuery } from "gatsby"
import { SEO } from "../components/SEO/SEO"
import moment from "moment/moment"




const IndexPage = (props) => {
  const data = props.data.strapiSetting
  const dataFairs = props.data.allStrapiYarmarki.nodes
  const dataEx = props.data.allStrapiExhibition.nodes
  const idLlink = initLink()
  const date =`${moment(data?.start_date, 'YYYY-MM-DD').format("D MMMM")} - ${moment(data?.end_date, 'YYYY-MM-DD').format("D MMMM YYYY")} `
  const mainData = {
      theme: "white",
      type_event: "fair",
      id: "123",
      "main_image": {
        "image": {
          "desktop": data.image.image_large.localFile,
          "pad": data.image.image_medium.localFile,
          "phone": data.image.image_small.localFile
        },
          "title": "sasha yazov:<br>25% of irony",
          "date": "24 March - 24 April 2022"
      },
      "footer": {
          "data": "Fair | Expo Chicago | September 27 - October 1",
          visible: true
      }
  }

  function initLink(){
    let link = ''
    if(data.type_event === 'fair'){
      dataFairs?.map(item => {
        if(data.page_id == item.strapi_id){
          link = item.slug
        }
      })
    } else {
      dataEx?.map(item => {
        if(data.page_id == item.strapi_id){
          link = item.slug
        }
      })
    }
    return link
  }
  React.useEffect(()=>{
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <main className='page'>
      <Layout location={props.location} color={data.theme}>
        <div className="pageMain">
          <MainTitle
            title={data.image.title}
            date={date}
            theme={data.theme}
            type_event={data.type_event}
            id={idLlink}
          />
          <MainBackground 
            title={data.image.title}
            image={mainData.main_image.image}
            type_event={data.type_event}
          />
          <MainFooter
            data={data.footer?.text}
            theme={data.theme}
            is_active={data.footer?.is_active}
          />
        </div>
      </Layout>
    </main>
  )
}

export default IndexPage

export const Head = () => (
  <SEO title={'Lazy Mike'} 
  title_og={'Lazy Mike'} 
  description_og={`Lazy Mike gallery`}
  description={`Lazy Mike gallery`} 
  image={`/Snippet_logo.jpg`}
  image_og={`/Snippet_main.jpg`}
  />
)
export const query = graphql`
query MyQuery {
  strapiSetting {
    theme
    strapi_id
    type_event
    footer {
      id
      is_active
      text
    }
    start_date
    end_date
    image {
      title
      image_large {
        url
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      image_medium {
        url
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      image_small {
        url
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    page_id
  }
  allStrapiYarmarki {
    nodes {
      id
      slug
      strapi_id
    }
  }
  allStrapiExhibition {
    nodes {
      id
      slug
      strapi_id
    }
  }
}`

