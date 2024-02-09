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