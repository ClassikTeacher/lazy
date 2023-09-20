import React, { useEffect, useRef, useState } from 'react'
import * as styles from './TextBlock.module.css'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'

const TextBlock = ({title, text, color, position, scrollDerection})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()

    useObserver(el, false, true, ()=> {animated()})
    function animated(){
        setIsAnimation(true)
    }
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})


    return(
        <div ref={el} className={`${styles.container} ${isAnimation ? styles._active : ''} 
        ${scrollDerection === 'bottom' ? styles._scrollBottom : styles._scrollTop} 
        ${color === 'black' ? styles.black : ''} 
        ${position === 'left' ? styles.left : position === 'right' ? styles.right : styles.center}`}>
            <h2 className={styles.title}>
                {title}
            </h2>
            <div className={styles.text} dangerouslySetInnerHTML={{__html: text}}>
             
            </div>
 
        </div>
    )
}
export default TextBlock