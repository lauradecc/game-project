const game = {
    canvas: null,
    ctx: null,
    canvasSize: {h: null, w: null},
    background: null,
    squareSize: 20,

    timeInterval: 30,
    currentFrame: 0,
    ghostTime: 3,
    dogTime: 6,

    verticalGhostsArr: [],
    horizontalGhostsArr: [],
    allGhostsArr: [],
    livesArr: [],
    floorArr: [],
    
    currentLevel: 1,
    levels: ['', level1, level2, level3],
    keyIndex: ['', 102, 110, 115],

    wallImg: new Image(),
    floorImg: new Image(),
    heartImg: new Image(),
    keyImg: new Image(),
    doorImg: new Image(),
    dogImg: new Image(),
    gameOverImg: new Image(),
    brownWallImg: new Image(),

    map: [],

    init(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        //// Medidias fijas o en función de la pantalla?
        this.canvasSize = {h: 700, w: 1000};
        this.canvas.setAttribute("width", this.canvasSize.w)
        this.canvas.setAttribute("height", this.canvasSize.h)
        this.changeLevel(this.levels[this.currentLevel], this.keyIndex[this.currentLevel])
        this.setImage(this.floorImg, 'floor.png', 4)
        this.setImage(this.wallImg, 'wall.png', 1)
        this.setImage(this.brownWallImg, 'brown-wall.png', 1)

        this.floorImg.onload = () => {
            this.staticRandomFloor()
            // this.createAll(102)
            this.drawGame()
            this.drawPlayer()
            this.concatGhosts()
            this.start();
        }
    },
    
    start() {
        this.intervalID = setInterval(() => {
            this.currentFrame++
            this.clearAll()
            this.updateObjects()
            this.moveAll(this.currentFrame)
            this.currentFrame %= this.dogTime;
            this.checkAllCollisions()
            this.drawGame() 
            this.drawPlayer()
            this.drawBox()
        }, 1000 / this.timeInterval);
        
    },

    changeLevel(level, keyIndex) {
        this.verticalGhostsArr = [];
        this.horizontalGhostsArr = [];
        this.allGhostsArr = [];
        this.clearAll();
        this.key = undefined;
        this.map = level.map;
        this.createAll(keyIndex);
        this.concatGhosts();
    },


    // DRAW

    drawGame() {
        this.map.forEach((number, index) => { 

            this.x = (index % 50) * 20;
            this.y = Math.floor(index / 50) * 20; 

            number === 0 && this.drawWall();

            number !== 0 && this.drawFloor(index);

            number === '!' && this.drawBrownWall();

            number === 3 && this.drawVerticalGhosts();

            number === 4 && this.drawHorizontalGhosts();

            number === 5 && this.drawDoor();

            number === 6 && this.drawKey(this.x, this.y);

            number === 7 && this.drawHearts(this.x + 2.5, this.y + 2.5);

            number === 8 && this.drawDog();
            
            number === 9 && this.drawBoxBackground();

            /*
            if (number === 0) {
                this.drawWall();
            } 

            if (number !== 0) {
                this.drawFloor(index);
            }

            if (number === '!') {
                this.drawBrownWall();
            } 

            if (number === 3) {
                this.drawVerticalGhosts();
            }

            if (number === 4) {
                this.drawHorizontalGhosts();
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

            if (number === 8) {
                this.drawDog();
            }
            
            if (number === 9) {
                this.drawBoxBackground();
            } 
            */
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
        this.ctx.drawImage(this.wallImg, this.x, this.y, this.squareSize, this.squareSize);
    },

    drawBrownWall() {
        this.ctx.drawImage(this.brownWallImg, this.x, this.y, this.squareSize, this.squareSize);
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

    drawDog() {
        this.dog.draw(this.currentFrame);
    },

    drawBox() {
        this.drawText();
        this.drawLives();
        this.player.hasKey ? this.drawKey(640, 631) : null;
    },

    drawText() {
        this.ctx.font = '20px "Press Start 2P"';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Lives:', 70, 650);
        this.ctx.fillText('Objects:', 470, 650);
        this.ctx.fillText(`Level ${this.currentLevel}`, 780, 650);
    },

    drawLives() {
        let x = 200;
        for (let i = 0; i < this.player.lives; i++) {
            this.drawHearts(x, 631);
            x += 30;
        }
    },


    // CREATE   

    createAll(keyIndex) {

        this.map.forEach((number, index) => {

            number === 2 && this.createPlayer(index);

            number === 3 && this.createVerticalGhosts(index);

            number === 4 && this.createHorizontalGhosts(index);

            number === 5 && this.createDoor(index, keyIndex);

            number === 7 && this.createHearts(index);

            number === 8 && this.createDog(index);

            /*
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
            if (number === 8) {
                this.createDog(index);
            }
            */
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
        this.livesArr.push(new Heart(this.ctx, index, this.squareSize, this.squareSize));
    },

    createDog(index) {
        this.dog = new Dog(this.ctx, index, 'pugs.png');
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

    // Create images
    setImage(keyName, imageName, frames) {
        keyName.pathImage = `img/${imageName}`
        keyName.src = keyName.pathImage
        keyName.frames = frames
    },

    // Create ghosts array
    concatGhosts() {
        this.allGhostsArr = this.allGhostsArr.concat(this.verticalGhostsArr, this.horizontalGhostsArr);
    },


    // CLEAR
    
    clearAll() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    clearObjects() {
        this.livesArr = this.livesArr.filter(heart => heart.toDelete === false)
        this.key !== undefined && this.player.hasKey ? this.key.clear() : null;
    },


    // UPDATE

    updateObjects() {
        this.map.forEach((number, index) => {
            if (number === 6 && this.key === undefined) {
                // Create key
                this.key = new Key(this.ctx, index, 20, 20);
            }
            if (this.checkBrownWallCollision() && this.player.hasKey) {
                this.updateBrownWall();
            }
        });
        this.clearObjects();
    }, 

    updateBrownWall() {
        //number = 1;
        this.map[662] = 1;
        this.map[662 + 50] = 1;
        this.map[662 + 100] = 1;
    },


    // MOVE

    moveAll(currentFrame) {
        currentFrame % this.ghostTime ? this.verticalGhostsArr.forEach(ghost => ghost.move()) : null
        currentFrame % this.ghostTime ? this.horizontalGhostsArr.forEach(ghost => ghost.move()) : null;
        if (this.dog !== undefined) currentFrame === this.dogTime ? this.dog.move() : null;
    },


    // COLLISIONS

    checkAllCollisions() {
        this.verticalGhostsArr.forEach(ghost => ghost.checkCollision());
        this.checkPlayerGhostCollisions();
        this.door.isCollision(this.checkAdjacentCollision(this.door));
        this.livesArr.forEach(heart => heart.isCollision(this.checkPlayerCollision(heart)));
        this.key !== undefined && this.key.isCollision(this.checkPlayerCollision(this.key));
        if (this.dog !== undefined) this.checkAnyCollision(this.dog) && this.hasWon();
        this.checkBrownWallCollision();
    },

    // Player in front of object
    checkAdjacentCollision(object) {
        return game.player.i - 50 === object.i;
    },

    // Player around object
    checkAnyCollision(object) {
        return game.player.i - 50 === object.i || game.player.i + 50 === object.i
               || game.player.i - 1 === object.i || game.player.i + 1 === object.i
               || game.player.i - 51 === object.i || game.player.i -49 === object.i
               || game.player.i + 49 === object.i || game.player.i + 51 === object.i
    },

    // Direct collision
    checkPlayerCollision(object) {
        return game.player.i === object.i;
    },

    checkBrownWallCollision() {
        return this.map[this.player.i + 1] === '!';
    },

    checkPlayerGhostCollisions() {
        this.allGhostsArr.forEach(ghost => {
            if (this.player.i === ghost.i) {
                this.player.i = this.player.initialIndex;
                this.player.x = this.player.initialPosition.x;
                this.player.y = this.player.initialPosition.y;
                this.player.lives--;
                if (this.player.lives === 0) {
                    this.hasLost();
                }
            }
        });
    },


    // WIN-LOSE

    hasWon() {
        this.finishGame();
        this.drawYouWin();
    },

    hasLost() {
        this.finishGame();
        this.drawGameOver();
    },

    finishGame() {
        clearInterval(this.intervalID);
        this.clearAll();
    },

    drawGameOver() {
        this.setImage(this.gameOverImg, 'sad-pug.jpg', 1);
        this.gameOverImg.onload = () => {
            this.ctx.drawImage(this.gameOverImg, 0, 0, this.canvasSize.w, this.canvasSize.h);
        }
        //this.ctx.addEventListener
    },

    drawYouWin() {
        this.setImage(this.gameOverImg, 'happy-pug.jpg', 1);
        this.gameOverImg.onload = () => {
            this.ctx.drawImage(this.gameOverImg, 0, 0, this.canvasSize.w, this.canvasSize.h);
        }
    },

}
