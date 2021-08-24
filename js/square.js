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
    
}
