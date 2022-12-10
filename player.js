class Player {
    constructor(canvasConstraints) {
        this.canvasConstraints = canvasConstraints;
        this.radius = 10;
        this.position = {
            x: canvasConstraints.width / 2,
            y: canvasConstraints.height - this.radius - 5
        }
    }

    update() { }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Gun {
    constructor(canvasConstraints, position) {
        this.canvasConstraints = canvasConstraints;
        this.position = position;
        this.direction = 0;
        this.stroke = 5;
        this.length = 100;
        this.target = { x: canvasConstraints.width / 2 + 125, y: canvasConstraints.height / 2 - 30 };
        this.targetDir = 1;
        this.aim = { x: 0, y: 0 }
    }

    update() {
        // move target
        if (this.target.x >= this.canvasConstraints.width || this.target.x <= 0)
            this.targetDir *= -1;

        this.target.x += 5 * this.targetDir;

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