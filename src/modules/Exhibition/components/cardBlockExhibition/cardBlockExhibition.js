import React, { useRef, useState } from 'react'
import * as styles from './cardBlockExhibition.module.css'
import Button from '../../../../ui/Button/Button'
import FormEnquiry from '../../../../components/FormEnquiry/FormEnquiry'
import Popup from '../../../../components/Popup/Popup'
import moment from 'moment'
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect'
import { useGlobalContext } from '../../../../context/GlobalContext'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const CardBlockExhibition = ({card_1, card_2})=>{
    // const [isVisiblePopup, setIsVisiblePopup] = useState(false)
    const [popupData, setPopupData] = useState({})
    const [isAnimation, setIsAnimation] = useState(false)
    const el=useRef()
    const {isVisiblePopup, changePopup, elem, changeElemPopup} = useGlobalContext()

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

    function click(dataCard){
        const newData = {
            artist: dataCard.artist ? dataCard.artist: dataCard.artist_other ,
            height:dataCard.height,
            width:dataCard.width,
            length:dataCard.length,
            type:dataCard.type,
            name:dataCard.name,
            image:dataCard.image,
        }
        setPopupData(newData)
        changePopup(true)
        changeElemPopup(<FormEnquiry
            // setIsVisible={changePopup}
            artist={dataCard.artist ? dataCard.artist: dataCard.artist_other}
            height={dataCard.height}
            width={dataCard.width}
            length={dataCard.length}
            type={dataCard.type}
            nameProduct={dataCard.name}
            image={dataCard.image}
        />)

    }
    const image = (img) => {return getImage(img)}

    return(
        <div ref={el} className={`${styles.container}
        ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            <div className={styles.card}>
            <GatsbyImage className={styles.card__img} image={image(card_1.image)} alt={card_1.artist ? card_1.artist: card_1.artist_other}/>
                {/* <img src={card_1.image} alt={card_1.artist} className={styles.card__img}/> */}
                <div className={styles.cardInfo}>
                    <h2 className={styles.card__artist}>
                    {card_1.artist ? card_1.artist: card_1.artist_other}
                    </h2>
                    <div className={styles.card__name}>
                        {card_1.name}, {moment(card_1.date, 'YYYY-MM-DD').year()}
                    </div>
                    <div className={styles.card__name}>
                        {card_1.type}
                    </div>
                    <div className={styles.card__size}>
                        {card_1.height} x {card_1.width}{card_1.length !== '' && card_1.length && card_1.ength !== undefined ? ` x ${card_1.length}`: ''} cm
                    </div>
                    <Button
                        color={'white'}
                        click={()=>click(card_1)}
                    >
                        Enquire
                    </Button>                               
                </div>
            </div>
            <div className={styles.card}>
            <GatsbyImage className={styles.card__img} image={image(card_2.image)} alt={card_2.artist ? card_2.artist: card_2.artist_other}/>
                {/* <img src={card_2.image} alt={card_2.artist} className={styles.card__img}/> */}
                <div className={styles.cardInfo}>
                    <h2 className={styles.card__artist}>
                        {card_2.artist ? card_2.artist: card_2.artist_other}
                    </h2>
                    <div className={styles.card__name}>
                        {card_2.name}, {moment(card_2.date, 'YYYY-MM-DD').year()}
                    </div>
                    <div className={styles.card__name}>
                        {card_2.type}
                    </div>
                    <div className={styles.card__size}>
                        {card_2.height} x {card_2.width}{card_2.length !== '' && card_2.length && card_2.ength !== undefined ? ` x ${card_2.length}`: ''} cm
                    </div>
                    <Button
                        color={'white'}
                        click={()=>click(card_2)}
                    >
                        Enquire
                    </Button>
                </div>
            </div>
            {/* <Popup 
                title={'ENQUIRE'}
                isVisible={isVisiblePopup}
                setIsVisible={setIsVisiblePopup}
                children={  <FormEnquiry
                    setIsVisible={setIsVisiblePopup}
                    artist={popupData.artist}
                    height={popupData.height}
                    width={popupData.width}
                    type={popupData.type}
                    nameProduct={popupData.name}
                    image={popupData.image}
                />}
            >
          
            </Popup> */}
        </div>
    )
}
export default CardBlockExhibition