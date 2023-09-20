import React from 'react'
import * as styles from './NewsItemCard.module.css'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const NewsItemCard = ({date, image, title, description, artist, to})=>{
    const img = getImage(image)

    return(
        <div className={styles.container}>
        <Link to={to}>
             <div className={styles.card} >
            <div className={styles.img__wrapper}>
            <GatsbyImage className={styles.card__imge} image={img} alt={artist}/>

                <div className={styles.date}>
                    {date}
                </div>
                <div className={styles.title} dangerouslySetInnerHTML={{__html: title}}>
                    
                </div>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: description}}>
                    
                </div>
            </div>
            </div>
        </Link>
        </div>
    )
}
export default NewsItemCard