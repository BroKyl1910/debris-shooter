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


var gameContext = {
    delta: 0,
    gameObjects: [],
    difficulty: 1,
    special: {
        isExplosive: false
    }
};

let player = new Player(canvasConstraints);
let gun = new Gun(canvasConstraints, player.position, gameContext);

let gameObjects = [
    gun,
    player
];



let createDebris = () => {
    for (let i = 0; i < (Math.random() * 2) + 3; i++) {
        const debris = new Debris(canvasConstraints);
        gameObjects.unshift(debris);
    }
}


var paused = false;
let lastElapsed = 0;
let totalGameTime = 0;

let calculateDifficulty = (delta) => {
    if (!paused) {
        totalGameTime += delta / 100;
        console.log('total time: ' + totalGameTime);
        let difficulty = Math.ceil(Math.floor(totalGameTime) / 7);
        console.log('difficulty: ' + difficulty);
        gameContext.difficulty = difficulty;
    }
}

createDebris();
requestAnimationFrame(gameLoop);

document.onkeydown = e => {
    switch (e.code) {
        case "KeyE":
            gameContext.special.isExplosive = !gameContext.special.isExplosive;
            break;
        default:
            paused = !paused;
            break;
    }
}

function gameLoop(elapsed) {
    let delta = (elapsed - lastElapsed) / 10;
    lastElapsed = elapsed;
    
    gameContext.delta = delta;
    gameContext.gameObjects = gameObjects;

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

    calculateDifficulty(delta);


    gameObjects.forEach(go => {
        if (!paused) {
            go.update();
        }
        go.draw(ctx);
    });

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("E to toggle explosive rounds", 10, canvas.height - 30);

    requestAnimationFrame(gameLoop);
}
