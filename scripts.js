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

const verifyDay = (label, input, error_msg)=>{

    // limitar el numero de digitos (4 para los a;os)
    if( input.value.length === 3 ) input.value = input.value.slice(0,-1) 


    // si el campo esta vacio poner borde gris
    if( input.value.length === 0 ) {
        
        label.style.color = colors.red
        input.style.borderColor = colors.red
        
        error_msg.textContent = 'This field is required'
        error_msg.style.display = 'block'
        
        myForm.submitError.month = true

        return
    } 
    
    // verificar si son numeros
    if( !isNaN(input.value) && input.value > 0 && input.value < 32 ) {
        
        label.style.color = colors.purple
        input.style.borderColor = colors.purple
        
        error_msg.style.display = 'none'
        
        myForm.submitError.month = false
        
    } else {
        
        label.style.color = colors.red
        input.style.borderColor = colors.red
        
        error_msg.textContent = 'Must be a valid mont'
        error_msg.style.display = 'block'

        myForm.submitError.month = true

    } 

    myForm.submitResult.day = input.value
    
}

const verifyMonth = (label, input, error_msg)=>{
    
    // limitar el numero de digitos (4 para los a;os)
    if( input.value.length === 3 ) input.value = input.value.slice(0,-1) 


    // si el campo esta vacio poner borde gris
    if( input.value.length === 0 ) {
        
        label.style.color = colors.red
        input.style.borderColor = colors.red
        
        error_msg.textContent = 'This field is required'
        error_msg.style.display = 'block'
        
        myForm.submitError.month = true

        myForm.submitResult.month = 0

        return
    } 
    
    // verificar si son numeros
    if( !isNaN(input.value) && input.value > 0 && input.value < 13 ) {
        
        label.style.color = colors.purple
        input.style.borderColor = colors.purple
        
        error_msg.style.display = 'none'
        
        myForm.submitError.month = false
        myForm.submitResult.month = input.value
        
    } else {
        
        label.style.color = colors.red
        input.style.borderColor = colors.red
        
        error_msg.textContent = 'Must be a valid mont'
        error_msg.style.display = 'block'

        myForm.submitError.month = true
        myForm.submitResult.month = 0

    } 

    myForm.submitResult.mont = input.value

}

const verifyYear = (label, input, error_msg)=>{

    let currentDate = new Date()


    // limitar el numero de digitos (4 para los a;os)
    if( input.value.length === 5 ) input.value = input.value.slice(0,-1) 


    // si el campo esta vacio poner borde gris
    if( input.value.length === 0 ) {
        
        label.style.color = colors.red
        input.style.borderColor = colors.red
        
        error_msg.textContent = 'This field is required'
        error_msg.style.display = 'block'
        
        myForm.submitError.year = true

        myForm.submitResult.year = 0

        return
    } 
    
    // verificar si son numeros
    if( !isNaN(input.value) ) {
        
        label.style.color = colors.purple
        input.style.borderColor = colors.purple
        
        error_msg.style.display = 'none'
        
        myForm.submitError.year = false

        myForm.submitResult.year = input.value

        
    } else {
        
        label.style.color = colors.red
        input.style.borderColor = colors.red
        
        error_msg.textContent = 'Must be a valid year'
        error_msg.style.display = 'block'

        myForm.submitError.year = true

        myForm.submitResult.year = 0


    } 
    
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

const verifyDate = (input)=>{
    
    // label y mensaje de error de este campo
    const label = input.nextElementSibling 
    const error_msg = label.nextElementSibling

    if(input.name === 'day') verifyDay(label, input, error_msg)
    
    if(input.name === 'month') verifyMonth(label, input, error_msg)

    if(input.name === 'year') verifyYear(label, input, error_msg)

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