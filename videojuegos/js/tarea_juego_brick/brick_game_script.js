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
const initialSpeed = 800; // Aumentado para mejor movimiento

let leftScore = 0;
let rightScore = 0;

// Canvas y contexto
let canvas;
let ctx;

//ladrillos:
const brickWidth = 60;
const brickHeight = 20;
const brickRows = 5;
const brickColumns = 10;
const brickPadding = 10; // Espacio entre ladrillos
const brickOffsetTop = 30; // Distancia desde la parte superior
const brickOffsetLeft = 30; // Distancia desde la parte izquierda


let bricks = [];

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
        let color = "blue"; // Puedes cambiar el color de cada ladrillo si lo deseas
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
          
            leftScore++; // Incrementar puntaje al destruir un ladrillo
        }
    }
}

class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.velocity = new Vec(0, 0); // Inicializar velocity
        this.reset();
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.inPlay = true;
        let angle = Math.random() * (Math.PI / 2) - (Math.PI / 4);
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(initialSpeed);
        // Selecciona una dirección aleatoria
        this.velocity.x *= (Math.random() < 0.5) ? 1 : -1;
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec((canvasWidth / 2) - 10, canvasHeight - 100);
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

function drawScene(newTime) {
    if (oldTime === undefined) {
        oldTime = newTime;
    }
    let deltaTime = (newTime - oldTime) / 1000; // Convertir a segundos
    oldTime = newTime;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dibujar objetos
    
    barraSuperior.draw(ctx);
    barraInferior.draw(ctx);
    porteriaIz.draw(ctx);
    porteriaDer.draw(ctx);
    mainPaddle.draw(ctx);
    box.draw(ctx);

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
    if (boxOverlap(box, barraSuperior) || boxOverlap(box, barraInferior) ) {

        box.velocity.y *= -1;
    }
    if (boxOverlap(box, mainPaddle)) {
        console.log("Colisión con la paleta");
    
        let relativeIntersectX = (box.position.x + box.width / 2) - (mainPaddle.position.x + mainPaddle.width / 2);
        let normalizedIntersectX = relativeIntersectX / (mainPaddle.width / 2);
        let angle = normalizedIntersectX * (Math.PI / 3); // Ángulo entre -60° y 60°
        let speed = box.velocity.magnitude() ; // Usar magnitude() en lugar de length
    
        box.velocity = new Vec(Math.cos(angle), -Math.abs(Math.sin(angle))).times(speed);
    }


    checkBrickCollisions();

    box.update(deltaTime);
    // Continuar el bucle del juego
    requestAnimationFrame(drawScene);
}

function createEventListeners() {
    window.addEventListener("keydown", (event) => {
  
         if (event.key === "o" || event.code === "ArrowLeft") {
            mainPaddle.velocity = new Vec( -paddleVelocity,0);
        } else if (event.key === "l" || event.code === "ArrowRight") {
            mainPaddle.velocity = new Vec( paddleVelocity, 0);
        }
    });

    window.addEventListener("keyup", (event) => {

        if (event.key === "o" || event.code === "ArrowLeft") {
            mainPaddle.velocity = new Vec(0, 0);
        } else if (event.key === "l" || event.code === "ArrowRight") {
            mainPaddle.velocity = new Vec(0, 0);
        }
    });
}


// Definición de los objetos
const barraSuperior = new Paddle(new Vec(0, 0), canvasWidth, 10, "white");
const barraInferior = new Paddle(new Vec(0, canvasHeight - 10), canvasWidth, 10, "white");
const mainPaddle = new Paddle(new Vec((canvasWidth / 2) - 50, canvasHeight - 50), 100, 20, "white");
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
    // Agregar eventos de teclado
    createEventListeners();

    // Iniciar el bucle del juego
    drawScene(0);
}

// Llamar a main cuando la página cargue
window.onload = main;
