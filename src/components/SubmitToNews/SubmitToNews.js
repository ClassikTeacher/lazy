import React, { useEffect, useRef, useState } from 'react'
import * as styles from './SubmitToNews.module.css'
import arrow from '../../images/Arrow.svg'
import clean from '../../images/Close.svg'
import check from '../../images/Check.svg'
import { defaultState } from '../../context/GlobalContext'

const urlStrapi = defaultState.urlStrapi

const SubmitToNews = ({isVisible})=>{
    const [email, setEmail] = useState('')
    const [inputActive, setInputActive] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const ref = useRef(null);
    const errorMessage = 'Please enter correct email address'

    function onChangeEmail(e){
        if(!e.target.value.includes(' ')){
            setEmail(e.target.value)
        } 
        

    }

    function submitEmail(){
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(pattern.test(email)){
            const messageSub = `email: ${email}, "Type": SUBSCRIBE TO RECEIVE LATEST NEWS ON OUR EXHIBITIONS AND ARTISTS`
            fetch(`${urlStrapi}/api/mailer/telegram`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: messageSub})
            }).then(() => {
                setSubmited(true)
            })
        
        } else {
            setErrorEmail(true)
            ref.current.focus();
        }
    }

    function focus(){
        setInputActive(true)
        setSubmited(false)
    }

    function focusOut(){
        if(email !== ''){
            setInputActive(true) 
         } else {
             setInputActive(false)
         }
    }

    function clearInput(){
        setEmail('')
        setInputActive(true) 
        setErrorEmail(false)
        ref.current.focus();
    }

    useEffect(()=> {
        setErrorEmail(false)
    }, [email])
    
    return(
        <div className={`${styles.wrapper} ${isVisible ? '' : styles.hidden}`}>
            <div className={styles.title}>
                Subscribe to receive latest news on&nbsp;our exhibitions&nbsp;and&nbsp;artists
            </div>
            <div className={styles.inputBlock}>
                <label htmlFor='submitToNews' className={`${styles.inputBlock__label} ${inputActive ? styles.visible : ''}`}>Your email</label>
                <input 
                    className={styles.inputBlock__input}
                    // type="email"
                    ref={ref}
                    autocomplete="off"
                    id='submitToNews'
                    placeholder={`${inputActive ? '' : 'Enter your email address'}`}
                    value={email}
                    onChange={onChangeEmail}
                    onFocus={focus}
                    onBlur={focusOut}
                />
                <span className={`${styles.inputBlock__error} ${errorEmail ? styles.visible : ''}`}>
                    {errorMessage}
                </span>
             <button className={`${styles.inputBlock__btnSubmit__ckeck} ${submited ? styles._submited : ''}`} disabled>
                    <img src={check} alt='btn' />
                </button>
                <button className={`${styles.inputBlock__btnSubmit} ${submited ? styles._submited : ''}`} onClick={submitEmail}>
                    <img src={arrow} alt='btn' />
                </button>
            
            <button className={`${styles.inputBlock__btnClean} ${inputActive && !submited ? styles.visible : '' }`} onClick={clearInput}>
                <img src={clean} alt='btn' />
            </button>
            </div>
        </div>
    )
}
export default SubmitToNews