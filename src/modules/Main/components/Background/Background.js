import React, { useEffect, useState } from 'react'
import * as styles from './Background.module.css'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Background = (props)=>{
    const [resolution, setResolution] = useState("desktop")
    
  function check(){
    if (typeof window !== 'undefined'){
        if(window.innerWidth > 960){
            setResolution("desktop")
        } else if(window.innerWidth <= 960 && window.innerWidth > 480){
            setResolution("pad")
        } else {
            setResolution("phone")
        }
    }
    }
    const image = (img) => {return getImage(img)}

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined'){
        window.addEventListener('resize', check);

        return () => window.removeEventListener('resize', check);
        }
    }, []);

    useEffect(() => {
        check()
    }, [])
return(
    <div className={styles.wrapper}>
        {resolution === 'desktop'
            ?<GatsbyImage className={styles.image} loading="eager" image={image(props?.image[resolution])} alt={props.title}/>

           
            : <GatsbyImage className={styles.image} loading="eager"  image={image(props?.image[resolution])} alt={props.title}/>

        }
       <GatsbyImage className={styles.image} loading="eager"  image={image(props?.image[resolution])} alt={props.title}/>

    </div>
    )
}
export default Background