import React, { useEffect, useState } from 'react'
import * as styles from './Input.module.css'

const Input = ({value, changeValue, label, placeholder, isError, errorMessage, type, autoComplete})=>{
    const [inputActive, setInputActive] = useState(false)

    function focus(){
        setInputActive(true)
    }

    function focusOut(){
        if(value !== ''){
            setInputActive(true) 
         } else {
             setInputActive(false)
         }
    }
    useEffect(()=> {
        if(value !== ''){
            setInputActive(true) 
         }
    }, [value])

    return(
        <div className={styles.containerInput}>
             <label htmlFor='submitToNews' className={`${styles.containerInput__label} ${inputActive ? styles.visible : ''}`}>{label}</label>
            <input     
                id={label}
                className={styles.containerInput__input}
                type={type}
                autoComplete={autoComplete ? autoComplete : 'text'}
                placeholder={`${inputActive ? '' : placeholder}`}
                value={value}
                onChange={(e)=>changeValue(e.target.value)}
                onFocus={focus}
                onBlur={focusOut}
            />
            <span className={`${styles.containerInput__error} ${isError ? styles.visible : ''}`}>
                {errorMessage}
            </span>
        </div>
    )
}
export default Input