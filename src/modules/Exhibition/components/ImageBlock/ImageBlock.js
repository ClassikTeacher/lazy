import React, { useRef, useState } from 'react'
import * as styles from './ImageBlock.module.css'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ImageBlock = ({image, margin, description})=>{
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
        <div ref={el} className={`${styles.container} ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''} ${margin === 'top' ? styles.topMargin : styles.bottomMargin}`}>
            <GatsbyImage className={styles.img} image={img} alt={'img'}/>
            {/* <img src='http://localhost:8000/static/c414c14a2863fa405ca1f523cb4d1bc1/9a858/1656590277157171303_626d49528e.webp' className={styles.img} alt='' /> */}
            <div className={styles.description} >
                {description}
            </div>
        </div>
    )
}
export default ImageBlock