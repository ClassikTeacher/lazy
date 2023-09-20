import React from 'react'
import * as styles from './fairItem.module.css'
import { Link } from 'gatsby'

const fairItem = ({name, date, artists, artists_other, location, id, to})=>{

    return(
        <Link to={to}>
        <div className={styles.wrapper}>
            <div className={styles.wrapperRevers}>
                <h3 className={styles.fairName}>
                    {name}
                </h3>
                <div className={styles.fairDate} dangerouslySetInnerHTML={{__html: date}}>
                    {/* {date} */}
                </div>
            </div>
            <div className={styles.fairArtist}>
                {artists?.map((item, index) => {
                    if(index !== artists.length-1){
                        return `${item}, `
                    } else {
                        return item
                    }
                   
                })}
                {artists.length !== 0 
                    ? artists_other !== undefined && artists_other !== null && artists_other !== '' ? `, ${artists_other}` : ''
                    : artists_other !== undefined && artists_other !== null && artists_other !== '' ? `${artists_other}` : ''
                }
            </div>
            <div className={styles.fairLocation}>
                {location}
            </div>
        </div>
        </Link>
    )
}
export default fairItem