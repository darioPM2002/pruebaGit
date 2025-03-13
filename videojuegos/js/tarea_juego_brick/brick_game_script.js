/*
Darío Cuauhtémoc Peña Mariano
Tecnológico de Monterrey
11 de marzo de 2025
Ejercicio creación de videojuego brick breaker
*/

"use strict";

// Variables de tamaño de pantalla de renderizado
const canvasWidth = 800;
const canvasHeight = 700;

// Variables de velocidad de juego
let oldTime;
const paddleVelocity = 400; // Aumentado para mayor visibilidad
const speedIncrease = 2;
const initialSpeed = 300; // Aumentado para mejor movimiento

let leftScore = 0;
let rightScore = 0;

// Canvas y contexto
let canvas;
let ctx;

//ladrillos:

const brickHeight = 15;
const brickRows = 10;
const brickColumns = 15;
const brickPadding = 5; // Espacio entre ladrillos
const brickOffsetTop = 70; // Distancia desde la parte superior
const brickOffsetLeft =40; // Distancia desde la parte izquierda
const brickWidth = ((canvasWidth -150)/brickColumns);



//variables juego
let score = 0;
let bricks = [];
let player2Active = false;

let vidas = 3 ;

class Brick extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "brick");
        this.active = true; // El ladrillo está activo inicialmente
    }

    destroy() {
        this.active = false; // El ladrillo se destruye
    }
}
// Crear los ladrillos
for (let row = 0; row < brickRows; row++) {
    for (let col = 0; col < brickColumns; col++) {
        let x = brickOffsetLeft + col * (brickWidth + brickPadding);
        let y = brickOffsetTop + row * (brickHeight + brickPadding);
        let color = "white"; 
        bricks.push(new Brick(new Vec(x, y), brickWidth, brickHeight, color));
    }
}


function checkBrickCollisions() {
    for (let i = 0; i < bricks.length; i++) {
        let brick = bricks[i];
        if (brick.active && boxOverlap(box, brick)) {
            console.log("Colisión con ladrillo");
            box.velocity = new Vec(   box.velocity.x,box.velocity.y*-1);
           
            brick.destroy();
          
            score++; // Incrementar puntaje al destruir un ladrillo

            if (score >=(brickRows *brickColumns)) {
                mostrarGameOverWin()
            }
        }
        if (brick.active && boxOverlap(secondaryBox, brick)) {
            console.log("Colisión con ladrillo");
            secondaryBox.velocity = new Vec(   secondaryBox.velocity.x,secondaryBox.velocity.y*-1);
           
            brick.destroy();
          
            score++; // Incrementar puntaje al destruir un ladrillo
            if (score >=(brickRows *brickColumns)) {
                mostrarGameOverWin()
            }
        }
    }
}

class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.velocity = new Vec(0, 0); 
        this.reset();
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.inPlay = true;
   
        let angle = Math.PI / 4; // 45 grados en radianes
        this.velocity = new Vec(Math.cos(angle), -Math.sin(angle)).times(initialSpeed);
    
        this.velocity.x *= (Math.random() < 0.5) ? 1 : -1;
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec((canvasWidth / 2) - 10, canvasHeight - 100);
        this.velocity = new Vec(0, 0);
    }
}


class Ball2 extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.velocity = new Vec(0, 0); 
        this.reset();
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.inPlay = true;
   
        let angle = Math.PI / 4; // 45 grados en radianes
        this.velocity = new Vec(Math.cos(angle), -Math.sin(angle)).times(initialSpeed);
    
        this.velocity.x *= (Math.random() < 0.5) ? 1 : -1;
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec((canvasWidth / 4) - 10, canvasHeight - 100);
        this.velocity = new Vec(0, 0);
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0, 0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
        if (this.position.y < 10) {
            this.position.y = 10;
        } else if (this.position.y + this.height > canvasHeight - 10) {
            this.position.y = canvasHeight - this.height;
        }
    }
}

