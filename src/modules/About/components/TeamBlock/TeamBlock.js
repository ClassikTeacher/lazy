import React, { useRef, useState } from 'react'
import * as styles from './TeamBlock.module.css'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'

const TeamBlock = ({children, scrollDerection})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()

    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    return(
        <div ref={el} className={`${styles.container} 
        ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            <h2 className={styles.title}>
                Our team
            </h2>
            <div className={styles.blocks}>
                {children}
                {/* {children?.map((item,index)=>{
                    if(index === 0 || index % 2 === 0){
                    return <div className={styles.subBlock} key={Math.random()}>
                        {item}
                        {children?.[index+1]}
                    </div>} else{
                        return''
                    }
                })} */}
            </div>
        </div>
    )
}
export default TeamBlock