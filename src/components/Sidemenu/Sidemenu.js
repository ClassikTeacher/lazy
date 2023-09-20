import React, { useEffect } from 'react'
import { Link} from "gatsby"
import * as styles from './Sidemenu.module.css'
import IconBlock from '../../ui/iconBlock/IconBlock'
import logo_white from '../../images/logo_white.svg'

const Sidemenu = (props)=>{
    const menuList = [{text:'artists', link: '/artists/'}, {text:'catalogue', link: '/catalogue/'}, {text:'exhibitions', link: '/exhibitions/'},
    {text:'fairs', link: '/fairs/'}, {text: 'news', link: '/news/'}, {text:'about', link: '/about/'}, {text:'contact', link: '/contact/'}]

    useEffect(() => {
        if (props.visible) {
          document.body.style.overflow = 'hidden'
        } else {
       
            document.body.style.overflow = ''
        }
      }, [props.visible])

    return(
        <div className={`${styles.wrapper} ${props.visible ? styles.visible : ''}`}>
            <div className={styles.headerSidemenu}>
            <div className={styles.headerLogo}>
                <Link onClick={()=>props.setVisibleSidemenu(false)} to='/'>
                        <img src={logo_white} alt='logo' />
                    
                </Link>
                
            </div>   
            <div className={`${styles.burgetMenu} js-custom-hoverable`} onClick={()=>props.setVisibleSidemenu(false)} >
                    <div className={`${styles.closeBtn} ${styles.white} js-custom-hoverable`}></div>
            </div>
            </div>
            <div className={styles.navMenu}>
            {menuList?.map(item =>
                <Link
                key={item.link} 
                className={`${styles.menuItemWhite} ${props.location.pathname !== item.link ? '' : styles.active_green}`}
                to={item.link}
                // onClick={()=> props.setVisibleSidemenu(false)}
                >
                    {item.text}
                </Link>
            )}
            </div>
            <IconBlock />
        </div>
    )
}
export default Sidemenu