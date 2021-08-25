const game = {
    canvas: null,
    ctx: null,
    canvasSize: {h: null, w: null},
    background: null,
    squareSize: 20,

    timeInterval: 30,
    currentFrame: 0,
    ghostTime: 2,

    verticalGhostsArr: [],
    horizontalGhostsArr: [],
    allGhostsArr: [],
    livesArr: [],
    floorArr: [],

    floorImg: new Image(),
    heartImg: new Image(),
    keyImg: new Image(),
    doorImg: new Image(),

    map: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,3,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,7,1,1,0,4,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,
           0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,1,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,
           0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,3,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,7,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,4,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,
           0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,0,
           0,1,1,1,3,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,7,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    init(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        //// Medidias fijas o en función de la pantalla?
        this.canvasSize = {h: 600, w: 1000};
        this.setImage(this.floorImg, 'floor.png', 4)
        this.staticRandomFloor()
        this.drawGame()
        this.createAll()
        this.concatGhosts()
        this.start();
    },
    
    start() {
        setInterval(() => {
            this.currentFrame++
            this.clearAll()
            this.updateObjects()
            this.drawGame() 
            this.drawAll()
            this.currentFrame === this.ghostTime ? this.moveAll() : null
            this.currentFrame %= this.ghostTime;
            this.checkAllCollisions()
            // this.drawText()
        }, 1000 / this.timeInterval);
    },

    // Create images
    setImage(keyName, imageName, frames) {
        keyName.pathImage = `img/${imageName}`
        keyName.src = keyName.pathImage
        keyName.frames = frames
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
                this.drawWall()
            } 
            if (number !== 0) {
                this.drawFloor(index)
            }
            if (number === 5) {
                this.drawDoor();
            }
            if (number === 6) {
                this.drawKey();
            }
            if (number === 7) {
                this.drawHearts();
            }
        });
    },

    drawWall() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(this.x, this.y, this.squareSize, this.squareSize);
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

    drawKey() {
        this.ctx.drawImage(this.keyImg, this.x, this.y, this.squareSize, this.squareSize);
        this.setImage(this.keyImg, 'key.png', 1);
    },

    drawHearts() {
        this.ctx.drawImage(this.heartImg, this.x + 2.5, this.y + 2.5, 
        this.squareSize * 0.75, this.squareSize * 0.75);
        this.setImage(this.heartImg, 'heart.png', 1);
    },

    /*
    drawText() {
        this.ctx.font = '30px serif';
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText(`Lives: ${player.lives}`, 450, 35)
    },
    */

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createAll() {
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
                this.createDoor(index);
            }
            if (number === 7) {
                this.createHearts(index);
            }
        });
    },

    createPlayer(index) {
        this.player = new Player(this.ctx, index, 'player.png', 4, this.squareSize, this.squareSize)
    },

    // createGhosts(index) {
    //     this.createVerticalGhosts(index);
    //     this.createHorizontalGhosts(index);
    // },

    createVerticalGhosts(index) {
        this.verticalGhostsArr.push(new Ghost(this.ctx, index, 'vertical', 
        'skeleton.png', 3, 50, this.squareSize * 2, this.squareSize * 2));
    },

    createHorizontalGhosts(index) {
        this.horizontalGhostsArr.push(new Ghost(this.ctx, index, 'horizontal', 
        'skeleton.png', 3, 1, this.squareSize * 2, this.squareSize * 2));
    },

    createDoor(index) {
        this.door = new Door(this.ctx, index, 20, 20)
    },

    createHearts(index) {
        this.livesArr.push(new Heart(this.ctx, index, 20, 20));
    },

    updateObjects() {
        this.map.forEach((number, index) => {
            if (number === 6 && this.key === undefined) {
                // Create key
                this.key = new Key(this.ctx, index, 20, 20);
            } else if (this.key) {
                this.key.playerTakesKey();
            } 
        });
        this.clearObjects();
    }, 

    //Esto debería ir en drawGame, pero lo tenemos desvinculado?
    drawAll() {
        this.player.draw();
        this.verticalGhostsArr.forEach(ghost => {
            ghost.draw(ghost.image.frameIndexVertical);
        });
        this.horizontalGhostsArr.forEach(ghost => {
            ghost.draw(ghost.image.frameIndexHorizontal);
        });
    },
    
    moveAll() {
        this.verticalGhostsArr.forEach(ghost => {
            ghost.move();
        });
        this.horizontalGhostsArr.forEach(ghost => {
            ghost.move();
        });
    },

    clearObjects() {
        this.livesArr = this.livesArr.filter(heart => heart.toDelete === false)
        this.key !== undefined && this.player.hasKey ? this.key.clear() : null;
    },

    checkAllCollisions() {
        this.verticalGhostsArr.forEach(ghost => {
            ghost.checkCollision();
        });
        this.checkPlayerGhostCollisions()
        this.door.checkPlayerCollision()
        this.livesArr.forEach(heart => {
            if(heart.checkPlayerCollision()) {
                heart.addOneLife()
            }
        })
        if (this.key !== undefined) this.key.checkPlayerCollision()
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
