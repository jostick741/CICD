// login.js
export function initLogin() {
    // Asegúrate de que el DOM esté cargado si lo usas fuera de un módulo
    const form = document.getElementById('loginForm');
    const message = document.getElementById('message');

    if (!form) return; // Salir si no estamos en un entorno con el DOM completo

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener valores (sin .trim() para que la Prueba de Vulnerabilidad falle!)
        const usuario = document.getElementById('username').value; 
        const clave = document.getElementById('password').value;

        const usuarioCorrecto = "admin";
        const claveCorrecta = "1234";

        if (usuario === usuarioCorrecto && clave === claveCorrecta) {
            message.textContent = "Inicio de sesión exitoso.";
            message.style.color = "green";
        } else {
            message.textContent = "Usuario o contraseña incorrectos.";
            message.style.color = "red";
        }
    });
}

// Ejecutar la función si el DOM ya está cargado (necesario en el navegador)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogin);
} else {
    initLogin();
}