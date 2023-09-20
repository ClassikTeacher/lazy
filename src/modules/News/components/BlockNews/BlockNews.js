import React, { useEffect, useRef, useState } from 'react'
import * as styles from './BlockNews.module.css'
import Button from '../../../../ui/Button/Button'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import CardNews from '../CardNews/CardNews'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'

const BlockNews = ({listNews, to})=>{
    const [currentNews, setCurrentNews] = useState([])
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
    const [limit, setLimit] = useState(12)

    function check(){
        if (typeof window !== 'undefined'){
            if(window.innerWidth > 960){
                setLimit(12)
            } else if(window.innerWidth <= 960 && window.innerWidth > 480){
                setLimit(4)
            } else {
                setLimit(3)
            }
        }
    }

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined'){
        window.addEventListener('resize', check);
        check()
        return () => window.removeEventListener('resize', check);
        }
    }, []);

    function loadMore(){
        setCurrentNews(listNews)
    }

    function initListNews(){
        const newList = []
        listNews?.map((item, index) => {
           
            if(index < limit){
                newList.push(item) 
            }
        })
        setCurrentNews(newList)
    }


    useEffect(() => {
        // check()
        initListNews()
    }, [limit])

    return(
        <div className={styles.wrapper}>
            <h1 ref={el} className={`${styles.title}
            ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
            ${isAnimation ? styles._active : ''}`}>
                News & Press
            </h1>
            <div className={styles.container}>
                {currentNews?.map(item => {
                   return <CardNews
                        key={item.id}
                        to={`/news/${item.slug}`}
                        artist={item.artist}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        date={item.date}
                    />
                })}
            </div>
            {listNews.length !== currentNews.length &&
            <Button click={loadMore} color={'white'}>
                Load more
            </Button>
            }
            
        </div>
    )
}
export default BlockNews