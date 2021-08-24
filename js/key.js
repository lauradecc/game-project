class Key {
    constructor(ctx, index, width, height){ //canvasSize????
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.width = width;
        this.height = height;
    }

    // Hay que poner que pueda caminar por 6 y que 6 sea blanco o algo similar, mientras no haya tocado la puerta
    draw() {
        this.ctx.fillStyle= "orange";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    checkPlayerCollision() {
        return game.player.i === this.i
    }

    // When player touches key, key disappears
    playerTakesKey() {
        if (game.player.hasTouchedDoor && this.checkPlayerCollision()) {
            game.player.hasKey = true;
            game.map[this.i] = 1;
        }
    }



}
