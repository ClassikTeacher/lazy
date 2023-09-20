import React, { useRef, useState } from 'react'
import * as styles from './Benefits.module.css'
import './Benefits.module.css'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'

const Benefits = ({image, text, author, scrollDerection, ...props})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()
    const img = getImage(props.img)
    
    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    return(
        <div ref={el} className={`${styles.container} 
        ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            <GatsbyImage className={styles.img} image={img} alt={author}/>
            {/* <img className={styles.img} src={image} alt={author} /> */}

            <div className={styles.textBlock}>
                <div className={styles.textBlock__text} dangerouslySetInnerHTML={{__html: text}}>

                </div>
                <div className={styles.textBlock__author}>
                    {author}
                </div>
            </div>
        </div>
    )
}
export default Benefits

