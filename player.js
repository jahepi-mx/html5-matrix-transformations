class Player {
     
    constructor(size, tiles) {
        this.vectorMoves = [[0, 0], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        this.config = Config.getInstance();
        this.position = new Vector(this.config.canvasWidth / 2, this.config.canvasHeight / 2);
        this.size = size;
        this.camera = Camera.getInstance();
        this.leftUp = new Vector(this.position.x - this.size / 2, this.position.y - this.size / 2);
        this.rightUp = new Vector(this.position.x + this.size / 2, this.position.y - this.size / 2);
        this.rightDown = new Vector(this.position.x + this.size / 2, this.position.y + this.size / 2);
        this.leftDown = new Vector(this.position.x - this.size / 2, this.position.y + this.size / 2);
        this.left = this.right = this.up = this.down = false;
        this.tiles = tiles;
        this.velocity = new Vector(0, 0);
    }
     
    update(deltatime) {
       
        if (this.left) {
            this.velocity.x = -this.size * 4;
        }
       
        if (this.right) {
            this.velocity.x = this.size * 4;
        }
       
        if (this.up) {
            this.velocity.y = -this.size * 4;
        }
       
        if (this.down) {
            this.velocity.y = this.size * 4;
        }
            
        var halfX = this.position.x;
        var halfY = this.position.y;
        var currX = Math.floor((halfX - this.camera.getX()) / this.config.tileSize);
        var currY = Math.floor((halfY - this.camera.getY()) / this.config.tileSize);

        var tmpX = this.camera.getX();
        this.camera.setX(this.camera.getX() + this.velocity.x * deltatime);
        for (let vector of this.vectorMoves) {
            var newX = vector[0] + currX;
            var newY = vector[1] + currY;
            var index = newY * this.config.mapWidth + newX;
            if (index >= 0 && index < this.config.mapWidth * this.config.mapHeight) {
                if (this.tiles[index].walkable && this.tiles[index].collide(this)) {
                    this.camera.setX(tmpX);
                    break;
                }
            }
        }

        var tmpY = this.camera.getY();
        this.camera.setY(this.camera.getY() + this.velocity.y * deltatime);
        for (let vector of this.vectorMoves) {
            var newX = vector[0] + currX;
            var newY = vector[1] + currY;
            var index = newY * this.config.mapWidth + newX;
            if (index >= 0 && index < this.config.mapWidth * this.config.mapHeight) {
                if (this.tiles[index].walkable && this.tiles[index].collide(this)) {
                    this.camera.setY(tmpY);
                    break;
                }
            }
        }
       
        this.velocity.x *= 0.95;
        this.velocity.y *= 0.95;
   }
     
  render(context) {
       
        var matrix = TransformationMatrix.getInstance();
        var halfX = this.position.x;
        var halfY = this.position.y;
       
        // Transformations from origin
        var leftUpVector = matrix.rotate(this.leftUp.x - halfX, this.leftUp.y - halfY);
        leftUpVector = matrix.scale(leftUpVector.x, leftUpVector.y);
        leftUpVector = matrix.shearX(leftUpVector.x, leftUpVector.y);
        leftUpVector = matrix.shearY(leftUpVector.x, leftUpVector.y);
        
        var rightUpVector = matrix.rotate(this.rightUp.x - halfX, this.rightUp.y - halfY);
        rightUpVector = matrix.scale(rightUpVector.x, rightUpVector.y);
        rightUpVector = matrix.shearX(rightUpVector.x, rightUpVector.y);
        rightUpVector = matrix.shearY(rightUpVector.x, rightUpVector.y);

        var rightDownVector = matrix.rotate(this.rightDown.x - halfX, this.rightDown.y - halfY);
        rightDownVector = matrix.scale(rightDownVector.x, rightDownVector.y);
        rightDownVector = matrix.shearX(rightDownVector.x, rightDownVector.y);
        rightDownVector = matrix.shearY(rightDownVector.x, rightDownVector.y);

        var leftDownVector = matrix.rotate(this.leftDown.x - halfX, this.leftDown.y - halfY);
        leftDownVector = matrix.scale(leftDownVector.x, leftDownVector.y);
        leftDownVector = matrix.shearX(leftDownVector.x, leftDownVector.y);
        leftDownVector = matrix.shearY(leftDownVector.x, leftDownVector.y);
       
        context.fillStyle = "red";
        context.beginPath();
        context.moveTo(halfX + leftUpVector.x, halfY + leftUpVector.y);
        context.lineTo(halfX + rightUpVector.x, halfY + rightUpVector.y);
        context.lineTo(halfX + rightDownVector.x, halfY + rightDownVector.y);
        context.lineTo(halfX + leftDownVector.x, halfY + leftDownVector.y);
        context.lineTo(halfX + leftUpVector.x, halfY + leftUpVector.y);
        context.stroke();
        context.fill();
    }
     
    getX() {
        return this.position.x - this.camera.getX();
    }
     
    getY() {
        return this.position.y - this.camera.getY();
    }
}