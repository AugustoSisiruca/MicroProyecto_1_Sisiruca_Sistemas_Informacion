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



function crearCartonJugador(idContenedor) {
    let cartonJugadorBingo = document.getElementById(idContenedor);
    let tamanoCarton = obtenerTamanoCarton();
    let carton = crearCartonBingo(tamanoCarton);
    
    // Limpiar el contenedor antes de agregar nuevos números
    cartonJugadorBingo.innerHTML = "";
    
    // Mostrar el cartón de Bingo en el contenedor
    carton.forEach(fila => {
        let filaDiv = document.createElement('div');
        filaDiv.classList.add('filaBingo');

        fila.forEach(numero => {
            let numeroDiv = document.createElement('div');
            numeroDiv.classList.add('numeroBingo');
            numeroDiv.textContent = numero;
            filaDiv.appendChild(numeroDiv);
        });

        cartonJugadorBingo.appendChild(filaDiv);
    });
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