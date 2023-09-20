import React, { useRef, useState } from 'react'
import * as styles from './currentExhibitions.module.css'
import { Link } from 'gatsby'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const CurrentExhibitions = ({img, date, title, text, to})=>{
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
    const image = getImage(img)
    return(
        <Link to={to}>
            <div ref={el} className={`${styles.container}
            ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
            ${isAnimation ? styles._active : ''}`}>
                     <GatsbyImage className={styles.img} image={image} alt={title}/>
                    <div  className={styles.textBlock}>
                        <div className={styles.textBlock__date}>
                            {date}
                        </div>
                        <h3 className={styles.textBlock__title} dangerouslySetInnerHTML={{__html: title}}>

                        </h3>
                        <div className={styles.textBlock__text} dangerouslySetInnerHTML={{__html: text}}>

                        </div>
                    </div>
            
            </div>
        </Link>
    )
}
export default CurrentExhibitions