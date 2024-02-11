// Función para agregar un nombre de jugador a la lista en LocalStorage
function agregarJugador(nombre) {
    let jugadores = obtenerJugadores();
    jugadores.push(nombre);
    localStorage.setItem('listaJugadores', JSON.stringify(jugadores));
}

// Función para obtener la lista de jugadores almacenada en LocalStorage
function obtenerJugadores() {
    let jugadores = localStorage.getItem('listaJugadores');
    return jugadores ? JSON.parse(jugadores) : [];
}
// Función para agregar el tamaño del cartón al almacenamiento local
function agregarTamanoCarton(tamanoCarton) {
    localStorage.setItem('tamanoCarton', tamanoCarton);
}

// Función para obtener el tamaño del cartón desde el almacenamiento local
function obtenerTamanoCarton() {
    return localStorage.getItem('tamanoCarton');
}


// Función para obtener los numeros que se desean colorear en el cartón desde el almacenamiento local
function obtenerNumerosMarcados() {
    let numerosMarcados = localStorage.getItem('numerosMarcados');
    return numerosMarcados ? JSON.parse(numerosMarcados) : [];
}

/// Función para guardar los numeros del bingo en el almacenamiento local
function marcarNumero(numero) {
    let numerosMarcados = obtenerNumerosMarcados();
    numerosMarcados.push(numero);
    localStorage.setItem('numerosMarcados', JSON.stringify(numerosMarcados));
}

function guardarDatos() {
    //Obtener los inputs que piden
    let jugador1 = document.getElementById("jugador1").value;
    let jugador2 = document.getElementById("jugador2").value;
    let jugador3 = document.getElementById("jugador3").value;
    let jugador4 = document.getElementById("jugador4").value;
    let largoCarton = document.getElementById("largoCarton").value;

    // Validar los datos ingresados
    if(jugador1 === "" || jugador2 === "" || jugador3 === "" || jugador4 === "" || largoCarton === "") {
        alert("Por favor, complete todos los campos.");
        return; // Detener la ejecución si hay campos vacíos
    }
    // Validar que el tamaño sea un número válido
    largoCarton = parseInt(largoCarton);
    if(Number.isInteger(largoCarton) && largoCarton >= 3 && largoCarton <= 5) {
        // El numero es válido
        agregarJugador(jugador1);
        agregarJugador(jugador2);
        agregarJugador(jugador3);
        agregarJugador(jugador4);
        agregarTamanoCarton(largoCarton);
        window.location.href="JuegoBingo.html";
        

    } else {
        alert("Por favor, ingrese un número entero válido en el rango de 3 a 5.");
        return; // Detener la ejecución si el numero no es válido
    }   
}



// Función para crear y mostrar el cartón de bingo de un jugador
function crearCartonJugador(idContenedor, numeroAleatorio) {
    let cartonJugadorBingo = document.getElementById(idContenedor);
    let tamanoCarton = obtenerTamanoCarton();
    let carton = crearCartonBingo(tamanoCarton);
    
    // Limpiar el contenedor antes de agregar nuevos números
    cartonJugadorBingo.innerHTML = "";
    
    // Mostrar el cartón de Bingo en el contenedor
    carton.forEach((fila, i) => {
        let filaDiv = document.createElement('div');
        filaDiv.classList.add('filaBingo');

        fila.forEach((numero, j) => {
            let numeroDiv = document.createElement('div');
            numeroDiv.classList.add('numeroBingo');
            numeroDiv.textContent = numero;

            // Si el número coincide con el número aleatorio generado en el turno
            // o si el número ya está marcado en el cartón, resaltar la casilla en rojo
            if (numero === numeroAleatorio || esNumeroMarcado(numero, carton, i, j)) {
                numeroDiv.classList.add('marcado');
            }

            filaDiv.appendChild(numeroDiv);
        });

        cartonJugadorBingo.appendChild(filaDiv);
    });
}

// Función para verificar si un número en el cartón ya ha sido marcado
function esNumeroMarcado(numero, carton, filaIndex, columnaIndex) {
    for (let i = 0; i < carton.length; i++) {
        for (let j = 0; j < carton[i].length; j++) {
            if (i === filaIndex && j === columnaIndex) continue; // Saltar la casilla actual
            if (carton[i][j] === numero) return true; // Si el número está en otra casilla, está marcado
        }
    }
    return false;
}


function crearCartonBingo(tamanio) {
    let matrizCarton = []; //Crear matriz
    let numeroBingo = 0; //Crear numero
    let numeroRepetido = []; //Verificar numero repetido

    //El for crea una matriz vacía de tamaño N*N 
    for (let i = 0; i < tamanio; i++) {
        matrizCarton[i] = [];
    }
    //Estos for llenan la matriz con numeros aleratorios del 1 al 50
    for (let i = 0; i < tamanio; i++) {
        for (let j = 0; j < tamanio; j++) {
            do {
                numeroBingo = Math.floor(Math.random() * 50) + 1 //Genera un numero random entre 1 y 50 se suma 1 para asegurar que se llegue a [1,50] y no quede en [0,49]
            } while (numeroRepetido.includes(numeroBingo));

            numeroRepetido.push(numeroBingo); //Agrega el numero a la lista de numeros repetidos
            matrizCarton[i][j]= numeroBingo;
        }
    }
    return matrizCarton;
}

function verificarLinea(carton) {
    // Verificar líneas horizontales
    for (let i = 0; i < carton.length; i++) {
        let lineaCompleta = true;
        for (let j = 0; j < carton[i].length; j++) {
            if (!esNumeroMarcado(carton[i][j])) {
                lineaCompleta = false;
                break;
            }
        }
        if (lineaCompleta) return true;
    }

    // Verificar líneas verticales
    for (let i = 0; i < carton[0].length; i++) {
        let lineaCompleta = true;
        for (let j = 0; j < carton.length; j++) {
            if (!esNumeroMarcado(carton[j][i])) {
                lineaCompleta = false;
                break;
            }
        }
        if (lineaCompleta) return true;
    }

    // Verificar línea diagonal principal
    let diagonalPrincipalCompleta = true;
    for (let i = 0; i < carton.length; i++) {
        if (!esNumeroMarcado(carton[i][i])) {
            diagonalPrincipalCompleta = false;
            break;
        }
    }
    if (diagonalPrincipalCompleta) return true;

    // Verificar línea diagonal secundaria
    let diagonalSecundariaCompleta = true;
    for (let i = 0; i < carton.length; i++) {
        if (!esNumeroMarcado(carton[i][carton.length - 1 - i])) {
            diagonalSecundariaCompleta = false;
            break;
        }
    }
    if (diagonalSecundariaCompleta) return true;

    return false;
}
