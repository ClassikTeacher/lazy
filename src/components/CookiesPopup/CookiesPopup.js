import React, { useEffect, useState } from 'react'
import * as styles from './CookiesPopup.module.css'
import Button from '../../ui/Button/Button'
import Cookies from 'js-cookie';

const CookiesPopup = ()=>{

    const [isVisible, setIsVisible] = useState(false)
    
    function clicKAccept(){
        if (typeof window !== 'undefined'){
            Cookies.set('acceptCookie', 1)
            sessionStorage.setItem('acceptCookie', 1)
            setIsVisible(false)
        }
    }
    function clicKDecline(){
        if (typeof window !== 'undefined'){
            Cookies.set('acceptCookie', 0)
            sessionStorage.setItem('acceptCookie', 1)
            setIsVisible(false)
        }
    }

    function initState(){
        if (typeof window !== 'undefined'){
            const stateCookie = Cookies.get('acceptCookie')
            const pageStorage = sessionStorage.getItem('acceptCookie')
            if(stateCookie !== undefined && stateCookie !== null && +stateCookie){
                setIsVisible(false)
                sessionStorage.setItem('acceptCookie', 1)
            } else {
                if(pageStorage !== undefined && pageStorage !== null && +pageStorage){
                    setIsVisible(false)
                } else {
                    setIsVisible(true)
                }
            
            }
        }
    }

    useEffect(()=>{
        initState()
    }, [])

    return(
        <div className={`${styles.wrapper} ${isVisible ? '' : styles.hidden}`}>
            <div className={styles.container}>
                <div className={styles.containerTitle}>
                We use cookies
                </div>
                <div className={styles.containerDescription}>
                Cookies enhance your experience, tailor your ads and improve our website
                </div>
                <div className={styles.containerBtn}>
                    <div className={styles.containerBtn__decline_white} onClick={clicKAccept}>
                        Accept
                    </div>
                    <div className={styles.containerBtn__decline} onClick={clicKDecline}>
                        Decline
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CookiesPopup