class Player {
    constructor(canvasConstraints) {
        this.gameObjectType = "player";
        this.canvasConstraints = canvasConstraints;
        this.radius = 10;
        this.position = {
            x: canvasConstraints.width / 2,
            y: canvasConstraints.height - this.radius - 5
        }
        // this.isExplosive = gameContext.special.isExplosive; 
    }

    update() { }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = gameContext.special.isExplosive ? "orange" : "white";
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}