import React from 'react'
import Layout from '../components/Layout/Layout'
import { ContactForm, ContactTextBlock } from '../modules/Contact'
import { SEO } from '../components/SEO/SEO'

const ContactPage = (props)=>{
    return(
        <div className='page'>
            <Layout location={props.location}>
                <div className="pageWrapper contact">
                    <ContactTextBlock />
                    <ContactForm />
                </div>
            </Layout>
           
        </div>
    )
}
export default ContactPage

export const Head = () => (
    <SEO title={'Contact'} 
    title_og={'Contact'} 
    description_og={`Got any questions? Use our contact form for general inquires.`}
        description={`Got any questions? Use our contact form for general inquires.`} 
        image={`/Snippet_logo.jpg`}
        image_og={`/Snippet_logo.jpg`}
        pathname={'/contact'}
    />
  )