class Player {
    constructor(canvasConstraints) {
        this.gameObjectType = "player";
        this.canvasConstraints = canvasConstraints;
        this.radius = 10;
        this.position = {
            x: canvasConstraints.width / 2,
            y: canvasConstraints.height - this.radius - 5
        }
    }

    update(delta) { }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Gun {
    constructor(canvasConstraints, position) {
        this.gameObjectType = "gun";
        this.canvasConstraints = canvasConstraints;
        this.position = position;
        this.direction = 0;
        this.stroke = 5;
        this.length = 100;
        this.target = { x: canvasConstraints.width / 2 + 125, y: canvasConstraints.height / 2 - 30 };
        this.targetDir = 1;
        this.aim = { x: 0, y: 0 }

        document.onmousemove = e => {
            this.moveTarget(e.clientX, e.clientY);
        };
    }

    moveTarget(x, y) {
        this.target.x = x;
        this.target.y = y;
    }

    update(delta) {
        let dif = {
            x: this.target.x - player.position.x,
            y: this.target.y - player.position.y
        }
        let angleRad = Math.atan(-dif.y / dif.x);

        if (this.target.x > this.position.x) {
            this.aim.y = this.position.y + this.length * Math.sin(angleRad) * -1;
            this.aim.x = this.position.x + this.length * Math.cos(angleRad);
        } else if (this.target.x < this.position.x) {
            this.aim.y = this.position.y + this.length * Math.sin(angleRad);
            this.aim.x = this.position.x + this.length * Math.cos(angleRad) * -1;
        }
        else {
            this.aim.y = this.position.y + this.length * Math.sin(angleRad) * -1;
            this.aim.x = this.position.x + this.length * Math.cos(angleRad);
        }

    }

    draw(ctx) {
        // draw target
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.target.x, this.target.y, 5, 0, 2 * Math.PI);
        ctx.fill();


        // draw aim
        ctx.beginPath();
        ctx.moveTo(player.position.x, player.position.y);
        ctx.lineTo(this.aim.x, this.aim.y);
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 10;
        ctx.stroke();
    }
}

class Debris {
    constructor(canvasConstraints) {
        this.gameObjectType = "debris";
        this.canvasConstraints = canvasConstraints;
        this.sideLength = 30;
        this.position = {
            x: Math.random() * (canvasConstraints.width - this.sideLength),
            y: 0
        }
        this.fallSpeed = (Math.random() * 0.6 + 0.4) * 3;
    }

    update(delta) {
        this.position.y += this.fallSpeed * delta;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x, this.position.y, this.sideLength, this.sideLength);
        ctx.fill();
    }
}