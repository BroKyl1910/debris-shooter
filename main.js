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

ctx.fillStyle = "rgb(51,51,51)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let player = new Player();
let barrel = new Barrel();
let displayObjects = [
    player
];

displayObjects.forEach(displayObject => {
    displayObject.draw(ctx);
});

// barrel
const barrelStroke = 5;
const barrelLength = 250;
const target = { x: canvasConstraints.width / 2 + 125, y: canvasConstraints.height / 2 - 30};
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(target.x, target.y, 5, 0, 2 * Math.PI);
ctx.fill();

// assume target is to the right of player
let dif = {
    x: target.x - player.position.x,
    y: target.y - player.position.y
}
let angleRad = Math.atan(-dif.y / dif.x);

let barrelEnd = { x: 0, y: 0 };
if (target.x > player.position.x) {
    barrelEnd.y = player.position.y + barrelLength * Math.sin(angleRad) * -1;
    barrelEnd.x = player.position.x + barrelLength * Math.cos(angleRad);
} else if(target.x < player.position.x){
    barrelEnd.y = player.position.y + barrelLength * Math.sin(angleRad);
    barrelEnd.x = player.position.x + barrelLength * Math.cos(angleRad) * -1;
}
else {
    barrelEnd.y = player.position.y + barrelLength * Math.sin(angleRad) * -1;
    barrelEnd.x = player.position.x + barrelLength * Math.cos(angleRad);
}


ctx.fillStyle = "white";
ctx.beginPath();
ctx.moveTo(player.position.x, player.position.y);
ctx.lineTo(barrelEnd.x, barrelEnd.y);
ctx.stroke();