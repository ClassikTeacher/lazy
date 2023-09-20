import React, { useEffect, useRef, useState } from 'react'
import * as styles from './ArtistsBlock.module.css'
import ItemCard from '../ItemCard/ItemCard'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'

const ArtistsBlock = ({artistList})=>{
const [blockArtists, setBlockArtists] = useState([])
const [limit, setLimit] = useState(4)

function changeLimitElem(){
    if (typeof window !== 'undefined'){
        if(window.innerWidth > 960){
            setLimit(4)
        }
        if(window.innerWidth <= 960 && window.innerWidth > 480){
            setLimit(2)
        }  
        if(window.innerWidth <= 480){
            setLimit(1)
        }
    }
}

function initRow(){
    const NewArr = []
    let countRow = Math.floor(artistList.length/limit)
    if(artistList.length%limit){
        countRow += 1
    }
    if(artistList.length !== 0){
        for(let i = 0; i < countRow; i++){
            const itemsRow = [...artistList].slice(i*limit, (i+1)*limit)
            NewArr.push(itemsRow)
        }
    }
    setBlockArtists(NewArr)
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

useEffect(() => {
    initRow()
}, [limit])


    return(
        <div className={`${styles.wrapper}  `} >
            {blockArtists?.map(items => {
                return <div 
                className={`${styles.containerBlock}`} 
                key={Math.random()}>
                {items?.map(item => {
                    return<ItemCard
                                key={item.key}
                                artist={item.name}
                                id={item.id}
                                slug={item.slug}
                                image={item.image}
                            />
                })}
                 
                </div>
            })}
        </div>
    )
}
export default ArtistsBlock

export const Head = () => <title>Artists</title>