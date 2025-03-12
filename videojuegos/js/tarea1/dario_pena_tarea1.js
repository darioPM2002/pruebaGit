/*
Darío Cuauhtémoc Peña Mariano
Tecnológico de Monterrey
13 de Febrero de 2025
*/ 






// Función para encontrar el primer carácter no repetido en una cadena
export function firstNonRepeating(string) {
    for(let i=0; i<string.length; i++ ) { // Iteramos sobre cada carácter
        let repeated = false;
        for(let j=0; j<string.length; j++) { // Comparamos con cada otro carácter
            if(string[i] == string[j] && i != j) { // Si se repite en otra posición, marcamos como repetido
                repeated = true;
                break;
            }
        }
        if (!repeated) {
            return string[i]; // Retornamos el primer carácter no repetido
        }
    }
}

console.log("Ejercicio 1 primer letra que no se repite: "+ firstNonRepeating("abacddbec"));
// Implementación del algoritmo de ordenamiento Bubble Sort
export function bubbleSort(listaNumeros) {
    let n = listaNumeros.length;
    for (let i = 0; i < n; i++) {
        let intercambio = false; // Bandera para detectar si hubo intercambio
        
        for (let j = 0; j < n - i - 1; j++) {
            if (listaNumeros[j] > listaNumeros[j + 1]) {
                // Intercambio de valores
                let temp = listaNumeros[j];
                listaNumeros[j] = listaNumeros[j + 1];
                listaNumeros[j + 1] = temp;
                intercambio = true;
            }
        }
        if (!intercambio) break; // Si no hubo intercambios, terminamos el algoritmo
    }
    return listaNumeros;
}


let numeros = [5, 3, 8, 4, 2]
console.log("Ejercicio 2 bubble sort");
console.log("Lista: " + numeros);
console.log("Lista ordenada Bubble sort: " +bubbleSort(numeros));

// Función para invertir un arreglo
export function invertArray(arrayTo) {
    let arrayNoInvert = arrayTo;
  
    let arrayInvert = [];
        for (let index = arrayNoInvert.length-1 ; index >=0; index--) {
          
            arrayInvert.push(arrayNoInvert[index]);
            
        }
        

        return arrayInvert;


}
console.log("Funcion simple invertir arreglo: ----------------------------");
console.log(invertArray([9,38,5,2,3,1,75]));
// Función para invertir un arreglo en su lugar (sin crear otro arreglo)
export function invertArrayInplace(arrayInvertir) {
    let left = 0;
    let right = arrayInvertir.length - 1;

    while (left < right) {
        let temp = arrayInvertir[left];
        arrayInvertir[left] = arrayInvertir[right];
        arrayInvertir[right] = temp;

        left++;
        right--;
    }

}


// Función para capitalizar la primera letra de cada palabra
export function capitalize(oracion) {
   
    let palabras = oracion.split(" ");
    let palabra ="";
    let letraMayuscula ="";
    let oracionMayuscula = [];
    let stringMayuscula = "";
    if (oracion == "") {
        return "";
    }
    for (let index = 0; index < palabras.length; index++) {
        palabra = palabras[index];
        letraMayuscula =palabra[0].toUpperCase();
        
        palabra = letraMayuscula + palabra.slice(1);
       
         oracionMayuscula.push(palabra)  ;
        
    }
    return oracionMayuscula.join(" ");


}

console.log(capitalize("mexico"));


// Función para calcular el máximo común divisor (MCD) usando el algoritmo de Euclides
export function mcd(n1, n2) {
    let nMayor = 0;
    let nMenor = 0;
    if (n1>n2) {
        nMayor = n1;
        nMenor = n2;
    }else{

        nMayor = n2;
        nMenor = n1;
    }

    while (nMenor !== 0) {
        let divi = nMayor % nMenor; 
        nMayor = nMenor; 
        nMenor = divi; 
      }

      return nMayor;

    
}

console.log(mcd(30, 45)); 

// Función para convertir texto a "hacker speak"
export function hackerSpeak(frase) {
    let translatedPhrase = "";

    for (let index = 0; index < frase.length; index++) {
         translatedPhrase += letterToHacker(frase[index]);
        
    }
    return translatedPhrase;
}

// Función auxiliar que convierte letras a su equivalente en hacker speak
export function letterToHacker(letra) {


    if (letra == "A" || letra == "a") {
        return "4";
    }
    
   else if (letra == "S" || letra == "s") {
        return "5";
    }
    else if (letra == "I" || letra == "i") {
        return "1";
    }
    else if (letra == "E" || letra == "e") {
        return "3";
    }
    else if (letra == "U" || letra == "u") {
        return "µ";
    }
    else if (letra == "O" || letra == "o") {
        return "0";
    }
    
    return letra;
}

