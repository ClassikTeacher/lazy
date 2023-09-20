import React, { useEffect, useRef, useState } from 'react'
import * as styles from './image.module.css'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Images = ({image, alt, description})=>{
    const [scrollDerection, setScrollDerection] = useState('bottom')
    let scrollY = 0
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()

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


    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    const img = getImage(image)
    return(
        <div ref={el} className={`${styles.container} ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            {/* <img src={image} alt={alt} className={styles.img} /> */}
            <GatsbyImage className={styles.img} image={img} alt={alt}/>
            <div className={styles.description} dangerouslySetInnerHTML={{__html: description}}>

            </div>
        </div>
    )
}
export default Images