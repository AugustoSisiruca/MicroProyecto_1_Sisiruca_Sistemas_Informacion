//Funcion que verifica que exita el numero marcado
function esNumeroMarcado(numero) {
    let numerosMarcados = obtenerNumeroBingo();
    return numerosMarcados.includes(numero);
}

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

// Función para obtener la lista de jugadores almacenada en LocalStorage
function obtenerCartonJugador() {
    let listaCartonJugadores = localStorage.getItem('listaCartonBingo');
    return listaCartonJugadores ? JSON.parse(listaCartonJugadores) : [];
}


// Función para agregar el carton de Bingo de un jugador a la lista en LocalStorage
function agregarCartonJugador(listaCarton) {
    let listaCartonJugadores = obtenerCartonJugador();
    listaCartonJugadores.push(listaCarton);
    localStorage.setItem('listaCartonBingo', JSON.stringify(listaCartonJugadores));
}


// Función para obtener los numeros que se desean colorear en el cartón desde el almacenamiento local
function obtenerNumeroBingo() {
    let numerosMarcados = localStorage.getItem('numerosMarcados');
    return numerosMarcados ? JSON.parse(numerosMarcados) : [];
}

/// Función para guardar los numeros del bingo en el almacenamiento local
function agregarNumeroBingo(numero) {
    let numerosMarcados = obtenerNumeroBingo();
    numerosMarcados.push(numero);
    localStorage.setItem('numerosMarcados', JSON.stringify(numerosMarcados));
}

class Jugador {
    constructor(nombre, matriz, puntos) {
        this.nombre = nombre;
        this.matriz = matriz;
        this.puntos = puntos;

    }
}

//Funcion que manda parametros a la funcion verificarLineas y a verificarCartonCompleto
function verificarCartonPuntos() {
    let nombre = obtenerJugadores();
    let matrizCodigo = [];
    let setNombre = new Set(nombre); 
    let listaNombre = Array.from(setNombre);
    for (let k = 0; k < listaNombre.length; k++) {
        matrizCodigo.push(listaNombre[k])
    }
    let matriz = obtenerCartonJugador();
    let puntos = 0;
    let jugadores = [];

    for (let i = 0; i < listaNombre.length; i++) {
        let matriz = obtenerCartonJugador();
        let puntos = 0;
    
        // Obtener el primer elemento de cada matriz en la lista de matrices
        let primerElementoMatriz = [];
        for (let j = 0; j < matriz.length; j++) {
            primerElementoMatriz.push(matriz[j][0]);
        }
        console.log(primerElementoMatriz)
        let jugador = new Jugador(matrizCodigo[i], primerElementoMatriz, puntos);
        jugadores.push(jugador);
    }

    verificarLineas(matriz, listaNombre);
    verificarCartonCompleto(matriz);
    
}

