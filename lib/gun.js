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
        this.aimAngle = 0;

        document.onmousemove = e => {
            this.moveTarget(e.clientX, e.clientY);
        };

        document.onmousedown = () => this.fireProjectile();
    }

    fireProjectile() {
        let projectile = new Projectile(this.canvasConstraints, this.aimAngle);
        gameContext.gameObjects.push(projectile);
    }

    moveTarget(x, y) {
        this.target.x = x;
        this.target.y = y;
    }

    update() {
        let dif = {
            x: this.target.x - player.position.x,
            y: this.target.y - player.position.y
        }
        this.aimAngle = Math.atan(-dif.y / dif.x);

        if (this.target.x > this.position.x) {
            this.aim.y = this.position.y + this.length * Math.sin(this.aimAngle) * -1;
            this.aim.x = this.position.x + this.length * Math.cos(this.aimAngle);
        } else if (this.target.x < this.position.x) {
            this.aim.y = this.position.y + this.length * Math.sin(this.aimAngle);
            this.aim.x = this.position.x + this.length * Math.cos(this.aimAngle) * -1;
        }
        else {
            this.aim.y = this.position.y + this.length * Math.sin(this.aimAngle) * -1;
            this.aim.x = this.position.x + this.length * Math.cos(this.aimAngle);
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