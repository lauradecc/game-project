class Ghost {
    constructor(ctx, index, direction, image, frames, speed, width, height){ //canvasSize????
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.width = width;
        this.height = height;
        // Metemos valocidad como parámetro para distintos niveles?
        this.speed = speed;
        this.direction = direction;
        // Direction: 0-face, 1-up, 2-right, 3-left
        //this.direction = 0;
        this.frames = frames;
        this.counter = 0;
        this.init(frames, image);
        this.image.frameIndexVertical = {x: 0, y: 0};
        this.image.frameIndexHorizontal = {x: 0, y: image.height / 4};
    }

    init(frames, image) {
        this.image = new Image()
        this.image.pathImage = `img/${image}`
        this.image.src = this.image.pathImage
        this.image.frames = frames
    }

    draw(frameIndex) {
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.ctx.drawImage(
            this.image,
            frameIndex.x,
            frameIndex.y,
            //this.frames para sustituir al número que hemos puesto a lo bruto??
            Math.floor(this.image.width / this.frames),
            Math.floor(this.image.height / 4),
            this.x - game.squareSize / 2,
            this.y - game.squareSize,
            this.width,
            this.height,
        )
    }

    updateX(frameIndex) {
        frameIndex.x = (this.image.width / 3) * this.counter;
        this.counter++;
        this.counter %= this.frames;
    }

    walkVertical() {
        this.updateX(this.image.frameIndexVertical);
        if (this.speed < 0) {
            this.image.frameIndexVertical.y = (this.image.height / 4) * 0;
        } else {
            this.image.frameIndexVertical.y = (this.image.height / 4) * 2;
        }
    }

    walkHorizontal() {
        this.updateX(this.image.frameIndexHorizontal);
        if (this.speed < 0) {
            this.image.frameIndexHorizontal.y = (this.image.height / 4) * 3;
        } else {
            this.image.frameIndexHorizontal.y = this.image.height / 4;
        }
    }

    move() {

        if (this.direction === 'vertical') {
            if (this.checkCollision()) {  
                this.speed *= -1;
            }
            this.walkVertical()
            this.updatePosition(3);
        }

        if (this.direction === 'horizontal') {
            if (this.checkCollision()) {  
                this.speed *= -1;
            }
            this.walkHorizontal()
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
    }

}
