const sections = document.querySelectorAll('.section');
let currentSectionIndex = 0;

function showSection(index) {
    sections.forEach((section, i) => {
        if (i === index) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

showSection(currentSectionIndex);

document.getElementById('leftArrow').addEventListener('click', () => {
    currentSectionIndex = (currentSectionIndex === 0) ? sections.length - 1 : currentSectionIndex - 1;
    showSection(currentSectionIndex);
});

document.getElementById('rightArrow').addEventListener('click', () => {
    currentSectionIndex = (currentSectionIndex === sections.length - 1) ? 0 : currentSectionIndex + 1;
    showSection(currentSectionIndex);
});




// Obtener referencia al contador de turnos y al botón de siguiente turno
const turnCounter = document.getElementById('contadorTurno');
const nextTurnBtn = document.getElementById('siguienteTurno');
const  bingoNumber = document.getElementById('numeroBingo');

// Variable para almacenar el contador de turnos
let turnCount = 0;
let listaConteo = [];
let numeroBingo = 0;

nextTurnBtn.addEventListener('click', () => {
    if (turnCount == 25){
        verificarCartonPuntos(); // Verificar si se completó algún cartón y asignar puntos
        window.location.href="Terminar.html";
    }
    // Incrementar el contador de turnos
    turnCount++;
    // Generar un número aleatorio
    let numeroAleatorio;
    do {
        numeroAleatorio = Math.floor(Math.random() * 50) + 1; //Genera un numero random entre 1 y 50 se suma 1 para asegurar que se llegue a [1,50] y no quede en [0,49]
    } while (listaConteo.includes(numeroAleatorio));
    listaConteo.push(numeroAleatorio);
    localStorage.getItem('NumeroRandom', numeroAleatorio);
    // Actualizar el texto del contador de turnos en el HTML
    bingoNumber.textContent = `Número de Bingo: ${numeroAleatorio}`;
    turnCounter.textContent = `Turno: ${turnCount}`;
    // Actualizar los cartones de los jugadores con el número aleatorio generado
    crearCartonJugadorBingo("cartonBingo1", numeroAleatorio);
    crearCartonJugadorBingo("cartonBingo2", numeroAleatorio);
    crearCartonJugadorBingo("cartonBingo3", numeroAleatorio);
    crearCartonJugadorBingo("cartonBingo4", numeroAleatorio);
});



function reiniciarCarton() {
    localStorage.removeItem('numerosMarcados'); // Limpiar los números marcados en el almacenamiento local
    localStorage.removeItem('listaCartonBingo');
}

function reiniciarJuego() {
    if (confirm("¿Estás seguro de que deseas reiniciar el juego?")) {
        reiniciarCarton(); // Llamar a la función para reiniciar el estado del cartón del bingo
        window.location.reload(); // Recargar la página para reiniciar el juego
    }
}

function salirJuego() {
    if (confirm("¿Estás seguro de que deseas salir del juego?")) {
        reiniciarCarton(); // Llamar a la función para reiniciar el estado del cartón del bingo
        localStorage.removeItem('listaJugadores');
        localStorage.removeItem('tamanoCarton');
        window.location.href="MenuPrincipal.html"; //Vuelve al menu principal
    }
}

