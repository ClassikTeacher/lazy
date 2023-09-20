import React, { useEffect } from 'react'
import * as styles from './PopupFilter.module.css'

const PopupFilter = ({children, isOpen, setIsOpen})=>{

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden'
        } else {
            
            document.body.style.overflow = ''
        }
      }, [isOpen])


    return(
        <div className={`${styles.wrapper} ${isOpen ? styles.isOpen : ''}`}>
            <div className={styles.container}>
                <div className={styles.title}>
                    filter
                    <div className={`${styles.title__closeBtn} js-custom-hoverable`} onClick={()=>setIsOpen(false)}></div>
                </div>
                <div className={styles.contentBlock}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default PopupFilter