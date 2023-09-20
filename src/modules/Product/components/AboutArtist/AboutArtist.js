import React, { useRef, useState } from 'react'
import * as styles from './AboutArtist.module.css'
import LinkButton from '../../../../ui/LinkButton/LinkButton'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'

const AboutArtist = ({about, id})=>{
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
    return(
        <div ref={el} className={`${styles.wrapper}         
        ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            <h2 className={styles.title}>
            About the artist
            </h2>
            <div className={styles.text} dangerouslySetInnerHTML={{__html: about}}>

            </div>
            <LinkButton link={`/artist/${id}`}>See artist’s profile</LinkButton>
        </div>
    )
}
export default AboutArtist