import React, { useEffect, useState } from 'react'
import * as styles from './ContactForm.module.css'
import Input from '../../../../ui/input/Input'
import Button from '../../../../ui/Button/Button'
import { defaultState } from '../../../../context/GlobalContext'

const urlStrapi = defaultState.urlStrapi

const ContactForm = ()=>{
    const [name, setName] = useState('')
    const [isErrorName, setIsErrorName] = useState(false)
    const [email, setEmail] = useState('')
    const [isErrorEmail, setIsErrorEmail] = useState(false)
    const [message, setMessage] = useState('')
    const [isErrorMessage, setIsErrorMessage] = useState(false)
    const [referal, setReferal] = useState('')
    const [stateBtn, setStateBtn] = useState('')
    

    function onSubmit(){
        if(validName() && validMessage() && validEmail()){
            const messageSub = `Name: ${name}, Email: ${email}, Message: ${message}, "Referal": ${referal}`
            fetch(`${urlStrapi}/api/mailer/telegram`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: messageSub})
            }).then(() => {
                setStateBtn('submit')
            })
            .then(() => {
                setTimeout(()=> {
                    setName('')
                    setEmail('')
                    setMessage('')
                    setReferal('')
                    setStateBtn('')
                }, 1500)
            })
            console.log('submit')
        } else {
            console.log(' error submit')
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
    function validReferal(){
        if(referal.length < 2){
            setIsErrorMessage(true)
            return false
        } else {
            setIsErrorMessage(false)
            return true
        }
    }

    useEffect(() => {
        setIsErrorName(false)
    }, [name])

    useEffect(() => {
        setIsErrorEmail(false)
    }, [email])

    useEffect(() => {
        setIsErrorMessage(false)
    }, [message])


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
                        value={message}
                        changeValue={setMessage}
                        type={'text'}
                        placeholder={'Your message'}
                        label={'Your message'}
                        isError={isErrorMessage}
                        errorMessage={'Error message'}
                    />
                     <Input
                        value={referal}
                        changeValue={setReferal}
                        type={'text'}
                        placeholder={'How did you hear about us?'}
                        label={'How did you hear about us?'}
                        isError={false}
                        errorMessage={'Error field'}
                    />
                </div>
                <Button color={'black'} state={stateBtn} click={onSubmit}>SUBMIT</Button>
            </form>
        </div>
    )
}
export default ContactForm