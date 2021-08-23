class Player {
    constructor(ctx, x, y, width, height){ //canvasSize????
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.initialPosition = {x: x, y: y};
        this.width = width;
        this.height = height;
        this.keys = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight'
        };
        this.speed = 10;
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

    moveUp() {

    }

    moveDown() {
        
    }

    moveLeft() {
        
    }

    moveRight() {
        
    }

    /*
    // En las siguientes funciones, 50 es el tamaño de la clase cuadrado, cómo ponerlo sin número?
    // Los demás números son posiciones del mapa

    // All walls collisions
    moveUp(borderTop) {

        if (this.y > 50) {
            if (this.x <= 150 - this.width 
                || this.x >= 200 && this.x <= 450 - this.width 
                || this.x >= 500 && this.x <= 750 - this.width 
                || this.x >= 800) {
                    this.y -= this.speed;
            }
        }

        if (this.y > 450) {
            if (this.x >= 150 - this.width && this.x <= 200
                || this.x >= 450 - this.width && this.x <= 500
                || this.x >= 750 - this.width && this.x <= 800) {
                    this.y -= this.speed;
            }
        }
    }

    moveDown() {
       
        if (this.y + this.height < game.canvasSize.h - 50) {
            if (this.x <= 300 - this.width
                || this.x >= 350 && this.x <= 600 - this.width
                || this.x >= 650) {
                    this.y += this.speed;
            }
        }

        if (this.y + this.height < 150) {
            if (this.x + this.width >= 300 && this.x <= 350
                || this.x + this.width >= 600 && this.x <= 650) {
                    this.y += this.speed;
            }
        }
    }

    moveLeft() {
      
       if (this.y + this.height <= 150) {
           if (this.x > 50 && this.x + this.width <= 150
            || this.x > 200 && this.x + this.width <= 450
            || this.x > 500 && this.x + this.width <= 750
            || this.x > 800) {
                this.x -= this.speed;
            } 
        }

       if (this.y + this.height >= 150 && this.y <= 450) {
           if (this.x > 50 && this.x + this.width <= 150
            || this.x > 200 && this.x + this.width <= 300
            || this.x > 350 && this.x + this.width <= 450
            || this.x > 500 && this.x + this.width <= 600
            || this.x > 650 && this.x + this.width <= 750
            || this.x > 800) {
                this.x -= this.speed;
            }
        }
        
       if (this.y >= 450) {
           if (this.x > 50 && this.x + this.width <= 300
            || this.x > 350 && this.x + this.width <= 600
            || this.x > 650) {
                this.x -= this.speed;
            }
        }
    }
       
    moveRight() {
       
       if (this.y + this.height <= 150) {
           if (this.x >= 50 && this.x + this.width < 150
            || this.x >= 200 && this.x + this.width < 450
            || this.x >= 500 && this.x + this.width < 750
            || this.x >= 800 && this.x + this.width < 950) {
                this.x += this.speed;
            }
        }

        if (this.y + this.height >= 150 && this.y <= 450) {
            if (this.x >= 50 && this.x + this.width < 150
                || this.x >= 200 && this.x + this.width < 300
                || this.x >= 350 && this.x + this.width < 450
                || this.x >= 500 && this.x + this.width < 600
                || this.x >= 650 && this.x + this.width < 750
                || this.x >= 800 && this.x + this.width < 950) {
                    this.x += this.speed;
            }
        }
    
        if (this.y >= 450) {
            if (this.x >= 50 && this.x + this.width < 300
                || this.x >= 350 && this.x + this.width < 600
                || this.x >= 650 && this.x + this.width < 950) {
                    this.x += this.speed;
            }
        }
    }
    */

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






    // Collision attempts with all squares

    left() {
        return this.x;
    }

    right() {
        return this.x + this.width;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.height;
    }
    
    checkSquaresCollisions() {
        if (this.x >= 920) {

            this.x = 920
            
        }


    }

        /*
        game.map.forEach(square => {
            //console.log(square)
            if (this.x > 950 && this.y <= 600) {
                console.log('toco!!') 
         */                
                /*&&
                (this.bottom() == square.top()) {
                console.log('toco!!')                
                this.top() > square.bottom() &&
                this.right() < square.left() &&
                this.left() > square.right()) {
                this.speed = 0;
                
            }
            
        });*/
    

        /*
        crashWith(obstacle) {
        return !(
          this.bottom() < obstacle.top() ||
          this.top() > obstacle.bottom() ||
          this.right() < obstacle.left() ||
          this.left() > obstacle.right()
        );
        */

        /*
        (this.x < square.x + square.width &&
        this.x + this.width > square.width &&
        this.y < square.width + square.height &&
        this.y + this.height > square.y) {


        (square.x < this.x + this.width &&
        square.x + square.width > this.width &&
        square.y < this.width + this.height &&
        square.y + square.height > this.y) {
        */

}
