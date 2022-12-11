class Projectile {
    constructor(canvasConstraints, angle) {
        this.gameObjectType = "projectile";
        this.canvasConstraints = canvasConstraints;
        this.sideLength = 10;
        this.player = gameContext.gameObjects.filter(go => go.gameObjectType == "player")[0];
        this.gun = gameContext.gameObjects.filter(go => go.gameObjectType == "gun")[0];
        this.position = {
            x: this.gun.aim.x - this.sideLength / 2,
            y: this.gun.aim.y - this.sideLength / 2
        }
        this.speed = 25;
        this.angle = angle;
        // this vector is used to determine how to update the position of the projectile
        // based on the angle it was fired at
        this.updateVector = this.calculateUpdateVector()
        this.onScreen = true;
    }

    roundTo(num, places) {
        var exp = Math.pow(10, places);
        var multipliedValue = num * exp;
        var rounded = Math.ceil(multipliedValue);
        return rounded / exp;
    }

    calculateUpdateVector() {
        let x;
        let y;

        let correctedAngleX = this.angle + 0.5 * Math.PI;
        let correctedAngleY = this.angle - 0.5 * Math.PI;
        if (correctedAngleX > 3.08) correctedAngleX = 3.08;
        if (this.position.x > this.player.position.x) {
            x = Math.sin(correctedAngleX) * this.speed;
            y = -Math.cos(correctedAngleY) * this.speed;
        } else if (this.position.x < this.player.position.x) {
            x = -Math.sin(correctedAngleX) * this.speed;
            y = Math.cos(correctedAngleY) * this.speed;
        }

        if(y > 0) y*=-1;
        return { x, y };

    }

    shoot() {
        this.position.x += this.updateVector.x;
        this.position.y += this.updateVector.y;

        if (this.position.x < 0 || this.position.x > this.canvasConstraints.width
            || this.position.y < 0 || this.position.y > this.canvasConstraints.height) {
            var index = gameContext.gameObjects.indexOf(this);
            gameContext.gameObjects.splice(index, 1);

        }
    }

    update() {
        this.shoot();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, this.sideLength, this.sideLength);
        ctx.fill();
    }
}