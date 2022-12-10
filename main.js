const canvasConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
    topLeft: { x: 0, y: 0 },
    topRight: { x: this.width, y: 0 },
    bottomLeft: { x: 0, y: this.height },
    topRight: { x: this.width, y: this.height }
};

const canvas = document.getElementById('game-canvas');
canvas.width = canvasConstraints.width;
canvas.height = canvasConstraints.height;

const ctx = canvas.getContext("2d");


let player = new Player(canvasConstraints);
let gun = new Gun(canvasConstraints, player.position);
let gameObjects = [
    player,
    gun
];


requestAnimationFrame(draw);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "rgb(51,51,51)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach(go => {
        go.update();
        go.draw(ctx);
    });

    requestAnimationFrame(draw);
}
