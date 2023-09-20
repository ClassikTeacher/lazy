import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { BenefitsAbout, TeamBlockAbout, TeamCardAbout, TitleAbout } from '../modules/About'
import benefits_1 from '../images/about/Benefits_1.png'
import TextBlock from '../modules/About/components/TextBlock/TextBlock'
import { graphql, useStaticQuery } from 'gatsby'
import { SEO } from "../components/SEO/SEO"
import { defaultState } from '../context/GlobalContext'
import useIsomorphicLayoutEffect from '../hooks/use-isomorphic-layout-effect'

const AboutPage = (props)=>{


    const data = props.data.strapiAbout
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

    return(
        <div className='page'>
            <Layout location={props.location}>
                <div className="pageWrapper about">
                 <TitleAbout
                    text={data.title}
                    description={data.description}
                    scrollDerection={scrollDerection}
                 />
                 <BenefitsAbout
                    image={`${defaultState.urlStrapi}${data.benefits_block.image.url}`}
                    text={data.benefits_block.text}
                    author={data.benefits_block.citation}
                    scrollDerection={scrollDerection}
                    img={data.benefits_block.image.localFile}
                 />
                 <TextBlock
                    title={'founders'}
                    text={data.founders}
                    color={'white'}
                    position={'center'}
                    scrollDerection={scrollDerection}
                 />
                <TextBlock
                    title={'artists'}
                    text={data.artists}
                    color={'black'}
                    position={'left'}
                    scrollDerection={scrollDerection}
                 />
                <TextBlock
                    title={'philanthropy'}
                    text={data.philanthrophy}
                    color={'white'}
                    position={'right'}
                    scrollDerection={scrollDerection}
                 />
                <TextBlock
                    title={'education'}
                    text={data.education}
                    color={'black'}
                    position={'left'}
                    scrollDerection={scrollDerection}
                 />
                 <TeamBlockAbout  scrollDerection={scrollDerection}>
                    {data?.team?.map(item => {
                        return <TeamCardAbout
                            key={item.image.url}
                            position={item.position}
                            img={item.image.localFile}
                            name={item.name}
                        />
                    })}

                
                 </TeamBlockAbout>
                </div>
            </Layout>

        </div>
    )
}
export default AboutPage

export const Head = () => (
    <SEO title={'About Lazy Mike'} 
    title_og={'About Lazy Mike'} 
    description_og={`Lazy Mike gallery was founded by Mikhail Ovcharenko and Tatiana Melnikova in 2017.`}
    description={`Lazy Mike gallery was founded by Mikhail Ovcharenko and Tatiana Melnikova in 2017.`} 
    image={`/Snippet_logo.jpg`}
    image_og={`/Snippet_about.jpg`}
    pathname={'/about'}
    />
  )

export const query = graphql`
query MyQuery {
    strapiAbout {
      founders
      education
      artists
      description
      title
      philanthrophy
      benefits_block {
        text
        image {
            localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
          url
        }
        citation
      }
      team {
        position
        name
        image {
            localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            url
        }
      }
    }
  }`
