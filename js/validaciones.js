
let tipo = document.getElementById('inputTipo');
let personas = document.getElementById('inputPersona');

 export function validarSelect(input){
    if(input.value == 0){
       input.className = 'form-control is-invalid';
       console.log(tipo.value);
       return false;
    }else{
        input.className = 'form-control is-valid';
        return true;
    }
    
}

export function campoRequerido(input){
    if(input.value == ""){
        input.className = 'form-control is-invalid';
       console.log(tipo.value);
       return false;
    }else{
        input.className = 'form-control is-valid';
        return true;
    }
}



export function validarUrl(input){
    // Crear una exprecion regular
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;  
    if (input.value.trim() != '' && patron.test(input.value.trim())) {
        input.className = "form-control is-valid";
        return true;
    }else{
        input.className = "form-control is-invalid";
        return false;
    }
}

export function validarNumeros(input){
    //Creamo exprecion regular
    let patron = /^[0-9]{1,3}$/;

    if(patron.test(input.value)){
        input.className = "form-control is-valid";
        return true;
    }else{
        input.className = "form-control is-invalid";
        return false;
    }

}

export function validarGeneral(){
    if(validarSelect(tipo) && campoRequerido(nombre) && campoRequerido(descripcion) && validarSelect(personas) && validarNumeros(cantidad) && validarUrl(url)){
        return true;
    }
    else{
        return false;
    }
}

 

