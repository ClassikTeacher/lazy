import React, { useEffect, useRef, useState } from 'react'
import * as styles from './NewsBlockCard.module.css'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'

import LinkButton from '../../../../ui/LinkButton/LinkButton'
import NewsItemCard from '../NewsItemCard/NewsItemCard'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'

const NewsBlockCard = ({listNews, artist, scrollDerection})=>{
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()

    useObserver(el, false, true, ()=> {setIsAnimation(true)})
    useObserverHidden(el, false, true, ()=> { setIsAnimation(false)})
    const [newsArtist, setNewsArtist]= useState([])
    const [limit, setLimit] = useState(4)

    function initWorksArtist(){
        let count = 0
        const works = []
        while(count<=limit-1 && count<listNews.length){
            works.push(listNews[count])
            count ++
        }
        setNewsArtist(works)
    }
    function changeLimitElem(){
        if (typeof window !== 'undefined'){
            if(window.innerWidth > 960){
                setLimit(4)
            }
            if(window.innerWidth <= 960 && window.innerWidth > 480){
                setLimit(2)
            }  
            if(window.innerWidth <= 480){
                setLimit(4)
            }
        }
    }

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined'){
            window.addEventListener('resize', changeLimitElem);
            return () => window.removeEventListener('resize', changeLimitElem);
        }
    }, []);  

    useEffect(() => {
        changeLimitElem()
    }, [])

    useEffect(()=> {
        initWorksArtist()
    }, [limit])
    
    return(
        <div ref={el} className={`${styles.wrapper} ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''} ${listNews.length === 0 ? styles.hidden : ''}`}>
            <h2 className={styles.title}>
            latest
            </h2>
            <div className={styles.items}>
                {newsArtist?.map((item, index) => {
                   return <div  className={styles.itemCard}>
                   <NewsItemCard
                     artist={item.artist}
                     date={item.date}
                     description={item.description}
                     image={item.image}
                     title={item.title}
                     to={`/news/${item.slug}`}
                    />
                    </div>
                })}
            </div>
            <LinkButton link={'/news'}>All news</LinkButton>
        </div>
    )
}
export default NewsBlockCard