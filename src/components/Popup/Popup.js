import React, { Children, useEffect } from 'react'
import * as styles from './Popup.module.css'
import { useGlobalContext } from '../../context/GlobalContext'
import close from '../../images/Close.svg'

const Popup = ({children, title, isVisible, setIsVisible})=>{
    const {isVisiblePopup, changePopup, elem, changeElemPopup} = useGlobalContext()
 
    function closeModal(){
        changePopup(false)
    }
    useEffect(() => {
        if (isVisiblePopup) {
          document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
      }, [isVisiblePopup])


    return(
        <div className={`${styles.wrapper} ${isVisiblePopup ? styles.modalOpen :''}`} onClick={closeModal} >
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.closeBtn} onClick={closeModal}>
                    <img src={close} alt='cls' />
                </div>
                <div className={styles.titlePopup}>
                    {title}
                </div>
                <div className={styles.bodyPopup}>
                     {elem}
                </div>
               
            </div>
        </div>
    )
}
export default Popup