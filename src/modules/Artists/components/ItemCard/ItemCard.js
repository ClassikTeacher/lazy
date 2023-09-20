import React, { useRef, useState } from 'react'
import * as styles from './ItemCard.module.css'
import { Link } from 'gatsby'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'


const ItemCard = ({id, artist, image, slug})=>{
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
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()
    
    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    const img = getImage(image)
    return(
            <div ref={el}
             className={`${styles.container} 
             ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
            ${isAnimation ? styles._active : ''}`}>
                <Link to={`/artist/${slug}`}>
                <div className={styles.card} >
                <h2 className={styles.nameArtist}>
                        {artist}
                </h2>
                <GatsbyImage className={styles.image} image={img} alt={artist}/>
                </div>
                </Link>
            </div>

    )
}
export default ItemCard