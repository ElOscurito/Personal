1. Verificar número de cédula con 10 dígitos
Función: verificar_cedula(cedula)
Esta función valida que el número de cédula ingresado tenga exactamente 10 dígitos.
Si cumple la condición, retorna un objeto con isValid: true.
Si no, retorna isValid: false con un mensaje de error.
 Ejemplo de uso:
verificar_cedula("0912345678"); 
verificar_cedula("12345");      
2. Verificar que los números sean enteros positivos
Función: verificar_entero_positivo(numero)
La función comprueba que un valor sea un entero mayor a 0.
Si es correcto, devuelve que el número es válido.
Si no, devuelve error con el código 'INVALID_INT_FORMAT'.
Ejemplo de uso:
verificar_entero_positivo(25);   
verificar_entero_positivo(-3);   
3. Verificar correo electrónico válido
Función: verificar_correo(correo)
Se utiliza una expresión regular (regex) para validar que el correo tenga el formato correcto usuario@dominio.com.
Retorna isValid: true si cumple el patrón.
Caso contrario devuelve isValid: false.

Ejemplo de uso:
verificar_correo("ejemplo@gmail.com");  
verificar_correo("correo@invalido");    
4. Verificar que la contraseña sea igual al registrarse
Función: contraseña_igual(contrasena, contrasena_repetida)
Esta función compara dos contraseñas ingresadas.
Si son iguales, devuelve isValid: true.
Si no coinciden, devuelve error con el mensaje "Las contraseñas no son iguales".
Ejemplo de uso:
contraseña_igual("MiClave123!", "MiClave123!"); 
contraseña_igual("Clave123", "clave123");       
5. Verificar que tenga 2 apellidos
Función: verificarApellidos(valor)
Valida que el usuario ingrese exactamente dos apellidos separados por un espacio, sin tildes ni caracteres especiales.
Si cumple, devuelve isValid: true.
Si no, retorna el error "Debes ingresar exactamente dos apellidos".
Ejemplo de uso:
verificarApellidos("Ponce Torres");  
verificarApellidos("Ponce");         
6. Validar seguridad mínima de contraseña
Función: seguridad_minima_contraseña(contrasena)
La contraseña debe contener al menos:
Una letra mayúscula.
Un número.
Un carácter especial.
Si cumple las condiciones, retorna isValid: true.
Caso contrario, retorna error 'INVALID_PASSWORD_FORMAT'.
Ejemplo de uso:
seguridad_minima_contraseña("Clave@2024"); 
seguridad_minima_contraseña("clave123");  
