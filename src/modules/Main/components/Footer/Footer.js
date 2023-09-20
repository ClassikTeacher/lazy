import React, { useState } from 'react'
import * as styles from './Footer.module.css'

const Footer = (props)=>{
    const [visible, setVisible] = useState(true) 
    

    return(
    <div className={`${styles.wrapper} ${props.theme === 'green' ? styles.green : props.theme === 'white' ? styles.white : ''} ${props.is_active ? styles.isActive : ''}`}>
        {props.data}
    </div>
    )
}
export default Footer