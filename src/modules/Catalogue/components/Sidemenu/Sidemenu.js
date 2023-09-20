import React, { useEffect, useState } from 'react'
import * as styles from './Sidemenu.module.css'
import ItemSidemenu from '../ItemSidemenu/ItemSidemenu'

const Sidemenu = ({filterArtist, setFilterArtist, filterMedium, setFilterMedium, sorted, setSorted, sort, setSort})=>{

   useEffect(() => {
    const newSort = [...sort]
    if(sorted !== ''){
        newSort?.map(item => {
            if(item.value === sorted){
                item.status = true
            }
        })
    }
    setSort(newSort)
}, [sorted])

   useEffect(()=> { 
    let newSort = ''
        sort?.map(item => {
            if(item.status){
               newSort = item.value
            }
        })
    setSorted(newSort)
   }, [sort])

 

    return(
        <div className={styles.container}>
            <ItemSidemenu
                title={"Sort"}
                options={sort}
                setOptions={setSort}
                type={'sort'}
            />
            <ItemSidemenu
                title={"Artists"}
                options={filterArtist}
                setOptions={setFilterArtist}
                type={'filter'}
            />
              <ItemSidemenu
                title={"Medium"}
                options={filterMedium}
                setOptions={setFilterMedium}
                type={'filter'}
            />
        </div>
    )
}
export default Sidemenu