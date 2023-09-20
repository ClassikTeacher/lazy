import React from 'react'
import * as styles from './iconBlock.module.css'

const IconBlock = ({center})=>{
    return(
        <div className={`${styles.iconBlock} ${center ? styles.center : ''}`}>
            <div className={styles.iconBlock__item}>
                <a href='https://instagram.com/lazymike.art?igshid=OGQ5ZDc2ODk2ZA==' target='_blank'>
                    <InstagramIcon stroke='white'/>   
                </a>
               
            </div>
            {/* <div className={styles.iconBlock__item}>
                <a href='https://facebook.com/' target='_blank'>
                    <FacebookIcon stroke='white'/> 
                </a>
            </div> */}
        </div>
    )
}
export default IconBlock

const InstagramIcon = (props) =>(
<svg width="27" height="27" viewBox="0 0 27 27" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
<rect x="0.8" y="0.8" width="25.4" height="25.4" rx="6.2" stroke={props.stroke} stroke-width="1.6"/>
<circle cx="13.5" cy="13.5" r="5.7" stroke={props.stroke} stroke-width="1.6"/>
<circle cx="20.5" cy="6.5" r="1.5" stroke={props.stroke} stroke-width="1.3"/>
</svg>
)

const FacebookIcon = (props) =>(
<svg width="21" height="37" viewBox="0 0 21 37" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M6.35897 35V22.4167C6.35897 21.8644 5.91126 21.4167 5.35898 21.4167H2C1.44772 21.4167 1 20.969 1 20.4167V15.125C1 14.5727 1.44771 14.125 2 14.125H5.35897C5.91126 14.125 6.35897 13.6773 6.35897 13.125V10C6.35897 5.02944 10.3884 1 15.359 1H19C19.5523 1 20 1.44771 20 2V7.29167C20 7.84395 19.5523 8.29167 19 8.29167H16.1538C15.0493 8.29167 14.1538 9.1871 14.1538 10.2917V13.125C14.1538 13.6773 14.6016 14.125 15.1538 14.125H19C19.5523 14.125 20 14.5727 20 15.125V20.4167C20 20.969 19.5523 21.4167 19 21.4167H15.1538C14.6016 21.4167 14.1538 21.8644 14.1538 22.4167V35C14.1538 35.5523 13.7061 36 13.1538 36H7.35897C6.80669 36 6.35897 35.5523 6.35897 35Z" 
    stroke={props.stroke} stroke-width="1.6"/>
</svg>
)