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

    // si el campo esta vacio poner borde gris
    if( input.value.length === 0 ) {
        
        label.style.color = colors.red
        input.style.borderColor = colors.red
        
        error_msg.textContent = 'This field is required'
        error_msg.style.display = 'block'
        
        myForm.submitError[`${input.name}`] = true

        myForm.submitResult[`${input.name}`] = 0

        return
    } 
    
    // verificar si son numeros
    if( !isNaN(input.value) && input.value > 0 && input.value < maxNumber+1) {
        
        label.style.color = colors.purple
        input.style.borderColor = colors.purple
        
        error_msg.style.display = 'none'
        
        myForm.submitError[`${input.name}`] = false

        myForm.submitResult[`${input.name}`] = input.value

        
    } else {
        
        label.style.color = colors.red
        input.style.borderColor = colors.red
        
        error_msg.textContent = `Must be a valid ${input.name}`
        error_msg.style.display = 'block'

        myForm.submitError[`${input.name}`] = true

        myForm.submitResult[`${input.name}`] = 0

    } 


    if(input.name !== 'year') return

    // verificar si es en el pasado
    if( input.value > currentDate.getFullYear() ){

        label.style.color = colors.red
        input.style.borderColor = colors.red
        
        error_msg.textContent = 'Must be in the past'
        error_msg.style.display = 'block'

        myForm.submitError.year = true

        myForm.submitResult.year = 0

    }

}

    // no meth
const doSomeMath = ()=>{

    const {day, month, year} = myForm.submitResult

    if(day === 0 || month === 0 || year === 0 ) return

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