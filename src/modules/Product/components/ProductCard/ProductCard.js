import React, { useEffect, useRef, useState } from 'react'
import * as styles from './ProductCard.module.css'
import Button from '../../../../ui/Button/Button'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Virtual } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import moment from 'moment'
import useIsomorphicLayoutEffect from '../../../../hooks/use-isomorphic-layout-effect';
import Popup from '../../../../components/Popup/Popup';
import FormEnquiry from '../../../../components/FormEnquiry/FormEnquiry';
import { useObserver, useObserverHidden } from '../../../../hooks/useObserver';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ProductCard = ({images, id, artist, name, date, height, width, length, type})=>{
    // const [isVisiblePopup, setIsVisiblePopup] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isAnimation, setIsAnimation] = useState(false)
    const {isVisiblePopup, changePopup, elem, changeElemPopup} = useGlobalContext()
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


    function checkMobile(){
        if (typeof window !== 'undefined'){
            if(window.innerWidth >= 960){
                setIsMobile(false)
            }
            if(window.innerWidth <= 960){
                setIsMobile(true)
            }
    }
    }

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined'){
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
        }
    }, []);   
    
    function clickEnquire(){
        changeElemPopup(<FormEnquiry
            setIsVisible={changePopup}
            artist={artist}
            height={height}
            width={width}
            length={length}
            type={type}
            nameProduct={name}
            image={images[0]}
        >

        </FormEnquiry>)
        changePopup(true)
    }

    useEffect(() => {
        checkMobile()
    }, [])
    const image = (img) => {return getImage(img)}
    console.log(length)
    return(
        <div ref={el} className={`${styles.wrapper}          
        ${scrollDerection === 'bottom' ? '_scrollBottom' : '_scrollTop'} 
        ${isAnimation ? styles._active : ''}`}>
            <div className={styles.imageContainer}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Virtual]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={!isMobile ? true : false}
                
                pagination={isMobile ? {clickable: true} : false}

                className={styles.imageContainerWrapper}
            >
                {images?.map((item, index) => {
                return <SwiperSlide className={styles.imageContainer__swiper} key={item} virtualIndex={index}>
                     <GatsbyImage className={styles.imageContainer__image} image={image(item)} alt={name}/>
                    {/* <img src={item} alt={artist} className={styles.imageContainer__image}/> */}
                    </SwiperSlide>
                })}
            </Swiper>

            </div>
            <div className={styles.infoContainer}>
                <div  className={styles.infoContainerTitle}>
                    <h1 className={styles.infoContainerTitle__artist}>{artist}</h1>
                    <h3 className={styles.infoContainerTitle__name}>{name}</h3>
                </div>
                <div className={styles.infoContainerDescription}>
                    <div className={styles.infoContainerDescription__item}>
                        <div className={styles.infoContainerDescription__item__name}>Size</div>
                        <div className={styles.infoContainerDescription__item__value}>{width} x {height}{length !== '' && length!==null && length !== undefined ? ` x ${length}`: ''} cm</div>
                    </div>
                    <div className={styles.infoContainerDescription__item}>
                        <div className={styles.infoContainerDescription__item__name}>Year</div>
                        <div className={styles.infoContainerDescription__item__value}>{moment(date, 'YYYY-MM-DD').year()}</div>
                    </div>
                    <div className={styles.infoContainerDescription__item}>
                        <div className={styles.infoContainerDescription__item__name}>Medium</div>
                        <div className={styles.infoContainerDescription__item__value}>{type}</div>
                    </div>
                </div>
                <Button
                    click={clickEnquire}
                >ENQUIRE</Button>
            </div>
            {/* <Popup 
                title={'ENQUIRE'}
                isVisible={isVisiblePopup}
                setIsVisible={changePopup}
                children={<FormEnquiry
                    setIsVisible={changePopup}
                    artist={artist}
                    height={height}
                    width={width}
                    type={type}
                    nameProduct={name}
                    image={images[0]}
                >

                </FormEnquiry>}
            >
                
            </Popup> */}
        </div>
    )
}
export default ProductCard