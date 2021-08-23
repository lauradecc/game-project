class Ghost {
    constructor(ctx, index, direction, speed, width, height){ //canvasSize????
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.width = width;
        this.height = height;
        // Metemos valocidad como parámetro para distintos niveles?
        this.speed = speed;
        this.direction = direction;
    }

    draw() {
        this.ctx.fillStyle= "blue"
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    move() {
        
        if (this.direction === 'vertical') {
            if (this.checkCollision()) {  
                this.speed *= -1;
            }
            this.updatePosition(3);
        }

        if (this.direction === 'horizontal') {
            if (this.checkCollision()) {  
                this.speed *= -1;
            }
            this.updatePosition(4);
        }
    }

    checkCollision() {
        if (game.map[this.i + this.speed] === 0) {
            return true;
        }
    }

    updatePosition(number) {
        game.map[this.i] = 1;
        game.map[this.i + this.speed] = number;
        this.i += this.speed; 
        this.x = (this.i % 50) * game.squareSize;
        this.y = Math.floor((this.i) / 50) * game.squareSize;
    }

}
