import React from 'react'
import * as styles from './Title.module.css'
import { Link, navigate } from 'gatsby'

const Title = (props)=>{
    const click = ()=>{
        navigate(`/${props.type_event}/${props.id}`)
    }
    return(
        <div className={`${styles.wpapperTitle} ${props.theme === 'green' ? styles.green : props.theme === 'white' ? styles.white : ''}`}
            // onClick={click}
        >
            <Link to={`/${props.type_event}/${props.id}`} className='linkTitle'> 
            <div className={styles.date}>
                {props.date}
            </div>
            <div className={styles.title} dangerouslySetInnerHTML={{__html: props.title}}>

            </div>
            </Link> 
            {/* <Link to={`/${props.type_event}/${props.id}`}> */}
            <button className={`${styles.btn} ${props.theme === 'green' ? styles.green : props.theme === 'white' ? styles.white : ''}`} 
                        onClick={click}
            >
                {`see ${props.type_event}`}
            </button>
            {/* </Link> */}
        </div>
    )
}
export default Title