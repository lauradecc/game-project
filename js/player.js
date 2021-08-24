class Player {
    constructor(ctx, index, width, height){ //canvasSize????
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.initialIndex = this.i;
        this.initialPosition = {x: this.x, y: this.y};
        this.width = width;
        this.height = height;
        this.keys = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight'
        };
        //this.speed = 10;
        this.lives = 3;
        this.hasKey = false;
        this.hasTouchedDoor = false;

    }

    /* En init meter new image, cosas de frames y set listener
    (esto último para quitarlo de init game) */
    // init() {}

    //Si creamos más tipos de enemigos, revisar el método .some()
    checkGhostsCollisions() {
        game.ghostsArray.forEach(ghost => {
            if (ghost.x < this.x + this.width &&
                ghost.x + ghost.width > this.x &&
                ghost.y < this.y + this.height &&
                ghost.height + ghost.y > this.y) {
                    this.lives--;
                    this.x = this.initialPosition.x;
                    this.y = this.initialPosition.y;
                    if (this.lives === 0) {
                        // Gestión de GAME OVER !!!!!!
                        // Se acaba antes de que le toque?
                        alert("GAME OVER")
                        this.lives = 3;
                    }
                    console.log(this.lives)
            }
        });
    }

    draw() {
        this.ctx.fillStyle= "red"
        this.x = (this.i % 50) * game.squareSize;
        this.y = Math.floor(this.i / 50) * game.squareSize;
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    setListener() {
        document.onkeydown = e => {
            
            switch (e.key) {
                case this.keys.up:
                    this.moveUp();
                    break;
                case this.keys.down:
                    this.moveDown();
                    break;
                case this.keys.left:
                    this.moveLeft();
                    break;
                case this.keys.right:
                    this.moveRight();
                    break;
            }
        }
    }

    willBeCollision(desiredPositionIndex) {
        return !(game.map[desiredPositionIndex] === 1 
                || game.map[desiredPositionIndex] === 6
                || game.map[desiredPositionIndex] === 7);

    }

    updatePosition(desiredPositionIndex) {
        game.map[this.i] = 1;
        this.i = desiredPositionIndex;
        game.map[desiredPositionIndex] = 2;
    }

    moveUp() {
        const desiredPositionIndex = this.i - 50;
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

    moveDown() {
        const desiredPositionIndex = this.i + 50;
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

    moveLeft() {
        const desiredPositionIndex = this.i - 1;
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

    moveRight() {
        const desiredPositionIndex = this.i + 1;
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

}
