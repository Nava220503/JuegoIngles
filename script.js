// 1. TRAEMOS LOS ELEMENTOS DEL HTML A JAVASCRIPT
// Imagina que estamos creando "cables" para controlar la pantalla
const tituloPregunta = document.getElementById("instruccion");
const cajitaTexto = document.getElementById("respuesta_usuario");
const boton = document.getElementById("btn_comprobar");
const textoMensaje = document.getElementById("mensaje");
const palabraEnPantalla = document.getElementById("palabra_oculta");
const textoContador = document.getElementById("contador");

// 2. NUESTRA BASE DE DATOS DE EJERCICIOS
// Aquí guardamos las preguntas. Vamos a usar la palabra secreta: APPLE
const ejercicios = [
    { pregunta: "¿Cuál es el pasado del verbo 'Go'?", respuestaCorrecta: "went", letraPremio: "A" },
    { pregunta: "Traduce al inglés: 'Gato'", respuestaCorrecta: "cat", letraPremio: "P" },
    { pregunta: "¿Qué color es 'Red' en español?", respuestaCorrecta: "rojo", letraPremio: "P" },
    { pregunta: "Escribe el número 10 en inglés", respuestaCorrecta: "ten", letraPremio: "L" },
    { pregunta: "El opuesto de 'Hot' (Caliente) en inglés es...", respuestaCorrecta: "cold", letraPremio: "E" }
];

// 3. VARIABLES DE CONTROL (Para saber en dónde vamos)
let nivelActual = 0; // Empezamos en el nivel 0 (que es la primera pregunta en programación)
let palabraArmada = ["_", "_", "_", "_", "_"]; // Los 5 espacios vacíos

// 4. FUNCIÓN PARA DIBUJAR EL EJERCICIO EN PANTALLA
function mostrarNivel() {
    // Ponemos la pregunta actual en el HTML
    tituloPregunta.textContent = ejercicios[nivelActual].pregunta;
    
    // Actualizamos el contador (le sumamos 1 porque empezamos en 0)
    textoContador.textContent = "Ejercicio " + (nivelActual + 1) + " de " + ejercicios.length;
    
    // Mostramos los guiones separados por un espacio
    palabraEnPantalla.textContent = palabraArmada.join(" ");
}

// ¡Arrancamos el motor! Llamamos a la función para que se muestre todo al abrir la página
mostrarNivel();

boton.addEventListener('click', function() {
    
    // Capturamos el texto, lo pasamos a minúsculas y le quitamos espacios extra con trim()
    let respuestaAlumno = cajitaTexto.value.toLowerCase().trim();
    let respuestaEsperada = ejercicios[nivelActual].respuestaCorrecta.toLowerCase();

    // LA VALIDACIÓN
    if (respuestaAlumno === respuestaEsperada) {
        
        // a) Guardamos la letra ganada en nuestro arreglo
        palabraArmada[nivelActual] = ejercicios[nivelActual].letraPremio;
        
        // b) Mostramos mensaje de éxito (y lo ponemos en verde pa que resalte)
        textoMensaje.textContent = "¡Muy bien! Ganaste la letra: " + ejercicios[nivelActual].letraPremio;
        textoMensaje.style.color = "green";
        
        // c) Subimos de nivel y limpiamos la caja de texto
        nivelActual++;
        cajitaTexto.value = "";
        
        // d) ¿Ya se acabó el juego o seguimos?
        if (nivelActual < ejercicios.length) {
            // Si todavía hay ejercicios, mostramos el siguiente
            mostrarNivel();
        } else {
            // Si ya acabamos, mostramos la victoria
            palabraEnPantalla.textContent = palabraArmada.join(" ");
            tituloPregunta.textContent = "¡Felicidades! Descubrieron la palabra secreta.";
            
            // Escondemos la caja y el botón porque ya no se ocupan
            cajitaTexto.style.display = "none";
            boton.style.display = "none";
            textoContador.textContent = "¡Misión cumplida!";
        }

    } else {
        // Mensaje de error (en rojito)
        textoMensaje.textContent = "¡Ups! Intenta de nuevo.";
        textoMensaje.style.color = "red";
    }
});