//Funcion que comprueba los datos de los usuarios que se registren
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

    if (jugador1 === jugador2 || jugador1 === jugador3 || jugador1 === jugador4 || jugador2 === jugador3 || jugador2 === jugador4 || jugador3 === jugador4){
        alert("Por favor, ponga nombres distintos.");
        return; // Detener la ejecución si hay campos con nombres iguales
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

// Función para mostrar el cartón de bingo de un jugador
function crearCartonJugadorBingo(idContenedor, numeroAleatorio) {
    let cartonJugador = document.getElementById(idContenedor); // Obtener el contenedor del cartón del jugador
    let numerosCarton = cartonJugador.querySelectorAll('.numeroBingo'); // Obtener todos los elementos de número en el cartón
    agregarNumeroBingo(numeroAleatorio); //Guardar numero 
    // Recorrer todos los elementos de número en el cartón
    numerosCarton.forEach(numero => {
        // Verificar si el número coincide con el número aleatorio generado
        if (parseInt(numero.textContent) === numeroAleatorio) {
            numero.classList.add('marcado'); // Agregar la clase 'marcado' al número
        }
    });
}

// Función para crear el cartón de bingo de un jugador
function crearCartonJugador(idContenedor) {
    let tamanoCarton = obtenerTamanoCarton();
    let matrizJugadorBingo = crearCartonBingo(tamanoCarton, idContenedor);
    agregarCartonJugador(matrizJugadorBingo);
    }


// Función para crear el cartón de bingo
function crearCartonBingo(tamanio, idContenedor) {
    let cartonJugadorBingo = document.getElementById(idContenedor);
    let matrizCarton = []; //Crear matriz
    let numeroRepetido = []; //Verificar numero repetido

    //El for crea una matriz vacía de tamaño N*N 
    for (let i = 0; i < tamanio; i++) {
        matrizCarton[i] = [];
    }
    //Estos for llenan la matriz con numeros aleratorios del 1 al 50
    for (let i = 0; i < tamanio; i++) {
        for (let j = 0; j < tamanio; j++) {
            let numeroBingo;
            do {
                numeroBingo = Math.floor(Math.random() * 50) + 1; //Genera un numero random entre 1 y 50 se suma 1 para asegurar que se llegue a [1,50] y no quede en [0,49]
            } while (numeroRepetido.includes(numeroBingo));

            numeroRepetido.push(numeroBingo); //Agrega el numero a la lista de numeros repetidos
            matrizCarton[i][j] = numeroBingo;
        }
    }

    // Crear los elementos div para cada número en la matriz
    let cartonDiv = document.createElement('div');
    cartonDiv.classList.add('cartonBingo');

    // Recorrer la matriz y crear elementos div para cada número
    for (let i = 0; i < matrizCarton.length; i++) {
        let filaDiv = document.createElement('div');
        filaDiv.classList.add('filaBingo');

        for (let j = 0; j < matrizCarton[i].length; j++) {
            let numeroDiv = document.createElement('div');
            numeroDiv.classList.add('numeroBingo');
            numeroDiv.textContent = matrizCarton[i][j];
            filaDiv.appendChild(numeroDiv);
        }
        cartonDiv.appendChild(filaDiv);
    }

    // Agregar el cartón al contenedor en el HTML

    cartonJugadorBingo.appendChild(cartonDiv);
    // Retornar la matriz generada
    return matrizCarton;
}

//Funcion pra verificar si hay marcas de puntos de lineas rojas
function verificarLineas(carton, jugador) {
    let puntos = 0;
    // Verificar líneas horizontales
    for (let k = 0; k < carton.length; k++) {
        for (let i = 0; i < carton[k].length; i++) {
            let lineaCompleta = true;
            for (let j = 0; j < carton[k][i].length; j++) {
                if (!esNumeroMarcado(carton[k][i][j])) {
                    lineaCompleta = false;
                    break;
                }
            }
            if (lineaCompleta) {
                puntos++;
                console.log(`${jugador[k]} ha completado una línea horizontal.`);
            }
        }
    }


    // Verificar líneas verticales
    for (let k = 0; k < carton.length; k++) {
        for (let i = 0; i < carton[k].length; i++) {
            let lineaCompleta = true;
            for (let j = 0; j < carton[k].length; j++) {
                if (!esNumeroMarcado(carton[k][j][i])) {
                    lineaCompleta = false;
                    break;
                }
            }
            if (lineaCompleta) {
                puntos++;
                console.log(`${jugador[k]} ha completado una línea vertical.`);
            }
        }
    }

    // Verificar línea diagonal principal
    let diagonalPrincipalCompleta = true;
    for (let i = 0; i < carton.length; i++) {
        if (!esNumeroMarcado(carton[i][i])) {
            diagonalPrincipalCompleta = false;
            break;
        }
    }
    if (diagonalPrincipalCompleta) {
        puntos++;
        console.log(`${jugador} ha completado la línea diagonal principal.`);
    }

    // Verificar línea diagonal secundaria
    let diagonalSecundariaCompleta = true;
    for (let i = 0; i < carton.length; i++) {
        if (!esNumeroMarcado(carton[i][carton.length - 1 - i])) {
            diagonalSecundariaCompleta = false;
            break;
        }
    }
    if (diagonalSecundariaCompleta) {
        puntos++;
        console.log(`${jugador} ha completado la línea diagonal secundaria.`);
    }

    return puntos;
}


// Función para verificar si un cartón está completo
function verificarCartonCompleto(matriz) {
    for (let k = 0; k < matriz.length; k++) {
        for (let i = 0; i < matriz[k].length; i++) {
            for (let j = 0; j < matriz[k][i].length; j++) {
                if (!esNumeroMarcado(matriz[k][i][j])) {
                    return false;
                }
            }
        }
        return true;
    }
}
