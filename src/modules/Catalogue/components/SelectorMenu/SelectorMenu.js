import React, { useEffect, useState } from 'react'
import * as styles from './SelectorMenu.module.css'

const SelectorMenu = ({sorted, setSorted, isOpen, setIsOpen, sort, setSort})=>{
    const [sortIsActive, setSortIsActive] = useState(false)
    const [filterIsActive, setFilterIsActive] = useState(false)

    function sortClik(value){
        const newOptions = [...sort]

        newOptions?.map(item => {
            if(item.value === value){
                item.status = !item.status
            } else {
                item.status = false
            }
        })
        setSort(newOptions) 
        if(value === sorted){
            setSorted('')
        } else {
            setSorted(value)
        }
     
    }

   
    return(
        <div className={styles.container}>
            <div className={`${styles.containerFilter} js-custom-hoverable`} onClick={()=>setIsOpen(true)}>
                <span>Filter</span>
                <div className={`${styles.image__filter}`} ></div>
            </div>
            <div className={`${styles.containerSort} js-custom-hoverable`} onClick={()=>setSortIsActive(!sortIsActive)}>
                <span>Sort</span>
                <div className={`${styles.image__sort}`} ></div>
                <div className={`${styles.containerSortOptions} ${sortIsActive ? styles.isActive : ''}`}>
                    {
                        sort?.map((item, index) => {
                            return <div className={`${styles.containerSortOptions__item} ${index === sort.length-1 ? styles._lastItem : ''}`} onClick={()=>sortClik(item.value)}>
                                    <div className={`${styles.containerSortOptions__item__check} ${sorted === item.value ? styles.checked : ''}`}></div>
                                    {item.text}
                                </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default SelectorMenu