hackerSpeak("Javascript es divertido");

// Función para encontrar los factores de un número
export function factorize(number) {

let factores = [];
let index = number;

while (index>=1) {
    
    if (number % index == 0) {
        factores.push(number/index);
    }



    index--;
}

return factores;


}

console.log(factorize(15));

// Función para eliminar duplicados de un arreglo
export function deduplicate (array) {
    let numbersNotDup = [];


    for (let index = 0; index < array.length; index++) {
        
        if (!numbersNotDup.includes(array[index])) {
            numbersNotDup.push(array[index]);
        }
  
   
        
    }
    return numbersNotDup;

// Función para encontrar la longitud de la cadena más corta en un arreglo de cadenas
}
export function findShortestString(stringArray) {
    if (stringArray.length == 0) {
        return 0;
        
    }

    let minLength = stringArray[0].length; 

    // Iteramos sobre el arreglo de palabras
    for (let index = 1; index < stringArray.length; index++) {
        if (stringArray[index].length < minLength) {
            minLength = stringArray[index].length; 
        }
    }

    return minLength; 
}
console.log("fsda");
console.log(findShortestString(["one", "two", "three", "four", "five"]));

// Función para determinar si una cadena es un palíndromo
export function isPalindrome (palOrNot) {
    let probaPalind= "";
    let palOrNotSpa= "";
        for (let index = 0; index < palOrNot.length; index++) {
            if (palOrNot[index]!=" ") {
                palOrNotSpa += palOrNot[index];    
            }
            
        }


    for (let index = palOrNot.length-1; index >= 0; index--) {

        if (palOrNot[index]!=" ") {
            probaPalind += palOrNot[index];    
        }
        
     
    }

    if (probaPalind.toUpperCase() == palOrNotSpa.toUpperCase()) {

    return true;
    }
    return false;







}



console.log(isPalindrome("anita lava la tinaA"));

// Función para ordenar un arreglo de cadenas alfabéticamente
export function sortStrings (stringArray) {
    
    let sortedArray = stringArray.sort();
    return sortedArray;
}

console.log(sortStrings(["hola", "adios", "como", "estas", "bien"]));


// Función para calcular la media y la moda de un arreglo de números
export function stats(numberArray) {
    let total= 0;
    let moda=0;
    let modaNumber;
    let result = [];
    let hashMap = {};

    if (numberArray.length == 0) {
        return [0,0];
        
    }

    for (let index = 0; index < numberArray.length; index++) {
        total += numberArray[index];
        if (hashMap[numberArray[index]]) {
            
            hashMap[numberArray[index]] += 1;
        }else{
            hashMap[numberArray[index]] = 1 ;
        }

        
    }
    

    for (const key in hashMap) {
        if (hashMap[key]>moda) {
            moda = hashMap[key];
          
            modaNumber = key;
        }
    }
   

    result.push(total/numberArray.length);
    result.push(Number(modaNumber));
    return result;




    
}

console.log(stats([8, 4, 2, 6, 8, 13, 17, 2, 4, 8]));
// Función para encontrar la cadena más frecuente en un arreglo
export function popularString (stringArray) {
    
    let total= 0;
    let moda=0;
    let modaNumber;
    let result = "";
    let hashMap = {};

    if (stringArray.length == 0) {
        return "";
        
    }


    for (let index = 0; index < stringArray.length; index++) {
    
        if (hashMap[stringArray[index]]) {
            
            hashMap[stringArray[index]] += 1;
        }else{
            hashMap[stringArray[index]] = 1 ;
        }

        
    }
    

    for (const key in hashMap) {
        if (hashMap[key]>moda) {
            moda = hashMap[key];
         
            modaNumber = key;
        }
    }
   

    return modaNumber;



}

console.log(popularString(["hola", "adios","adios","adios", "como", "estas", "bien", "bien"]));


// Función para determinar si un número es potencia de 2
export function isPowerOf2 (number) {
    
    return (number > 0) && ((number & (number - 1)) == 0);
}

// Implementación del algoritmo Bubble Sort en orden descendente
export function sortDescending(listaNumeros) {
    let n = listaNumeros.length;
    for (let i = 0; i < n; i++) {
        let intercambio = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (listaNumeros[j] < listaNumeros[j + 1]) {
                
                let temp = listaNumeros[j];
                listaNumeros[j] = listaNumeros[j + 1];
                listaNumeros[j + 1] = temp;
                
                intercambio = true;
            }
        }
        
  
        if (!intercambio) break;
    }
    return listaNumeros;
        


}

console.log( sortDescending([9,38,5,2,3,1,75]));