// Función para mostrar la pantalla de Game Over
function mostrarGameOverWin() {
    console.log("Game over")
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); 
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight); 

    ctx.fillStyle = "white"; 
    ctx.font = "48px Arial"; 
    ctx.textAlign = "center"; 
    ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2 - 20); 
    ctx.font = "24px Arial"; 
    ctx.fillText("Presiona F5 para reiniciar", canvasWidth / 2, canvasHeight / 2 + 20);
}
function mostrarGameOver() {
    console.log("Felicidades Ganaste")
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); 
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "white"; 
    ctx.font = "48px Arial"; 
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2 - 20); 
    ctx.font = "24px Arial";
    ctx.fillText("Presiona F5 para reiniciar", canvasWidth / 2, canvasHeight / 2 + 20); 
}
function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = (newTime - oldTime) / 1000; 
    oldTime = newTime;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (vidas <= 0) {
        mostrarGameOver(); // Mostrar pantalla de Game Over
        return; // Detener el bucle de juego
    }
    // Dibujar objetos
    
    barraSuperior.draw(ctx);
    barraInferior.draw(ctx);
    porteriaIz.draw(ctx);
    porteriaDer.draw(ctx);
    mainPaddle.draw(ctx);
    box.draw(ctx);

    if (player2Active) {
        secondaryPaddle.draw(ctx);
        secondaryBox.draw(ctx);
        secondaryBox.update(deltaTime);
       
        secondaryPaddle.update(deltaTime);
    }

    // Actualizar objetos
    box.update(deltaTime);
    mainPaddle.update(deltaTime);


    
    // Dibujar los ladrillos
    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].active) {
            bricks[i].draw(ctx);
        }
    }

    if (boxOverlap(box, porteriaIz) || boxOverlap(box, porteriaDer)) {
        console.log("Colisión con portería");
        box.velocity.x *= -1;
    }
    if (boxOverlap(box, barraSuperior)   ) {

        box.velocity.y *= -1;
    }
    if (boxOverlap(box, mainPaddle) ) {
        console.log("Colisión con la paleta");
    
        let relativeIntersectX = (box.position.x + box.width / 2) - (mainPaddle.position.x + mainPaddle.width / 2);
        let normalizedIntersectX = relativeIntersectX / (mainPaddle.width / 2);
        let angle = normalizedIntersectX * (Math.PI / 3); 
        let speed = box.velocity.magnitude() ; 
    
        box.velocity = new Vec(Math.cos(angle), -Math.abs(Math.sin(angle))).times(speed);
    }

    if (player2Active) {
        if ( boxOverlap(box, secondaryPaddle) ) {
            console.log("Colisión con la paleta");
        
            let relativeIntersectX = (box.position.x + box.width / 2) - (mainPaddle.position.x + mainPaddle.width / 2);
            let normalizedIntersectX = relativeIntersectX / (mainPaddle.width / 2);
            let angle = normalizedIntersectX * (Math.PI / 3);
            let speed = box.velocity.magnitude() ; 
        
            box.velocity = new Vec(Math.cos(angle), -Math.abs(Math.sin(angle))).times(speed);
        }
    }


    if (boxOverlap(secondaryBox, porteriaIz) || boxOverlap(secondaryBox, porteriaDer)) {
        console.log("Colisión con portería");
        secondaryBox.velocity.x *= -1;
    }
    if (boxOverlap(secondaryBox, barraSuperior)   ) {

        secondaryBox.velocity.y *= -1;
    }
    if (boxOverlap(secondaryBox, secondaryPaddle) ||boxOverlap(secondaryBox, mainPaddle) ) {
        console.log("Colisión con la paleta");
    
        let relativeIntersectX = (box.position.x + box.width / 2) - (mainPaddle.position.x + mainPaddle.width / 2);
        let normalizedIntersectX = relativeIntersectX / (mainPaddle.width / 2);
        let angle = normalizedIntersectX * (Math.PI / 3); 
        let speed = box.velocity.magnitude() ; 
    
        secondaryBox.velocity = new Vec(Math.cos(angle), -Math.abs(Math.sin(angle))).times(speed);
    }

    //El jugador perdió
    if ( boxOverlap(box, barraInferior) ) {

        vidas = vidas -1;
        resetGameBall1();
        console.log(vidas);

    }
    //El jugador perdió
    if ( boxOverlap(secondaryBox, barraInferior) ) {

        vidas = vidas -1;
        resetGameBall2();
        console.log(vidas);

    }




    checkBrickCollisions();

    box.update(deltaTime);
      
    secondaryBox.update(deltaTime);

    if (player2Active) {
   

    }
     // Dibujar el puntaje
     ctx.fillStyle = "white";
     ctx.font = "24px Arial";
     ctx.textAlign = "left";
     ctx.fillText("Bloques Destruidos: " + score +"  Vidas: " + vidas, 20, 30); 
     ctx.fillText("Presiona 2 para activar el jugador 2", 20, 60); 

    // Continuar el bucle del juego
    requestAnimationFrame(drawScene);
}

