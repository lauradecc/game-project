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

    // game.player? player como parámetro?
    // el número -50 es para la posición de ahora, pero para la puerta en la posición final debe ser +1
    // si queremos que aparezca la llave al tocar la puerta por los lados, también + 50 -50, diagonal?

    isCollision(bool) {
        if (bool) {
            if (game.player.hasKey === false) {
                this.showKey();
            } else {
                this.goNextLevel();
            }
        }
    }

    showKey() {
        // 438 real, 102 prueba
        game.map[this.keyIndex] = 6;
        game.player.hasTouchedDoor = true;
    }

    goNextLevel() {
        //esto de current level lo dejamos??? funciona???
        game.currentLevel++;
        game.changeLevel(level2);
    }

}
