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

for (let i = 0; i < Math.random() * 10; i++) {
    const debris = new Debris(canvasConstraints);
    gameObjects.push(debris);
}


requestAnimationFrame(gameLoop);

let lastElapsed = 0;
function gameLoop(elapsed) {
    let delta = (elapsed - lastElapsed) / 10;
    lastElapsed = elapsed;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "rgb(51,51,51)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameObjects.filter(go => go.gameObjectType=='debris').forEach(d => {
        if(d.position.y > canvasConstraints.height){
            gameObjects.splice(gameObjects.indexOf(d), 1);
            gameObjects.push(new Debris(canvasConstraints));
        }
    });

    gameObjects.forEach(go => {
        go.update(delta);
        go.draw(ctx);
    });

    requestAnimationFrame(gameLoop);
}
