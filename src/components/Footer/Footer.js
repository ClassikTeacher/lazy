import React from 'react'
import * as styles from './Footer.module.css'
import IconBlock from '../../ui/iconBlock/IconBlock'
import moment from 'moment'

const Footer = ({isVisible})=>{
    return(
        <div className={`${styles.wrapper} ${isVisible ? '' : styles.hidden}`}>
            <div className={styles.wrapperDesktop}>
                <div className={styles.containerDesktop}>
                    <div className={styles.nameBlock}>
                        <div className={styles.nameBlock__name}>
                            Lazy Mike gallery
                        </div>
                    
                    </div>
                    <div  className={styles.containerBlocks}>
                        <div className={styles.socialBlock}>
                            <div className={styles.socialBlock__title}>Follow us</div>
                            <IconBlock
                                // center={true}
                            />
                        </div>
                        <div className={styles.contactBlock}>
                            <div className={styles.contactBlock__title}>
                                get in touch
                            </div>
                            <div className={styles.contactBlock_contact}>
                                <a href="tel:+79686466474">+7 (968) 646-64-74</a>
                                <a href="mailto:gallery@lazymike.art" target='_blank'>gallery@lazymike.art</a>
                            </div>
                        </div>    
                    </div>
                </div>
                <div className={styles.nameBlock__politic}>
                        <a href="#" target='_blank'>Privacy Policy</a>
                        <span>{moment().year()} Red Panda ArtWorks Trading</span>                    
                </div>
            </div>
            <div className={styles.wrapperMobile}>
                <div className={styles.nameBlock}>
                    <div className={styles.nameBlock__name}>
                        Lazy Mike
                    </div>
                </div>
                <div className={styles.contactBlock}>
                    <div className={styles.contactBlock__title}>
                        get in touch
                    </div>
                    <div className={styles.contactBlock_contact}>
                        <a href="tel:+79686466474">+7 (968) 646-64-74</a>
                        <a href="mailto:gallery@lazymike.art" target='_blank'>gallery@lazymike.art</a>
                    </div>
                </div>    
                <div className={styles.socialBlock}>
                    <div className={styles.socialBlock__title}>Follow us</div>
                    <div className={styles.socialBlock__icons}>
                        <IconBlock />
                    </div>                     
                </div>
                <div className={styles.nameBlock__politic}>
                    <a href="#" target='_blank'>Privacy Policy</a>
                    <span>{moment().year()} Red Panda ArtWorks Trading</span>                    
                 </div>
            </div>
            
           

        </div>
    )
}
export default Footer