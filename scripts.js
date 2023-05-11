'use strict'

const colors = {
    red: 'hsl(0, 100%, 67%)',
    grey: 'hsl(0, 1%, 44%)',
    purple: 'hsl(259, 100%, 65%)'
}

const myForm = {
    submitError: { day: false, month: false, year: false },
    submitResult: { day: 0 , month: 0 , year: 0 }
}

const ageForm = document.querySelector('#age-calc_form')
const inputList = document.querySelectorAll('.age-calc_input')
const hyphens = document.querySelectorAll(`.hyphens`)


const verifyDate = (input)=>{
    
    // label y mensaje de error de este campo
    const inputGroup = input.parentElement
    const label = input.nextElementSibling 
    const error_msg = label.nextElementSibling
    
    let lengthLimit = input.name==='year' ? 5 : 3

    let maxNumber = 0
    if(input.name === 'day') maxNumber = 31
    if(input.name === 'month') maxNumber = 12
    if(input.name === 'year') maxNumber = 9999

    let currentDate = new Date()

    // limitar el numero de digitos (4 para los a;os)
    if( input.value.length === lengthLimit ) input.value = input.value.slice(0,-1) 

    // si el campo esta vacio poner borde rojo
    if( input.value.length === 0 ) {
        
        inputGroup.classList.add('validation-error')
        inputGroup.classList.remove('validation-ok')

        error_msg.textContent = 'This field is required'
        
        myForm.submitError[`${input.name}`] = true

        myForm.submitResult[`${input.name}`] = 0

        return
    } 
    
    // verificar si son numeros
    if( !isNaN(input.value) && input.value > 0 && input.value < maxNumber+1) {
        

        inputGroup.classList.add('validation-ok')
        inputGroup.classList.remove('validation-error')
        
        
        myForm.submitError[`${input.name}`] = false

        myForm.submitResult[`${input.name}`] = input.value

        
    } else {
        
        inputGroup.classList.add('validation-error')
        inputGroup.classList.remove('validation-ok')

        error_msg.textContent = `Must be a valid ${input.name}`

        myForm.submitError[`${input.name}`] = true

        myForm.submitResult[`${input.name}`] = 0

    } 


    if(input.name !== 'year') return

    // verificar si el año es en el pasado
    if( input.value > currentDate.getFullYear() ){

        inputGroup.classList.add('validation-error')
        inputGroup.classList.remove('validation-ok')
        
        error_msg.textContent = 'Must be in the past'

        myForm.submitError.year = true

        myForm.submitResult.year = 0

    }

}

    // no meth
const doSomeMath = ()=>{

    const {day, month, year} = myForm.submitResult

    if(day === 0 || month === 0 || year === 0 ){

        day === 0 &&
            document.querySelector(`input[name=day]`).parentElement.classList.add('validation-error')
        
        month === 0 &&
            document.querySelector(`input[name=month]`).parentElement.classList.add('validation-error')
        
        year === 0 &&
            document.querySelector(`input[name=year]`).parentElement.classList.add('validation-error')

        return
    } 

    if(year < 1974 ){
        let input = document.querySelector(`input[name=year]`)
        input.parentElement.classList.add('validation-error')
        let error_msg= input.nextElementSibling.nextElementSibling
        error_msg.textContent= 'Year must be after1974'
        return 
    } 

    console.log({day, month, year})

    const tDate = `${year}-${month}-${day}`;
    const date = new Date(tDate);
    
    const miliseconds = date.getTime() / 1000;
    const seconds = miliseconds
    const minutes = seconds / 60
    const hours = minutes / 60
    
    const days = (hours / 24) - (365*3)

    const weeks = Math.floor(days / 7)
    const months = Math.floor(weeks / 4)
    const years = Math.floor(months / 12)

    hyphens[0].textContent = years
    hyphens[1].textContent = months
    hyphens[2].textContent = days

}


inputList.forEach( input => input.addEventListener('input', ()=> verifyDate(input) ) )
ageForm.addEventListener( 'submit', event => {
    event.preventDefault() 
    doSomeMath()
})