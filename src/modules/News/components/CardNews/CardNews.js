import React, { useRef, useState } from 'react'
import * as styles from './CardNews.module.css'
import { Link } from 'gatsby'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const CardNews = ({date, image, title, description, artist, to})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()
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


    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    const img = getImage(image)
    return(
        <Link className={styles.containerLink} to={to}>
            <div className={`${styles.container}
            ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
            ${isAnimation ? styles._active : ''}`} 
            ref={el}>
                {/* <img src={image} alt={artist[0].name} className={styles.img} /> */}
                <GatsbyImage className={styles.img} image={img} alt={artist[0]?.name}/>
                <div className={styles.date}>
                    {date}
                </div>
                <h2 className={styles.title} dangerouslySetInnerHTML={{__html: title}}>
                    
                </h2>
                <h3 className={styles.description} dangerouslySetInnerHTML={{__html: description}}>
                    
                </h3>
            </div>
        </Link>
    )
}
export default CardNews