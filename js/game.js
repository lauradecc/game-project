const game = {
    canvas: null,
    ctx: null,
    canvasSize: {h: null, w: null},
    background: null,
    timeInterval: 20,
    map: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,
           0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,
           0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,
           0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
           0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   
    
    /*
    // Map arrays
    borderTop: [],
    borderBottom: [],
    borderLeft: [],
    borderRight: [],
    verticalBars: [],
    map: [],
    // Ghost array
    ghostsArray: [],
    
    // Meter obstáculos, personaje, balas, whatever
    // keys: {}
    */
    init(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        //// Medidias fijas o en función de la pantalla?
        this.canvasSize = {h: 600, w: 1000};
        //this.createMap()
        //this.concatMap()
        ////console.log(this.map)
        this.drawMap()
        this.createAll()
        //player.setListener()
        this.start();
    },

    start() {
        setInterval(() => {
            this.clearAll()
            this.drawMap()
            this.drawAll()
            //this.moveAll()
            // this.drawText()
            // player.checkGhostsCollisions()
            // door.playerCollision()
            // key.playerCollision()
            // this.createShowKey()
        }, this.timeInterval);
    },

    drawMap() {
        let squareSize = 20;
        for (let i = 0; i < this.map.length; i++) {
            const cell = this.map[i]
            const posX = (i % 50) * squareSize
            const posY = Math.floor(i / 50) * squareSize
            
     
            this.ctx.fillStyle = this.map[i] === 1 ? '#FFF' : '#000';
            this.ctx.fillRect(posX, posY, squareSize, squareSize);
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

    createPlayer() {
        this.player = new Player(this.ctx, 160, 180, 20, 20)
    },

    createAll() {
        this.createPlayer();
        // ghost1 = new Ghost(this.ctx, 50, 470, 20, 20)
        // ghost2 = new Ghost(this.ctx, 920, 300, 20, 20)
        // this.ghostsArray.push(ghost1, ghost2)
        // door = new Door(this.ctx, 850, 50, 50, 10)
        // key = new Key(this.ctx, 720, 60, 5, 15)
    },

    drawAll() {
        this.player.draw();
        // ghost1.draw()
        // ghost2.draw()
        // door.draw()
        // key.show()
    },
    /*
    moveAll() {
        ghost1.move()
        ghost2.move()
        ghost1.checkCollision()
        ghost2.checkCollision()
    },
    */
    /*
    createMap() {
        //Todas estas funciones se pueden meter en 
        //la clase cuadrado o reducirlo de alguna manera fuera
        //de game???
        this.createBordersTopBottom(20, 550, 50)
        this.createBordersLeftRight(10, 950, 50)
        this.createInteriorMap()
    },

    drawMap() {
        this.drawBordersTopBottom()
        this.drawBordersLeftRight()
        // Interior map:
        this.drawVerticalBars()
    },

    createInteriorMap() {
        this.createVerticalBars(8, 150, 50, 50)
        this.createVerticalBars(8, 300, 150, 50)
        this.createVerticalBars(8, 450, 50, 50)
        this.createVerticalBars(8, 600, 150, 50)
        this.createVerticalBars(8, 750, 50, 50)
    },

    // Join all squares in one array to iterate and create collisions
    concatMap() {
        this.map = this.map.concat(this.borderTop, this.borderBottom, 
                   this.borderLeft, this.borderRight, this.verticalBars);
    },
    
    createBordersTopBottom(squaresNum, space, squareSize) {
        //Se podría sustituir squareSize por el tamaño de la clase?
        //por ejemplo no poniendola fija en la clase si no metiéndolo
        //como parámetro y poniéndolo aquí creando variable en game
        for (let i = 0; i < squaresNum; i++) {
            this.borderTop.push(new Square(this.ctx, [i * squareSize], 0));
            this.borderBottom.push(new Square(this.ctx, [i * squareSize], space));
        }
    },

    drawBordersTopBottom() {
        for (let i = 0; i < this.borderTop.length; i++) {
            this.borderTop[i].draw();
            this.borderBottom[i].draw();
        }
    },

    createBordersLeftRight(squaresNum, space, squareSize) {
        for (let i = 0; i < squaresNum; i++) {
            this.borderLeft.push(new Square(this.ctx, 0, [(i + 1) * squareSize]));
            this.borderRight.push(new Square(this.ctx, space, [(i + 1) * squareSize]));
        }
    },

    drawBordersLeftRight() {
        for (let i = 0; i < this.borderLeft.length; i++) {
            this.borderLeft[i].draw();
            this. borderRight[i].draw();
        }
    },

    createVerticalBars(squaresNum, x, y, squareSize) {
        for (let i = 0; i < squaresNum; i++) {
            this.verticalBars.push(new Square(this.ctx, x, y + squareSize * i));
        }
    },

    drawVerticalBars() {
        for (let i = 0; i < this.verticalBars.length; i++) {
            this.verticalBars[i].draw();
        }
    },
    */

}

