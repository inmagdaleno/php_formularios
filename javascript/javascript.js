// Esto es un evento que se ejecuta cuando el documento ha terminado de cargarse
// y el DOM está completamente construido.
// Se utiliza para asegurarse de que el código dentro de esta función
// se ejecute solo después de que el DOM esté listo para ser manipulado.
// Se suele colocar por defecto


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    const mensajeError = document.getElementById('mensajeError');
    const mensajeEnviado = document.getElementById('mensajeEnviado');
    const mostrarP = document.getElementById('mostrarContraseña');
    const imgOjo = document.getElementById('imgOjo');

    // Crear un evento para el submit del formulario
    form.addEventListener('submit', (event) => {
        let errores = [];

        // vamos a hacer un array con un listado de errores para luego mostrárselo al usuario.
        
        // Validar el NOMBRE
        const inputName = document.getElementById('inputName');

        // comprobar si ese campo tiene contenido
        if(inputName.value.trim() === '') {
            errores.push('El nombre es obligatorio');
        }else if (inputName.value.trim().length < 3) {
            errores.push('El nombre debe tener al menos 3 caracteres');
        }
        
        // Validar DIRECCIÓN
        const inputAdress = document.getElementById('inputAdress');
        // comprobar si ese campo tiene contenido
        if(inputAdress.value.trim() === '') {
            errores.push('La dirección es obligatoria');
        }

        // Validar EMAIL
        const inputEmail = document.getElementById('inputEmail');
        // comprobar si ese campo tiene contenido
        if(inputEmail.value.trim() === '') {
            errores.push('El correo electrónico es obligatorio');
        } 

        // Validar el formato del email
        // Expresión regular para validar el formato del correo electrónico (se ha buscado en claudia)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(inputEmail.value.trim())) {
            errores.push('El correo electrónico no es válido');
        }

        // Validar CONTRASEÑA
        const inputPassword = document.getElementById('inputPassword');
        if(inputPassword.value.trim() < 8 || inputPassword.value.trim() > 12) {
            errores.push('La contraseña debe tener entre 8 y 12 caracteres');
        }

        if(!/\d/.test(inputPassword.value)) {
            errores.push('La contraseña debe contener al menos un número');
        }

        // Validar la Antigüedad
        const antiguedad = document.getElementById('antiguedad');
        // comprobar si ese campo tiene contenido
        if(antiguedad.value.trim() === '') {
            errores.push('La antigüedad es obligatoria');
        }

        // Validar politica de privacidad
        const politica = document.getElementById('politicasPrivacidad');
        if(!politica.checked) {
            errores.push('Debes aceptar la política de privacidad');
        }

        // Si hay errores mostrarlos y parar el envío del formulario
        if(errores.length > 0) {
            // Detiene el submit (parar el envío del formulario)
            event.preventDefault(); // Evitar el envío del formulario
            mensajeError.innerHTML = mostrarErrores(errores); // Unir los errores en un string
            mensajeError.classList.remove('d-none'); 
        } else {
            // Si no hay errores, enviar el formulario
            mensajeError.classList.add('d-none'); // Ocultar el mensaje de error
        }

        // Si no hay errores, mostrar el mensaje de éxito
        if(errores.length === 0) {
            mensajeEnviado.classList.remove('d-none'); // Mostrar el mensaje de éxito
            setTimeout(() => {
                mensajeEnviado.classList.add('d-none'); // Ocultar el mensaje de éxito después de 3 segundos
            }, 3000);
        }
        
    })
    // Mostrar/ocultar la contraseña
    mostrarP.addEventListener('click', () => {
        if(document.getElementById('inputPassword').type === 'password') {
            document.getElementById('inputPassword').type = 'text'
            imgOjo.src = 'img/ojo-cerrado.svg'
        }else{
            document.getElementById('inputPassword').type = 'password'
            imgOjo.src = 'img/ojo.svg'
        }
      
    })

}) 

// Crear una lista de errores para el formulario 
function mostrarErrores(errores) {
    listaErrores ='<ul>';
    listaErrores += errores.map(error => 
       `<li>${error}</li>`
    ).join('');
    listaErrores += '</ul>';
    return listaErrores;
}
           