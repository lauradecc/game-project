class Ghost {
    constructor(ctx, x, y, width, height){ //canvasSize????
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // Metemos valocidad como parámetro para distintos niveles?
        this.speed = 10;
    }

    draw() {
        this.ctx.fillStyle= "blue"
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    move() {
        // Fantasma no puede empezar más a la derecha de 920 porque se va
        // hay que corregir algo aquí? 
        this.x += this.speed;
    }

    // 50 es el tamaño de la clase cuadrado, cómo ponerlo sin número?
    // Los demás números son posiciones del mapa
    checkCollision() {
        if (this.x == 50) {
            this.speed *= -1;
            //console.log('fantasmita pa la derecha')
        }
        if (this.x + this.width == game.canvasSize.w - 50) {
            this.speed *= -1;
        }
        /*
        if (this.x >= 50 && this.x + this.width < game.canvasSize.w - 50) {
            if (this.x + this.width < game.canvasSize.w - 50) {
                this.x += this.speed;
                //console.log('fantasmita pa la derecha')
            }
        } else if (this.x + this.width <= game.canvasSize.w - 50) {
            if (this.x >= 50) {
                this.x -= this.speed;
                //console.log('fantasmita pa la izquierda')
            }
        }*/
    }

    // Esto siguiente son colisiones únicamente con bordes externos
    /*
    // Outer edges collisions (top, bottom, left, right)
    moveUp() {
        if (this.y > 50) {
            this.y -= this.speed;
        }
    }

    moveDown() {
        if (this.y + this.width < game.canvasSize.h - 50) {
            this.y += this.speed;
        }
    }

    moveLeft() {
        if (this.x > 50) {
            this.x -= this.speed;
        }
    }

    moveRight() {
        if (this.x + this.width < game.canvasSize.w - 50) {
            this.x += this.speed;
        }
    }
    */
}