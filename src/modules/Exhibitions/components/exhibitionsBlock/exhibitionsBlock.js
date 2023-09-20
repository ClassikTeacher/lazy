import React from 'react'
import * as styles from './exhibitionsBlock.module.css'

const exhibitionsBlock = ({title, list, children})=>{
    return(
        <div className={`${styles.wrapper} ${list.length === 0 ? styles.hidden : ''}`}>
            <h2 className={styles.titleBlock}>
                {title}
            </h2>
            <div className={styles.contentBlock}>
                {children}
            </div>
        </div>
    )
}
export default exhibitionsBlock