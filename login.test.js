// login.test.js
import { initLogin } from './login.js';

// Carga el contenido de las etiquetas que se van a usar en jsdom
const HTML_CONTENT = `
    <form id="loginForm">
        <input type="text" id="username" />
        <input type="password" id="password" />
        <button type="submit">Entrar</button>
    </form>
    <p id="message"></p>
`;

describe('Prueba unitaria de formulario de login (DOM)', () => {
    beforeEach(() => {
        // Simula el contenido del HTML y reinicia la lógica antes de cada test
        document.body.innerHTML = HTML_CONTENT;
        initLogin();
    });

    test('1. Muestra éxito con credenciales correctas', () => {
        document.getElementById('username').value = 'admin';
        document.getElementById('password').value = '1234';
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));

        const msg = document.getElementById('message');
        expect(msg.textContent).toBe('Inicio de sesión exitoso.');
        expect(msg.style.color).toBe('green');
    });

    test('2. Muestra error con credenciales incorrectas', () => {
        document.getElementById('username').value = 'user';
        document.getElementById('password').value = 'wrong';
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));

        const msg = document.getElementById('message');
        expect(msg.textContent).toBe('Usuario o contraseña incorrectos.');
    });

    test('3. Muestra error si se envía vacío', () => {
        document.getElementById('username').value = ''; 
        document.getElementById('password').value = ''; 
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));

        const msg = document.getElementById('message');
        // Verifica que la falla se propaga al mensaje de error
        expect(msg.textContent).toBe('Usuario o contraseña incorrectos.');
    });

    test('4. Falla con espacios en blanco (Vulnerabilidad)', () => {
        // La prueba falla (muestra error) porque la lógica NO usa .trim(), lo cual es correcto
        // para demostrar que la prueba atrapa una vulnerabilidad real.
        document.getElementById('username').value = ' admin '; 
        document.getElementById('password').value = ' 1234 '; 
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));

        const msg = document.getElementById('message');
        expect(msg.textContent).toBe('Usuario o contraseña incorrectos.'); 
    });
});