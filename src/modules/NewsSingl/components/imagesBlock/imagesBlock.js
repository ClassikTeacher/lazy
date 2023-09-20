import React from 'react'
import * as styles from './imagesBlock.module.css'
import Image from '../images/image'
import { defaultState } from '../../../../context/GlobalContext'

const urlStrapi = defaultState.urlStrapi

const imagesBlock = ({images})=>{
    return(
        <div className={styles.container}>
            {images?.map(item=>{
                return  <Image 
                            key={Math.random()}
                            image={item.image.localFile}
                            alt={item.description}
                            description={item.description}
                        />
            })}
        </div>
    )
}
export default imagesBlock