import React, { useRef, useState } from 'react'
import * as styles from './AboutArtist.module.css'
import moment from 'moment'
import LinkButton from '../../../../ui/LinkButton/LinkButton'
import { useObserver, useObserverHidden} from '../../../../hooks/useObserver'

const AboutArtist = ({about, education, exhibition, id, slug, scrollDerection})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()

    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    const shortEducation = education?.slice(0,3).sort((b, a) => {
        const dateA =  new Date(a?.date);
        const dateB = new Date(b?.date)
     return dateA-dateB
    })
    const shortExhibition = exhibition.slice(0,5).sort((b, a) => {
        const dateA =  new Date(a.date);
        const dateB = new Date(b.date)
     return dateA-dateB
    })
    return(
        <div ref={el} className={`${styles.wrapper}  ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            <div className={styles.container}>
                <div className={styles.containerAbout}>
                    <h2 className={styles.containerAbout__title}>
                        about the artist
                    </h2>
                    <div className={styles.containerAbout_text}>
                            {about}
                    </div>
                </div>
                <div className={styles.containerCV}>
                    {shortEducation?.length
                    ?<div className={styles.containerCV__education}>
                        <div className={styles.containerCV__title}>
                        Education
                        </div>
                        {shortEducation?.map(item => {
                            return <div className={styles.containerCV__text} key={Math.random()}>
                                    <div className={styles.containerCV__text__date}>{moment(item.date, 'YYYY-MM-DD').year()}</div>
                                    <div className={styles.containerCV__text__name}>{item.name}</div>
                                        
                                </div>
                        })}
                        
                    </div>
                    :''}
                    <div className={styles.containerCV__exhibition}>
                        <div className={styles.containerCV__title}>
                        Selected solo exhibitions
                        </div>
                        {shortExhibition?.map(item => {
                            return <div className={styles.containerCV__text} key={Math.random()}>
                                    <div className={styles.containerCV__text__date}>{moment(item.date, 'YYYY-MM-DD').year()}</div>
                                    <div className={styles.containerCV__text__name}>{item.name}</div>
                                        
                                </div>
                        })}
                    </div>
                </div>
            </div>
            <LinkButton className={styles.linkBtn} link={`/cv/${slug}`}>Full CV</LinkButton>
        </div>
    )
}
export default AboutArtist