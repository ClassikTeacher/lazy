export default function phoneMask(value){
    const getInputNumbers = function (input) {
        return input.replace(/\D/g, '');
    }
    const phoneInputs = value
    const nowPhone = []
    const newPhone = []
    for(let i = 0 ; i < phoneInputs.length; i++){
        
        const numbItem = getInputNumbers(phoneInputs[i])
        if(numbItem !== ''){
        nowPhone.push(numbItem)
        } 
    }
    
    for(let i =0 ; i < nowPhone.length; i++){
        const numbItem = getInputNumbers(nowPhone[i])

        if(numbItem !== '' && i <= 11){
            if(i === 3){
                newPhone.push('-')
            }
            if(i === 6){
                newPhone.push('-')
            }
            newPhone.push(numbItem)
        } else{
            return false
        }
        
    }

    // setCheckValidPhone(true)
    const phoneNumbers = newPhone?.map(item => getInputNumbers(item)) 
    const validPhone = valid(phoneNumbers)
   
    // setValidPhone(validPhone)
    // setValue(newPhone.join(''))
    
    return {number: phoneNumbers.join(''), value: newPhone.join('')}

}

function valid(phoneNumbers){
    if((phoneNumbers.join('').length === 9 && (phoneNumbers.join('')[0] == '2' || phoneNumbers.join('')[0] == '3' || phoneNumbers.join('')[0] == '4')) 
        || (phoneNumbers.join('').length === 11 && phoneNumbers.join('')[0] == '8')){
            return true
        } else {
            return false
        }
}