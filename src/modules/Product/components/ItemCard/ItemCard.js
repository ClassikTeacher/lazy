import React, { useRef, useState } from 'react'
import * as styles from './ItemCard.module.css'
import moment from 'moment'
import { Link } from 'gatsby'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ItemCard = ({id, artist, slug, width, height, length, name, date, image})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()
    const [scrollDerection, setScrollDerection] = useState('bottom')
    let scrollY = 0


    function scrollTo(){
        if (typeof window !== 'undefined'){
            if(window.scrollY > scrollY){
                setScrollDerection('bottom')
            } else {
                setScrollDerection('top')
            }
            scrollY= window.scrollY

        }
    }

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined'){
       
            window.addEventListener('scroll', scrollTo);

            return () => window.removeEventListener('scroll', scrollTo);
        }
    }, []);


    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    const img = getImage(image)
    return(
        <div ref={el} className={`${styles.container}
        ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
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
                            {`${height} x ${width}${length !== '' && length!==null && length !== undefined ? ` x ${length}`: ''} cm`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default ItemCard