import React, { useRef, useState } from 'react'
import * as styles from './textBlock.module.css'
import LinkButton from '../../../../ui/LinkButton/LinkButton'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'

const TextBlock = ({text, title, link})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()
    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    return(
        <div className={styles.wrapper}>
        <div ref={el} className={`${styles.container} ${isAnimation ? styles._active : ''}`}>
            <h1 className={styles.title} dangerouslySetInnerHTML={{__html: title}}>

            </h1>
            <h2 className={styles.text} dangerouslySetInnerHTML={{__html: text}}>
                
            </h2>
            {link
                ?<LinkButton
                link={link}
                >
                    Read more
                </LinkButton>
                :''
            }
            
        </div>
        </div>
    )
}
export default TextBlock