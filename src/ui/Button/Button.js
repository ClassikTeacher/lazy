import React from 'react'
import * as styles from './Button.module.css'

const Button = ({children, classes, click, color, state})=>{

    function clickPrevent(e){
        e.preventDefault()
        click()
    }
    return(
        <button 
        className={`${styles.btn} ${classes !== undefined ? classes : ''} ${color === 'white' ? styles.white : ''}`}
        onClick={clickPrevent}
        >
            {state !== 'submit' ? children : <CheckIcon color={'white'} />}
        </button>
    )
}
export default Button

const CheckIcon = (props) =>(
<svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.8931 2.9999L27.9578 2.92554L27.8844 2.85976L25.978 1.15208L25.9024 1.08429L25.8358 1.16102L10.5353 18.7937L3.1529 11.1682L3.08568 11.0988L3.01399 11.1636L1.11555 12.88L1.03937 12.9489L1.11025 13.0232L10.4758 22.843L10.5516 22.9224L10.6236 22.8397L27.8931 2.9999Z" fill={props.color} stroke={props.color} stroke-width="0.2"/>
</svg>
    )