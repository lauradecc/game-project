class Door {
    
    constructor(ctx, index, width, height, keyIndex) {
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.width = width;
        this.height = height;
        this.keyIndex = keyIndex;
    }

    isCollision(bool) {
        if (bool) game.player.hasKey === false ? this.showKey() : this.goNextLevel()
    }

    showKey() {
        game.map[this.keyIndex] = 6;
        game.player.hasTouchedDoor = true;
    }

    goNextLevel() {
        // 3 is the last level
        if (game.currentLevel !== 3) {
            game.currentLevel++;
            game.changeLevel(game.levels[game.currentLevel], game.keyIndex[game.currentLevel]);
        }
    }

}
