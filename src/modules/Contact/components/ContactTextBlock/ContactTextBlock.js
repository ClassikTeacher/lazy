import React from 'react'
import * as styles from './ContactTextBlock.module.css'

const ContactTextBlock = ()=>{
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                Say Hey
            </h1>
            <h2 className={styles.subTitle}>
                Got any questions?
            </h2>
            <div className={styles.description}>
                Tick the box if you would like to be included in our mailing list to receive latest news and exclusive offers from us.
            </div>
        </div>
    )
}
export default ContactTextBlock