function createEventListeners() {
    window.addEventListener("keydown", (event) => {
        if (event.key === "2" ) {
            if (!player2Active) {
                player2Active = true;
                resetGameBall2();
            }

        }
         if (event.key === "o" || event.code === "ArrowLeft") {
            mainPaddle.velocity = new Vec( -paddleVelocity,0);
        } else if (event.key === "l" || event.code === "ArrowRight") {
            mainPaddle.velocity = new Vec( paddleVelocity, 0);
        }

        if ( event.code === "KeyA") {
            secondaryPaddle.velocity = new Vec( -paddleVelocity,0);
        } else if ( event.code === "KeyD") {
            secondaryPaddle.velocity = new Vec( paddleVelocity, 0);
        }
    });

    window.addEventListener("keyup", (event) => {

        if (event.key === "o" || event.code === "ArrowLeft") {
            mainPaddle.velocity = new Vec(0, 0);
        } else if (event.key === "l" || event.code === "ArrowRight") {
            mainPaddle.velocity = new Vec(0, 0);
        }

        if ( event.code === "KeyA") {
            secondaryPaddle.velocity = new Vec(0, 0);
        } else if ( event.code === "KeyD") {
            secondaryPaddle.velocity = new Vec(0, 0);
        }
    });
}


// Definición de los objetos
const barraSuperior = new Paddle(new Vec(0, 0), canvasWidth, 10, "white");
const barraInferior = new Paddle(new Vec(0, canvasHeight - 10), canvasWidth, 10, "white");
const mainPaddle = new Paddle(new Vec((canvasWidth / 2) - 50, canvasHeight - 50), 100, 20, "white");

const secondaryPaddle = new Paddle(new Vec((canvasWidth / 4) - 50, canvasHeight - 50), 100, 20, "white");
const secondaryBox = new Ball2(new Vec((canvasWidth / 4) - 10, canvasHeight - 100), 20, 20, "white");
const porteriaIz = new Paddle(new Vec(0, 0), 10, canvasHeight, "white");
const porteriaDer = new Paddle(new Vec(canvasWidth - 10, 0), 10, canvasHeight, "white");

const box = new Ball(new Vec((canvasWidth / 2) - 10, canvasHeight - 100), 20, 20, "white");


function main() {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    // Inicializar velocidad de la pelota
    box.initVelocity();

    if (player2Active) {
        secondaryBoxbox.initVelocity();
    }
  
    createEventListeners();

    drawScene(0);
}

// Llamar a main cuando la página cargue
window.onload = main;

function resetGameBall1() {
    box.reset(); 
    setTimeout(() => {
        // Restablecer la posición y velocidad de la pelota
     
        box.initVelocity();
        box.color= "red";
        drawScene(0);
    }, 2000); 
}


function resetGameBall2() {
    secondaryBox.reset(); 
    setTimeout(() => {
        // Restablecer la posición y velocidad de la pelota
     
        secondaryBox.initVelocity();
        secondaryBox.color= "red";
        drawScene(0);
    }, 2000); 
}