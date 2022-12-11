class Debris {
    constructor(canvasConstraints) {
        this.gameObjectType = "debris";
        this.canvasConstraints = canvasConstraints;
        this.sideLength = 30;
        this.position = {
            x: Math.random() * (canvasConstraints.width - this.sideLength),
            y: -this.sideLength
        }
        this.fallSpeed = (Math.random() * 0.6 + 0.4) * 3;
    }

    update() {
        this.position.y += this.fallSpeed * gameContext.delta;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, this.sideLength, this.sideLength);
        ctx.fill();
    }
}