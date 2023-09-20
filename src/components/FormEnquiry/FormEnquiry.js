import React, { useEffect, useState } from 'react'
import * as styles from './FormEnquiry.module.css'
import Input from '../../ui/input/Input'
import Button from '../../ui/Button/Button'
import SelectCodeCountry from './SelectCodeCountry'
import validationPhone from '../../utils/validPhone'
import { defaultState, useGlobalContext } from '../../context/GlobalContext'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const urlStrapi = defaultState.urlStrapi

const FormEnquiry = ({setIsVisible, image, height, width, length, artist, nameProduct, type})=>{
    const [name, setName] = useState('')
    const [isErrorName, setIsErrorName] = useState(false)
    const [email, setEmail] = useState('')
    const [isErrorEmail, setIsErrorEmail] = useState(false)
    const [message, setMessage] = useState('')
    const [isErrorMessage, setIsErrorMessage] = useState(false)
    const [phone, setPhone] = useState('')
    const [phoneNumb, setPhoneNumb] = useState('')
    const [isErrorPhone, setIsErrorPhone] = useState(false)
    const [stateBtn, setStateBtn] = useState('')
    
    const {isVisiblePopup,changePopup} = useGlobalContext()



    function onSubmit(){
        validName()
        validEmail()
        validPhone()
        if(validName()  && validEmail() && validPhone()){
            const messageSub = `Name: ${name}, Email: ${email}, Phone: ${phone}, Message: ${message ? `${message},` : ''} Artist: ${artist}, Name product: ${nameProduct}, Type product: ${type}`
            fetch(`${urlStrapi}/api/mailer/telegram`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: messageSub})
            }).then(() => {
                setStateBtn('submit')
                changePopup()
            })
            .then(() => {
                setTimeout(()=> {
                    setName('')
                    setEmail('')
                    setMessage('')
                    setPhone('')
                    setStateBtn('')
                }, 1000)
            })

        } else {
            setStateBtn('')
        }
    }

    function validEmail(){
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(pattern.test(email)){
            return true
        } else {
            setIsErrorEmail(true)
            return false
        }
    }

    function validPhone(){
        const valid = phoneNumb.match(/\d/g)
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(valid?.length >= 9 && valid?.length <= 14){
            return true
        } else {
            setIsErrorPhone(true)
            return false
        }
    }

    function validName(){
        if(name.length < 2){
            setIsErrorName(true)
            return false
        } else {
            setIsErrorName(false)
            return true
        }
    }
    function validMessage(){
        if(message.length < 2){
            setIsErrorMessage(true)
            return false
        } else {
            setIsErrorMessage(false)
            return true
        }
    }

    function changePhone(e){
        const numb = e.match(/\d/g)
        if(numb !== null && numb !== undefined){
        setPhoneNumb(numb?.join(''))
        setPhone('+' + numb?.join(''))
        } else {
            setPhoneNumb('')
            setPhone('')
        }        
    }

    useEffect(() => {
        setIsErrorName(false)
    }, [name])

    useEffect(() => {
        setIsErrorEmail(false)
    }, [email])

    useEffect(() => {
        setIsErrorPhone(false)
    }, [phone])

    const img = getImage(image)
    return(
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <div className={styles.inputBlock}>
                    <Input
                        value={name}
                        changeValue={setName}
                        type={'text'}
                        placeholder={'Your name'}
                        label={'Your name'}
                        isError={isErrorName}
                        autoComplete={'name'}
                        errorMessage={'Error name'}
                    />
                     <Input
                        value={email}
                        changeValue={setEmail}
                        type={'email'}
                        placeholder={'Your email'}
                        label={'Your email'}
                        autoComplete={'email'}
                        isError={isErrorEmail}
                        errorMessage={'Error email'}
                    />
                    <Input
                        value={phone}
                        changeValue={changePhone}
                        type={'tel'}
                        placeholder={'Enter your phone'}
                        label={'phone'}
                        autoComplete={'phone'}
                        isError={isErrorPhone}
                        errorMessage={'Error field'}
                    />
                     <Input
                        value={message}
                        changeValue={setMessage}
                        type={'text'}
                        placeholder={'Your message'}
                        label={'Your message'}
                        isError={isErrorMessage}
                        errorMessage={'Error message'}
                    />
                </div>
                <div className={styles.messageMailing}>
                    *By submitting this form, you agree to become part of our mailing list.
                    </div>
                <div className={styles.productBlock}>
                    <GatsbyImage className={styles.productBlock__image} image={img} alt={'img'}/>
                    {/* <img src={image} alt='' className={styles.productBlock__image} /> */}
                    <div className={styles.productBlockText}>
                        <div className={styles.productBlockText__normal}>
                            {artist}
                        </div>
                        <div className={styles.productBlockText__italic}>
                            {nameProduct}
                        </div>
                        <div className={styles.productBlockText__normal}>
                            {type}<br/>
                            {height} x {width}{length !== '' && length && length !== undefined ? ` x ${length}`: ''} cm
                        </div>
                    </div>
                </div>
                <Button classes={styles.productBlockBtn} color={'black'} state={stateBtn} click={onSubmit}>SUBMIT</Button>
            </form>
        </div>
    )
}
export default FormEnquiry