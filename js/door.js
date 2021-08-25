class Door {
    constructor(ctx, index, width, height) { //canvasSize????
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.width = width;
        this.height = height;
        // Width y height depende de los números en el array o de tamaño, imagen o what??
    }

    // Esto aquí o en game?? Si lo movemos a game, mirar bien 'this', etc.
    // When player touches door, key appears
    // game.player? player como parámetro?
    // el número -50 es para la posición de ahora, pero para la puerta en la posición final debe ser +1
    // si queremos que aparezca la llave al tocar la puerta por los lados, también + 50 -50, diagonal?
    checkPlayerCollision() {
        if (game.player.i - 50 === this.i) {
            if (game.player.hasKey === false) {
                game.map[438] = 6;
                game.player.hasTouchedDoor = true;
            } else {
                // Esto debe llevar al siguiente nivel
                // Revisar
                game.player.i = game.player.initialIndex;
                alert ("YOU WIN!");
            }
        }
    }
}
