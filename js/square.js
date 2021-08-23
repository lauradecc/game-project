class Square {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.width = 50;
        this.height = 50;
        this.color = "black";
        this.x = x;
        this.y = y;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

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

    // checkCollision(character) {
    //     if(((this.x > character.x)
    //         && this.x < character.x + character.width) 
    //         && ((this.y > character.y || this.y + this.height > character.y)
    //         && this.y < character.y + character.height)) {
    //       this.speedX *= -1
    //     }
    // }
}
