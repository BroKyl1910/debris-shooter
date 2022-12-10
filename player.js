class Player {
    constructor() {
        this.radius = 10;
        this.position = {
            x: window.innerWidth / 2,
            y: window.innerHeight - this.radius - 5
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Barrel {
    constructor() {
        this.position = { x: 0, y: 0 }
        this.direction = 0;
    }
}