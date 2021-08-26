const game = {
    canvas: null,
    ctx: null,
    canvasSize: {h: null, w: null},
    background: null,
    squareSize: 20,

    timeInterval: 30,
    currentFrame: 0,
    ghostTime: 3,

    verticalGhostsArr: [],
    horizontalGhostsArr: [],
    allGhostsArr: [],
    livesArr: [],
    floorArr: [],
    
    currentLevel: 1,

    wallImg: new Image(),
    floorImg: new Image(),
    heartImg: new Image(),
    keyImg: new Image(),
    doorImg: new Image(),

    map: [],

    init(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        //// Medidias fijas o en función de la pantalla?
        this.canvasSize = {h: 700, w: 1000};
        this.canvas.setAttribute("width", this.canvasSize.w)
        this.canvas.setAttribute("height", this.canvasSize.h)
        this.changeLevel(level1)
        this.setImage(this.floorImg, 'floor.png', 4)
        this.setImage(this.wallImg, 'wall.png', 1)
        this.staticRandomFloor()
        this.createAll(102)
        this.drawGame()
        this.drawPlayer()
        this.concatGhosts()
        this.start();
    },
    
    start() {
        setInterval(() => {
            this.currentFrame++
            this.clearAll()
            this.updateObjects()
            this.currentFrame === this.ghostTime ? this.moveAll() : null
            this.currentFrame %= this.ghostTime;
            this.checkAllCollisions()
            this.drawGame() 
            this.drawPlayer()
            this.drawBox()
        }, 1000 / this.timeInterval);
    },

    // Create images
    setImage(keyName, imageName, frames) {
        keyName.pathImage = `img/${imageName}`
        keyName.src = keyName.pathImage
        keyName.frames = frames
    },

    // Cómo hacemos para que argumento level sea levelX ???
    changeLevel(level) {
        this.verticalGhostsArr = [];
        this.horizontalGhostsArr = [];
        this.allGhostsArr = [];
        this.clearAll();
        this.key = undefined;
        this.map = level.map;
        this.createAll(110);
        this.concatGhosts();
    },

    // Create random floor
    staticRandomFloor(frames = 4) {
        this.map.forEach((number) => {
            if (number === 1) {
                this.floorArr.push((this.floorImg.width / frames) * Math.floor(Math.random() * 4));
            } else {
                this.floorArr.push('');
            }
        });
    },

    drawGame() {
        this.map.forEach((number, index) => { 

            this.x = (index % 50) * 20;
            this.y = Math.floor(index / 50) * 20; 

            if (number === 0) {
                this.drawWall();
            } 
            if (number !== 0) {
                this.drawFloor(index);
            }
            if (number === 5) {
                this.drawDoor();
            }
            if (number === 6) {
                this.drawKey(this.x, this.y);
            }
            if (number === 7) {
                this.drawHearts(this.x + 2.5, this.y + 2.5);
            }
            // Nos rompe el juego.
            // if (number === 2) {
            //     this.player.draw();
            // }
            if (number === 3) {
                this.drawVerticalGhosts();
            }
            if (number === 4) {
                this.drawHorizontalGhosts();
            }
            if (number === 9) {
                this.drawBoxBackground();
            } 
        });
    },

    drawPlayer() {
        this.player.draw();
    },

    drawVerticalGhosts() {
        this.verticalGhostsArr.forEach(ghost => {
            ghost.draw(ghost.image.frameIndexVertical);
        });
    },

    drawHorizontalGhosts() {
        this.horizontalGhostsArr.forEach(ghost => {
            ghost.draw(ghost.image.frameIndexHorizontal);
        });
    },

    drawBoxBackground() {
        this.ctx.fillStyle = '#585147';
        this.ctx.fillRect(this.x, this.y, this.squareSize, this.squareSize);
    },

    drawWall() {
        this.ctx.drawImage(
            this.wallImg,
            this.x,
            this.y,
            this.squareSize,
            this.squareSize,                    
        );
    },

    drawFloor(index, frames = 4) {
        this.ctx.drawImage(
            this.floorImg,
            this.floorArr[index],
            0,
            Math.floor(this.floorImg.width / frames),
            this.floorImg.height,
            this.x,
            this.y,
            this.squareSize,
            this.squareSize,                    
        );
    },

    drawDoor() {
        this.ctx.drawImage(this.doorImg, 0, 0, this.doorImg.width, this.doorImg.height / 2, 
        this.x, this.y, this.squareSize, this.squareSize);
        this.setImage(this.doorImg, 'door.png', 2);
    },

    drawKey(x, y) {
        this.ctx.drawImage(this.keyImg, x, y, this.squareSize, this.squareSize);
        this.setImage(this.keyImg, 'key.png', 1);
    },

    drawHearts(x, y) {
        this.ctx.drawImage(this.heartImg, x, y, 
        this.squareSize * 0.75, this.squareSize * 0.75);
        this.setImage(this.heartImg, 'heart.png', 1);
    },

    drawBox() {
        this.drawText();
        this.drawLives();
        this.player.hasKey ? this.drawKey(670, 631) : null;
    },

    drawText() {
        this.ctx.font = '20px "Press Start 2P"';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Lives:', 70, 650);
        this.ctx.fillText('Objects:', 500, 650);
    },

    drawLives() {
        let x = 200;
        for (let i = 0; i < this.player.lives; i++) {
            this.drawHearts(x, 631);
            x += 30;
        }
    },
    
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createAll(keyIndex) {
        this.map.forEach((number, index) => {
            if (number === 2) {
                this.createPlayer(index);
            }
            if (number === 3) {
                this.createVerticalGhosts(index);
            }
            if (number === 4) {
                this.createHorizontalGhosts(index);
            }
            if (number === 5) {
                this.createDoor(index, keyIndex);
            }
            if (number === 7) {
                this.createHearts(index);
            }
        });
    },

    createPlayer(index) {
        this.player = new Player(this.ctx, index, 'player.png', 4, this.squareSize, this.squareSize)
    },

    createVerticalGhosts(index) {
        this.verticalGhostsArr.push(new Ghost(this.ctx, index, 'vertical', 
        'skeleton.png', 3, 50, this.squareSize * 2, this.squareSize * 2));
    },

    createHorizontalGhosts(index) {
        this.horizontalGhostsArr.push(new Ghost(this.ctx, index, 'horizontal', 
        'skeleton.png', 3, 1, this.squareSize * 2, this.squareSize * 2));
    },

    createDoor(index, keyIndex) {
        this.door = new Door(this.ctx, index, 20, 20, keyIndex)
    },

    createHearts(index) {
        this.livesArr.push(new Heart(this.ctx, index, 20, 20));
    },

    updateObjects() {
        this.map.forEach((number, index) => {
            if (number === 6 && this.key === undefined) {
                // Create key
                this.key = new Key(this.ctx, index, 20, 20);
            }
            // } else if (this.key) {
            //     this.key.playerTakesKey();
            // } 
        });
        this.clearObjects();
    }, 

    moveAll() {
        this.verticalGhostsArr.forEach(ghost => ghost.move());
        this.horizontalGhostsArr.forEach(ghost => ghost.move());
    },

    clearObjects() {
        this.livesArr = this.livesArr.filter(heart => heart.toDelete === false)
        this.key !== undefined && this.player.hasKey ? this.key.clear() : null;
    },

    /* Si queremos que haya colisión de otra forma que no se de abajo a arriba, modificar el 50
    y poner más números o lo que sea */
    checkAdjacentCollision(object) {
        return game.player.i - 50 === object.i;
    },

    // Direct collision
    checkPlayerCollision(object) {
        return game.player.i === object.i;
    },

    checkAllCollisions() {
        this.verticalGhostsArr.forEach(ghost => ghost.checkCollision());
        this.checkPlayerGhostCollisions()
        this.door.isCollision(this.checkAdjacentCollision(this.door))
        this.livesArr.forEach(heart => heart.isCollision(this.checkPlayerCollision(heart)));
        if (this.key !== undefined) {
            this.key.isCollision(this.checkPlayerCollision(this.key))
        }
    },

    concatGhosts() {
        this.allGhostsArr = this.allGhostsArr.concat(this.verticalGhostsArr, this.horizontalGhostsArr);
    },

    checkPlayerGhostCollisions() {
        this.allGhostsArr.forEach(ghost => {
            if (this.player.i === ghost.i) {
                this.player.i = this.player.initialIndex;
                this.player.x = this.player.initialPosition.x;
                this.player.y = this.player.initialPosition.y;
                this.player.lives--;
                if (this.player.lives === 0) {
                    alert('GAME OVER');
                    this.player.lives = 3;
                }
            }
        });
    }

}
