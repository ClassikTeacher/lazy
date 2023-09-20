import React, { useEffect, useState } from 'react'
import * as styles from './BlockCard.module.css'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import ItemCard from '../ItemCard/ItemCard'

const BlockCard = ({listWorks, artist})=>{
    const [worksArtist, setWorksArtist]= useState([])
    const [limit, setLimit] = useState(4)

    function initWorksArtist(){
        let count = 0
        const works = []
        while(count<=limit-1 && count<listWorks.length){
            works.push(listWorks[count])
            count ++
        }
        setWorksArtist(works)
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
        <div className={styles.wrapper}>
            <h2 className={styles.title}>
            selected works by {artist}
            </h2>
            <div className={styles.items}>
                {worksArtist?.map((item, index) => {
                   return <div  className={styles.itemCard}>
                   <ItemCard
                        key={item.id}
                        artist={artist}
                        date={item.date}
                        height={item.height}
                        width={item.width}
                        length={item.length}
                        id={item.id}
                        slug={item.slug}
                        image={item.image}
                        name={item.name}
                    />
                    </div>
                })}
            </div>
        </div>
    )
}
export default BlockCard