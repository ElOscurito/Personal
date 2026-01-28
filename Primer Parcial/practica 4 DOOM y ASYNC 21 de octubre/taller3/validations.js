function contraseña_igual(contrasena, contrasena_repetida){
    if (contrasena!==contrasena_repetida){
        return{
            isValid: false,
            errorMessage: "Las contraseñas no son iguales!",
        }
    }else{
        return{
            isValid: true,
            parameters: {
                value1: contrasena,
                value2: contrasena_repetida
            }
        }
    }
}

function seguridad_minima_contraseña(contrasena){
    let mayuscula=false;
    let caracter_esp=false;
    let numerica=false;
    for (const caracter of contrasena){
        if (caracter.charCodeAt(0)>64 && caracter.charCodeAt(0)<91){
            mayuscula=true;
        }else if((caracter.charCodeAt(0)>32 && caracter.charCodeAt(0)<48)||(caracter.charCodeAt(0)>57 && caracter.charCodeAt(0)<65)){
            caracter_esp=true;
        }else if (caracter.charCodeAt(0)>47 && caracter.charCodeAt(0)<58){
            numerica=true;
        }
    }
    if (mayuscula==true && caracter_esp==true && numerica==true){
        return{
            isValid: true,
            parameters: {
                value: contrasena
        }
    }
    }else {
        return{
            isValid: false,
            errorMessage: 'La contraseña no es válida.',
            errorCode: 'INVALID_PASSWORD_FORMAT',
            parameters: {
                value: contrasena
                }
        }
   }
}

// Verificar  correo electrónico  válido
function verificar_correo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    const esValido = regex.test(correo);

    if (esValido) {
        return {
            isValid: true,
            errorMessage: "El correo electrónico es válido",
            errorCode: null,
            parameters: {
                value: correo,
                regexUsed: regex.toString()
            }
        };
    } else {
        return {
            isValid: false,
            errorMessage: "El correo electrónico no es válido",
            parameters: {
                value: correo,
                regexUsed: regex.toString()
            }
        };
    }
}

//verificar que tenga 2 apellidos

function verificarApellidos(valor) {
    const regexApellido = /^[A-Za-z]+(?:-[A-Za-z]+)?$/;

    const limpio = valor.trim().replace(/\s+/g, " ");
    const partes = limpio.split(" ");

    if (partes.length !== 2) {
        return {
            isValid: false,
            errorMessage: "Debes ingresar exactamente dos apellidos sin tildes",
            errorCode: "INVALID_SURNAMES",
            parameters: { value: valor, partesDetectadas: partes }
        };
    }

    if (!regexApellido.test(partes[0])) {
        return {
            isValid: false,
            errorMessage: "El primer apellido no es válido",
            errorCode: "INVALID_SURNAMES",
            parameters: { value: valor, partesDetectadas: partes }
        };
    }

    if (!regexApellido.test(partes[1])) {
        return {
            isValid: false,
            errorMessage: "El segundo apellido no es válido",
            errorCode: "INVALID_SURNAMES",
            parameters: { value: valor, partesDetectadas: partes }
        };
    }

    
    return {
        isValid: true,
        errorMessage: "Los apellidos son válidos",
        errorCode: null,
        parameters: {
            value: valor,
            apellidosDetectados: partes
        }
    };
}

/*verificar si un numero tiene 10 digitos*/
function verificar_cedula(cedula) {
    const longitud = cedula.length;
    if (longitud === 10) {
        return {
            errorMessage: "La cédula es correcta",
            isValid: true,
            parameters: 
            {value : cedula}
        };
    } else {
        return {
            isValid: false,
            errorMessage: 'La cédula debe tener 10 dígitos',
            errorCode: 'INVALID_LENGTH',
            parameters: {
            value: numero,
            regexUsed: '/^\\d{10}$/'
            },
        };
    }
}

/*verificar si un entero positivo*/
function verificar_entero_positivo(numero) {
    if (numero > 0 && Number.isInteger(numero)) {
        console.log("el numero es un entero positivo");
        return {
            errorMessage: "el numero es un entero positivo",
            isValid: true,
            parameters: 
            {value: numero}
        };
    } else {
        return {
            isValid: false,
            errorMessage: 'El numero no es un entero positivo.',
            errorCode: 'INVALID_INT_FORMAT',
            parameters: {
            value: numero,
            regexUsed: '^\\d+$'

}
        };
    }
}