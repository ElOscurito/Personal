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

function tiempo_espera(c1, c2) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const resultado = contraseña_igual(c1, c2);
            resolve(resultado);
        }, 3000);
    });
}


const btn_seguridad_minima = document.querySelector("#btnContrasenas")
btn_seguridad_minima.addEventListener("click", (seguridad) => {
    seguridad.preventDefault()
    const contrasena = document.querySelector("#contrasena1").value
    const resultado = seguridad_minima_contraseña(contrasena)
    console.log(resultado);
});


btn_seguridad_minima.addEventListener("click",(c_igual)=>{
    c_igual.preventDefault()
    const contrasena1 = document.querySelector("#contrasena1").value
    const contrasena2 = document.querySelector("#contrasena2").value
    tiempo_espera(contrasena1, contrasena2).then(resultado => {
    console.log(resultado);});
})

async function validar_correo_con_tiempo(correo, tiempo = 3000) {
  return new Promise((resolve) => {
    console.log("Verificando correo...");
    setTimeout(() => {
      const resultado = verificar_correo(correo);
      resolve(resultado);
    }, tiempo);
  });
}



const btn_correo = document.querySelector("#btnCorreo");
btn_correo.addEventListener("click", async (e) => {
    e.preventDefault();
    const correo = document.querySelector("#correo").value;

    console.log("Validando correo... espera 3 segundos...");
    const resultado = await validar_correo_con_tiempo(correo);
    console.log(resultado);
});

const btn_verificar_apellido = document.querySelector("#btnApellidos")
btn_verificar_apellido.addEventListener("click", () => {
  const valor = document.querySelector("#apellidos").value;

  const promesa_apellidos = new Promise((resolve, reject) => {
    setTimeout(() => {
      const resultado = verificarApellidos(valor);
      if (resultado.isValid) {
        resolve(resultado);
      } else {
        reject(resultado);
      }
    }, 2000);
  });
  promesa_apellidos
    .then((res) => {
      alert(`Bien: ${res.errorMessage}`);
      console.log("Éxito:", res);
    })
    .catch((err) => {
      alert(`Mal: ${err.errorMessage}`);
      console.error("Error:", err);
    });
});