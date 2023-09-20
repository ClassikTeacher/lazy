import React from 'react'
import * as styles from './ItemCard.module.css'
import moment from 'moment'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ItemCard = ({id, artist, slug, width, height, length, name, date, image})=>{
    const img = getImage(image)

    return(
        <div className={styles.container}>
            <Link to={`/product/${slug}`}>
                <div className={styles.card} >
                    <div className={styles.img__wrapper}>
                    <GatsbyImage className={styles.card__imge} image={img} alt={artist}/>
                    </div>
                    <div className={styles.cardWrapper}>
                        <div className={styles.card__artist}>
                            {artist}
                        </div>
                        <div className={styles.card__name}>
                            {name}, {moment(date, 'YYYY-MM-DD').year()}
                        </div>
                        <div className={styles.card__size}>
                            {`${height} x ${width}${length !== '' && length && length !== undefined ? ` x ${length}`: ''} cm`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default ItemCard