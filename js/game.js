const game = {
    canvas: null,
    ctx: null,
    canvasSize: {h: null, w: null},
    background: null,
    timeInterval: 30,
    currentFrame: 0,
    ghostTime: 2,
    squareSize: 20,
    verticalGhostsArr: [],
    horizontalGhostsArr: [],
    allGhostsArr: [],
    livesArr: [],
    map: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           0,1,1,1,1,1,1,1,1,1,1,5,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,3,1,1,0,
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
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
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
        this.drawMap()
        this.createAll()
        // this.player.setListener()
        this.concatGhosts()
        this.start();
    },

    start() {
        setInterval(() => {
            this.currentFrame++
            this.clearAll()
            this.updateObjects()
            this.drawMap()
            this.drawAll()
            // console.log(this.currentFrame)
            this.currentFrame === this.ghostTime ? this.moveAll() : null
            this.currentFrame %= this.ghostTime;
            this.checkAllCollisions()
            // this.drawText()
        }, 1000 / this.timeInterval);
    },

    drawMap() {
        for (let i = 0; i < this.map.length; i++) {
            const cell = this.map[i]
            const posX = (i % 50) * this.squareSize
            const posY = Math.floor(i / 50) * this.squareSize
            this.ctx.fillStyle = this.map[i] === 1 ? '#FFF' : '#000';
            this.ctx.fillRect(posX, posY, this.squareSize, this.squareSize);
        }
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

    // Posición inicial calculada manualmente a partir del index del array donde queremos que empiece (458)
    createPlayer() {
        this.player = new Player(this.ctx, this.map.indexOf(2), 'player.png', 4, 20, 20)
    },

    createAll() {
        this.createPlayer();
        this.map.forEach((number, index) => {
            if (number === 3) {
                this.verticalGhostsArr.push(new Ghost(this.ctx, index, 'vertical', 50, 20, 20));
            }
            if (number === 4) {
                this.horizontalGhostsArr.push(new Ghost(this.ctx, index, 'horizontal', 1, 20, 20));
            }
            if (number === 5) {
                this.door = new Door(this.ctx, index, 20, 20)
            }
            if (number === 7) {
                this.livesArr.push(new Heart(this.ctx, index, 20, 20));
            }
        });
    },

    updateObjects() {
        this.map.forEach((number, index) => {
            if (number === 6 && this.key === undefined) {
                this.key = new Key(this.ctx, index, 20, 20)
            } else if (this.key) {
                this.key.playerTakesKey()
            } 
   
        });

        this.clearObjects()
    }, 

    drawAll() {
        this.player.draw();
        this.verticalGhostsArr.forEach(ghost => {
            ghost.draw();
        });
        this.horizontalGhostsArr.forEach(ghost => {
            ghost.draw();
        });
        this.door.draw();
        this.livesArr.forEach(heart => heart.draw());
        // Teo, mejorable???
        if (this.key !== undefined && this.player.hasKey === false) this.key.draw()
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
        // Meter clearKey.
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
        //if (this.map[102] === 6) this.key.checkPlayerCollision()
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
