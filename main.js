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


var gameContext = {};
let player = new Player(canvasConstraints);
let gun = new Gun(canvasConstraints, player.position, gameContext);

let gameObjects = [
    player,
    gun
];



let createDebris = () => {
    for (let i = 0; i < Math.random() * 10; i++) {
        const debris = new Debris(canvasConstraints);
        gameObjects.unshift(debris);
    }
}

createDebris();
requestAnimationFrame(gameLoop);

var paused = false;
document.onkeydown = e => {
    paused = !paused;
}

let lastElapsed = 0;
function gameLoop(elapsed) {
    let delta = (elapsed - lastElapsed) / 10;
    lastElapsed = elapsed;

    // control falling debris
    let debris = gameObjects.filter(go => go.gameObjectType == 'debris');
    if (debris.length == 0) {
        createDebris()
    }
    else {
        debris.forEach(d => {
            if (d.position.y > canvasConstraints.height) {
                gameObjects.splice(gameObjects.indexOf(d), 1);
                gameObjects.push(new Debris(canvasConstraints));
            }
        });
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(51,51,51)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameContext.delta = delta;
    gameContext.gameObjects = gameObjects;

    gameObjects.forEach(go => {
        if (!paused) {
            go.update();
        }
        go.draw(ctx);
    });

    requestAnimationFrame(gameLoop);
}
