class Debris {
    constructor(canvasConstraints) {
        this.gameObjectType = "debris";
        this.canvasConstraints = canvasConstraints;
        this.sideLength = 30;
        this.position = {
            x: Math.random() * (canvasConstraints.width - this.sideLength),
            y: -this.sideLength
        }
        this.fallSpeed = this.calculateFallSpeed();
    }

    calculateFallSpeed(){
        let min = 0;
        let max = 0;
        
        if(gameContext.difficulty <= 3){
            min = 0.5;
            max = 1;
        } else if(gameContext.difficulty <= 5){
            min = 1;
            max = 1.5;
        } else if(gameContext.difficulty <= 8){
            min = 1.5;
            max = 2;
        } else{
            min = 2.5;
            max = 3;
        }
        return (Math.random() * (max - min)) + min;
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