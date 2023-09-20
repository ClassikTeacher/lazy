import React from 'react'
import * as styles from './cv.module.css'
import moment from 'moment'

const cv = ({artist, educations, exhibitions, gruopExhibitions})=>{

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                {artist}
            </h1>
            {educations?.length
            ?<div className={styles.educations}>
                <h2 className={styles.educations__title}>
                    EDUCATION
                </h2>
                {educations?.map(item=>{
                    return<div className={styles.item} key={Math.random()}>
                        <div className={styles.item__date}>
                            {moment(item.date, 'YYYY-MM-DD').year()}
                        </div>
                        <div className={styles.item__text}>
                            {item.name}
                        </div>
                    </div>
                })}
                
            </div>
            : ''}
            {exhibitions?.[0]?.list?.length
            ? <div className={styles.exhibitions}>
                    <h2 className={styles.exhibitions__title}>
                    SOLO EXHIBITIONS
                    </h2>
                    {exhibitions?.map(items => {
                        return <div className={styles.item} key={Math.random()}>
                        <div className={styles.item__date}>
                            {moment(items.date, 'YYYY-MM-DD').year()}
                        </div>
                        {items?.list?.map(item => {
                            return <div className={styles.item__text} key={Math.random()}>
                                {item}            
                            </div>
                        })}
                    
                    </div>
                    })}
                    
                </div>
            :''
            }
           {gruopExhibitions?.[0]?.list?.length
            ? <div className={styles.exhibitions}>
                    <h2 className={styles.exhibitions__title}>
                    GROUP EXHIBITIONS
                    </h2>
                    {gruopExhibitions?.map(items => {
                        return <div className={styles.item} key={Math.random()}>
                        <div className={styles.item__date}>
                            {moment(items.date, 'YYYY-MM-DD').year()}
                        </div>
                        {items?.list?.map(item => {
                            return <div className={styles.item__text} key={Math.random()}>
                                {item}            
                            </div>
                        })}
                    
                    </div>
                    })}
                    
                </div>
            :''
            }
            
        </div>
    )
}
export default cv