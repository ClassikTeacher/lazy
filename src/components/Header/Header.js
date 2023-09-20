import React, { useContext } from 'react'
import { Link, navigate } from "gatsby"
import * as styles from './Header.module.css'
import logo_white from '../../images/logo_white.svg'
import logo_green from '../../images/logo_green.svg'
import logo_black from '../../images/logo_black.svg'
import { GlobalContextProvider, useGlobalContext } from '../../context/GlobalContext'

const Header = ({location, visibleSidemenu, setVisibleSidemenu, color, changeColor})=>{
    const menuList = [{text:'artists', link: '/artists/'}, {text:'catalogue', link: '/catalogue/'}, {text:'exhibitions', link: '/exhibitions/'},
     {text:'fairs', link: '/fairs/'}, {text: 'news', link: '/news/'}, {text:'about', link: '/about/'}, {text:'contact', link: '/contact/'}]
    
    
     return(
            <div className={`${styles.wrapper} ${visibleSidemenu ? styles.fixed : ''}`}>
                
             <div className={styles.headerLogo}>
                <Link onClick={()=>setVisibleSidemenu(false)} to='/'>
                    {visibleSidemenu
                        ?<img src={logo_white} alt='logo' />
                        :<img src={location.pathname !== '/' ? logo_black : color === 'black' ? logo_black : color === 'white' ? logo_white : logo_green} alt='logo' />
                    }
                    
                </Link>
                
            </div>   
            <div className={`${styles.burgetMenu} js-custom-hoverable`} onClick={()=>setVisibleSidemenu(!visibleSidemenu)} >
                {visibleSidemenu
                    ? <div className={`${styles.closeBtn} ${styles.white} js-custom-hoverable`}></div>
                    : <MenuIcon fill='none' stroke={location.pathname !== '/' ? '#070707' : color === 'black' ? '#070707' :  color === 'white' ? '#ffffff' :'#1EF868'}  />
                }
            </div>
            <div className={styles.headerNavigation}>
                 
                    {menuList?.map(item =>
                        <Link key={item.link} className={`${styles.headerItem} ${location.pathname !== '/' ? '' : color === 'black' ?  '' : color === 'white' ?  styles.white :  styles.green} 
                        ${location.pathname === item.link ? styles.active__green : ''}`} to={item.link}>
                            {item.text}
                        </Link>
                    )}
                
            </div>
            </div>
        
    )
}
export default Header

const MenuIcon = (props) =>(
    <svg className={props.style} width="32" height="23" viewBox="0 0 32 23" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
<line y1="1.50684" x2="32" y2="1.50684" stroke={props.stroke} stroke-width="2"/>
<line y1="11.5068" x2="32" y2="11.5068" stroke={props.stroke} stroke-width="2"/>
<line y1="21.5068" x2="32" y2="21.5068" stroke={props.stroke} stroke-width="2"/>
</svg>
)