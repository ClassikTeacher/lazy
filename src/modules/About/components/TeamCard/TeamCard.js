import React from 'react'
import * as styles from './TeamCard.module.css'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const TeamCard = ({position, name, img})=>{
    const image = getImage(img)

    return(
        <div className={styles.container}>
             <GatsbyImage className={styles.img} image={image} alt={name}/>
            {/* <img src={image} alt={name} className={styles.img}/> */}
            <div className={styles.position}>
            {position}
            </div>
            <div className={styles.name}>
            {name}
            </div>
        </div>
    )
}
export default TeamCard