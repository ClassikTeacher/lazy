import React from 'react'
import * as styles from './LinkButton.module.css'
import arrow_link from '../../images/arrow_link.svg'

const LinkButton = ({children, link, className})=>{
    return(
        <a className={`${styles.wrapperLinkbtn} ${className}`} href={link}  target='_blank'>
            <div className={styles.wrapperLinkbtn__text}>
                {children}
            </div>
            <img className={styles.wrapperLinkbtn__img} src={arrow_link} alt='' />
        </a>
    )
}
export default LinkButton