import React from 'react'
import * as styles from './Pagination.module.css'

const Pagination = ({page, pages, setPage})=>{

    function nextPage(){
        if(page < pages){
            setPage(page+1)
        }
    }
    function prevPage(){
        if(page > 1){
            setPage(page-1)
        }
    
    }
    return(
        <div className={styles.container}>
            <div className={styles.prevBtn} onClick={prevPage}>

            </div>
            <div className={styles.pages}>
                {`Page ${page} of ${pages}`}
            </div>
            <div className={styles.nextBtn}  onClick={nextPage}>
                
            </div>

        </div>
    )
}
export default Pagination