import React from 'react'
import * as styles from './Checkbox.module.css'

const Checkbox = ({label, checked, setChecked, type, id})=>{

    return(
        <div className={styles.checkbox}>
                <input onChange={(e) => setChecked(e.target.checked, id)}
                checked={checked}
                className={styles.checkbox__input} 
                type={type ? type : 'checkbox'}  
                id={label}/>
                <label  htmlFor={label}>
                    <div className={styles.checkbox__text}>
                          {label}
                    </div>
                  
                </label>
        </div>
    )
}
export default Checkbox