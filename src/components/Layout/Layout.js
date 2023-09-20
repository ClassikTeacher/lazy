import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import * as styles from './Layout.module.css'
import Sidemenu from '../Sidemenu/Sidemenu'
import useIsomorphicLayoutEffect from '../../hooks/use-isomorphic-layout-effect'
import Footer from '../Footer/Footer'
import SubmitToNews from '../SubmitToNews/SubmitToNews'
import { GlobalContext, defaultState, useGlobalContext } from '../../context/GlobalContext'
import Popup from '../Popup/Popup'
import { graphql } from 'gatsby'
import CookiesPopup from '../CookiesPopup/CookiesPopup'
import Cursor from '../Cursor/Cursor'
import Loader from '../Loader/Loader'

const Layout = ({children, location, ...props})=>{
    const [visibleSidemenu, setVisibleSidemenu] = useState(false)
    const [isVisibleFooter, setIsVisibleFooter] = useState(false)
    const [isMobile, setIsMobile] = useState(true);  
    const {changeLoading, isLoading} = useGlobalContext()
    function check(){
        if (typeof window !== 'undefined'){
            if(window.innerWidth > 960){
                setVisibleSidemenu(false)
            }
        }
    }
    function getLocalStorage(){

        if (typeof window !== 'undefined'){
            if(location.pathname !== '/catalogue/' && location.pathname.split('/')[1] !== 'product'){  
                sessionStorage.setItem('sort', '')
                sessionStorage.setItem('filterArtist', '')
                sessionStorage.setItem('filterMedium', '')
                sessionStorage.setItem('pageCatalogue', '')
            }
        }
    }

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== 'undefined'){
            const checkIsMobile = () => {
                setIsMobile(
                    window.matchMedia('(max-width: 767px), (max-width: 900px) and (orientation: landscape)').matches,
                );
            };

            checkIsMobile();
            window.addEventListener('resize', check);

            return () => window.removeEventListener('resize', check)
        }
    }, []);
    
    useEffect(() => {
        getLocalStorage()
        if(location.pathname === '/'){
            setIsVisibleFooter(false)
        } else {
            setIsVisibleFooter(true)
        }
        if (typeof window !== 'undefined'){
            if (document.readyState !== 'loading') {
                changeLoading(false)
            } 
        }
    }, [])
    return(
        <GlobalContext.Consumer

        >
        {({ color, changeColor, isVisiblePopup, changePopup}) =>{
         return(  
    
            <div className={styles.wrapperLayout} >
                <Header location={location} 
                visibleSidemenu={visibleSidemenu} 
                setVisibleSidemenu={setVisibleSidemenu}
                color={props.color}
                changeColor={changeColor}
                />
                <Sidemenu 
                location={location} 
                visible={visibleSidemenu}
                setVisibleSidemenu={setVisibleSidemenu}
                />
                <div className={styles.wrapperPage}>
                  {children}
                </div>
                <CookiesPopup />
                <Popup title={'ENQUIRE'}></Popup>
                <SubmitToNews isVisible={isVisibleFooter} />
                <Footer isVisible={isVisibleFooter} />
                <Cursor location={location}/>
                <Loader visible={isLoading} />
            </div>
            );
        }}
        </GlobalContext.Consumer>
    )
}
export default Layout