class Key {
    constructor(ctx, x, y, width, height){ //canvasSize????
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.initialPosition = {x: x, y: y};
        this.width = width;
        this.height = height;
        this.visibility = false;

    }

    draw() {
        this.ctx.fillStyle= "orange";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    show() {
        if (this.visibility) {
            this.draw();
        }
    }
    

    // When player touches key, key disappears
    playerCollision() {
        if (player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.height + player.y > this.y) {
                if (player.hasTouchedDoor) {
                    key.visibility = false;
                    player.hasKey = true;
                }
        }
    }



}
