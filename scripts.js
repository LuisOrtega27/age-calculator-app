'use strict'

const colors = {
    red: 'hsl(0, 100%, 67%)',
    grey: 'hsl(0, 0%, 86%)',
    smokeGrey: 'hsl(0, 1%, 44%)',
    purple: 'hsl(259, 100%, 65%)'
}

let result = {}
let errors = {}

const ageForm = document.querySelector('#age-calc_form')

const inputList = document.querySelectorAll('.age-calc_input')


const changeBorderColor = (input)=>{
    
    const label = input.nextElementSibling
    const error_msg = label.nextElementSibling
    
    let limit = 0

    if(input.name === 'day' || input.name === 'month') limit = 3

    if(input.name === 'year') limit = 5

    // eliminar un tercer digito
    if(input.value.length === limit) input.value = input.value.slice(0,-1) 

    // si el campo esta vacio poner borde gris
    if(input.value.length === 0) {
      
        input.style.borderColor = colors.grey
        error_msg.style.display = 'none'

    // si el valor del campo es numero poner borde azul
    } else if(!isNaN(input.value)) {
        
        // si el valor del campo no es valido poner borde morado
        input.style.borderColor = colors.purple
        error_msg.style.display = 'none'

    } else{
        
        input.style.borderColor = colors.red

        label.style.color = colors.red
        
        error_msg.textContent = 'Must be a valid year'
        error_msg.style.display = 'block'
        error_msg.style.color = colors.red

    } 

}


const verifyDay = (input)=>{

    changeBorderColor(input)



}

const verifyMonth = (input)=>{

    changeBorderColor(input)

}


const verifyYear = (input)=>{

    // label y mensaje de error de este campo
    const label = input.nextElementSibling 
    const error_msg = label.nextElementSibling

    
    let currentDate = new Date()
    
    
    // verificar que el año sea en el pasado
    if(input.value > currentDate.getFullYear()){
        
        input.style.borderColor = colors.red
        label.style.color = colors.red
        
        error_msg.textContent = 'Must be in the past'
        error_msg.style.display = 'block'
        error_msg.style.color = colors.red
        
    } else{
        
        label.style.color = colors.smokeGrey
        input.style.borderColor = colors.smokeGrey
        
        // años calculados
        console.log(currentDate.getFullYear() - input.value)

    }
    
    
    
    // control de los bordes
    changeBorderColor(input)
}




const verifyDate = (input)=>{

    if(input.name === 'day') verifyDay(input)
    
    if(input.name === 'month') verifyMonth(input)

    if(input.name === 'year') verifyYear(input)

}


inputList.forEach( input => input.addEventListener('input', ()=> verifyDate(input) ) )


ageForm.addEventListener( 'submit', event => event.preventDefault() )