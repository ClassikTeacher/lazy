import React, { useRef, useState } from 'react'
import * as styles from './fairsBlock.module.css'
import { FairItem } from '../..'
import { Link } from 'gatsby'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'

const FairsBlock = ({title, arrFairs, to, scrollDerection})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()

    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    return(
        <div ref={el} className={`${styles.wrapper} ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''} ${arrFairs.length === 0 ? styles.hidden : ''}`}>
            <h2 className={styles.titleBlock}>
                {title}
            </h2>
            <div className={styles.contentBlock}>
                {arrFairs?.map(item =>{
                    return <FairItem 
                        to={`/fair/${item.slug}`}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        artists_other={item.artists_other}
                        artists={item.artists}
                        date={item.date}
                        location={item.location}
                    />
                })}
            </div>
        </div>
    )
}
export default FairsBlock