import React, { useRef, useState } from 'react'
import * as styles from './CardArtist.module.css'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const CardArtist = ({image, name, scrollDerection})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()

    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    const img = getImage(image)
    return(
        <div ref={el} className={`${styles.container} 
        ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            <h1 className={styles.nameArtist}>
                {name}
            </h1>
            <GatsbyImage className={styles.image} image={img} alt={name}/>
        </div>
    )
}
export default CardArtist