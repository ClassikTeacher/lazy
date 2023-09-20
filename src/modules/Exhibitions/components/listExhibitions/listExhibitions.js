import React, { useRef, useState } from 'react'
import * as styles from './listExhibitions.module.css'
import { Link } from 'gatsby'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ListExhibitions = ({listExhibitions, to})=>{
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
    const image = (img) => {return getImage(img)}

    return(
        <div ref={el} className={`${styles.wrapper }           
             ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            {listExhibitions?.map(item => {
            return <Link to={`/exhibition/${item.slug}`}>
            <div className={styles.exhibitionContainer} key={item.id}>
                    <GatsbyImage className={styles.exhibitionContainer__img} image={image(item.image)} alt={item.title}/>
                    {/* <img src={item.image} alt={item.title} className={styles.exhibitionContainer__img} /> */}
                    <div className={styles.exhibitionContainer__date}>
                        {item.date}
                    </div>
                    <h3 className={styles.exhibitionContainer__title} dangerouslySetInnerHTML={{__html: item.title}}>

                    </h3>
                    <div className={styles.exhibitionContainer__text} dangerouslySetInnerHTML={{__html: item.description}}>

                    </div>
                </div>
            </Link>
            })}
        </div>
    )
}
export default ListExhibitions