import React from 'react'
import * as styles from './Loader.module.css'
import logo_green from '../../images/logo_green.svg'

const Loader = ({visible})=>{
    return(
        <div className={`${styles.wrapper} ${visible ? '' : styles.hidden}`}>
            <img className={styles.image} src={logo_green} alt='logo' />
        </div>
    )
}
export default Loader