class Key {
    constructor(ctx, index, width, height) {
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.width = width;
        this.height = height;
    }
    
    checkPlayerCollision() {
        return game.player.i === this.i
    }

    playerTakesKey() {
        if (game.player.hasTouchedDoor && this.checkPlayerCollision()) {
            game.player.hasKey = true;
        }
    }

    // When player touches key, key disappears
    clear() {
        game.map[this.i] = 1;
    }



}
