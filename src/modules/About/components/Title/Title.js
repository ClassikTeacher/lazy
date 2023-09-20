import React, { useRef, useState } from 'react'
import * as styles from './Title.module.css'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver';


const Title = ({text, description, scrollDerection})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()

    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    
    return(
        <div ref={el} className={`${styles.container} 
        ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            <h1 className={styles.text}  dangerouslySetInnerHTML={{__html:text}}>

            </h1>
            <h3 className={styles.description} dangerouslySetInnerHTML={{__html:description}}>

            </h3>
        </div>
    )
}
export default Title

