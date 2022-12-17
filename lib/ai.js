class AI{
    constructor() {
        this.gameObjectType = "ai";
        this.gun = gameContext.gameObjects.filter(go => go.gameObjectType == "gun")[0];
    }

    update(){
        let debris = gameContext.gameObjects.filter(go => go.gameObjectType == "debris")[0];
        this.gun.moveTarget(debris.position.x + debris.sideLength * 0.5, debris.position.y + debris.sideLength);
        this.gun.fireProjectile();
    }

    draw(ctx){

    }
}