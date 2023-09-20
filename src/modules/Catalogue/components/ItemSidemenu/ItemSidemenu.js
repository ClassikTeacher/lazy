import React, { useEffect, useState } from 'react'
import * as styles from './ItemSidemenu.module.css'
import Checkbox from '../../../../ui/checkbox/Checkbox'


const ItemSidemenu = ({title, options, setOptions, type})=>{
    const [active, setActive] = useState(true)
    function changeOptions(e, id){
        const newOptions = [...options]
        if(type === 'sort'){
            newOptions?.map(item => item.status = false)
            newOptions[id].status = e
            setOptions(newOptions) 
        } else {
            newOptions[id].status = e
            setOptions(newOptions)   
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                {title}
                <div className={`${styles.image} ${active ? styles.active : ''} js-custom-hoverable`} onClick={()=>setActive(!active)}></div>
            </div>
            <div className={`${styles.options} ${active ? styles.active : ''}`}>
                {options?.map((item, index)=> {
                    return <Checkbox
                        key={index}
                        id={index}
                        label={item.text}
                        checked={item.status}
                        setChecked={changeOptions}
                    />
                })

                }
            </div>
        </div>
    )
}
export default ItemSidemenu