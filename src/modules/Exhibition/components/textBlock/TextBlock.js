import React, { useRef, useState } from 'react'
import * as styles from './TextBlock.module.css'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'

const TextBlock = ({text})=>{
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
        <div ref={el} className={`${styles.container} ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`} >
            <div  className={styles.textBlock} dangerouslySetInnerHTML={{__html: text}}>

            </div>
        </div>
    )
}
export default TextBlock