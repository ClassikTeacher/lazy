import React, { useEffect, useState } from 'react'
import * as styles from './CatalogueBlockItems.module.css'
import ItemCard from '../ItemCard/ItemCard'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'

const CatalogueBlockItems = ({listItems})=>{
    const [limitInRow, setLimitInRow] = useState(3)
    
    function changeLimitElem(){
        if (typeof window !== 'undefined'){
            if(window.innerWidth > 960){
                setLimitInRow(3)
            }
            if(window.innerWidth <= 960){
                setLimitInRow(2)
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

    return(
        <div className={styles.wrapper}>
            {listItems?.map((item, index) => {
                if(index === 0 || index % limitInRow === 0){
                    return <div className={styles.container} key={Math.random()}>
                                <ItemCard
                                    id={item.id}
                                    artist={item.artist}
                                    date={item.date}
                                    image={item.image}
                                    name={item.name}
                                    height={item.height}
                                    width={item.width}
                                    length={item.length}
                                    slug={item.slug}
                                    key={Math.random()}
                                />
                                {limitInRow === 3
                                      ? <>
                                        {listItems[index+1]
                                            ?  <ItemCard
                                                id={listItems[index+1].id}
                                                artist={listItems[index+1].artist}
                                                date={listItems[index+1].date}
                                                image={listItems[index+1].image}
                                                name={listItems[index+1].name}
                                                height={listItems[index+1]?.height}
                                                width={listItems[index+1]?.width}
                                                length={listItems[index+1]?.length}
                                                slug={listItems[index+1]?.slug}
                                                key={Math.random()}
                                            />
                                            :<div className={styles.fake__block}></div>
                                        }
                                        {listItems[index+2] 
                                            ?<ItemCard
                                                id={listItems[index+2].id}
                                                artist={listItems[index+2].artist}
                                                date={listItems[index+2].date}
                                                image={listItems[index+2].image}
                                                name={listItems[index+2].name}
                                                height={listItems[index+2]?.height}
                                                width={listItems[index+2]?.width}
                                                length={listItems[index+2]?.length}
                                                slug={listItems[index+2]?.slug}
                                                key={Math.random()}
                                            />
                                            :<div className={styles.fake__block}></div>
                                        }
                                        </>
                                        
                                      : <>
                                      {listItems[index+1]
                                            ?  <ItemCard
                                                id={listItems[index+1].id}
                                                artist={listItems[index+1].artist}
                                                date={listItems[index+1].date}
                                                image={listItems[index+1].image}
                                                name={listItems[index+1].name}
                                                height={listItems[index+1]?.height}
                                                width={listItems[index+1]?.width}
                                                length={listItems[index+1]?.length}
                                                slug={listItems[index+1]?.slug}
                                                key={Math.random()}
                                            />
                                            :<div className={styles.fake__block}></div>
                                        } 
                                        </>
                                }

                            </div>
                    } else {
                        return''
                    }
            })}
        </div>

    )
}
export default CatalogueBlockItems