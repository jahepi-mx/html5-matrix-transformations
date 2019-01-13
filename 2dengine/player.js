class Player {
    constructor(x, y) {
        this.moves = [[0, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
        var halfTile = tileSize / 2;
        x = tileSize * x + halfTile;
        y = tileSize * y + halfTile;
        this.size = tileSize / 2;
        var half = this.size / 2;
        this.position = new Vector(x, y);
        this.downLeft = new Vector(-half, -half);
        this.downRight = new Vector(half, -half);
        this.upRight = new Vector(half, half);
        this.upLeft = new Vector(-half, half);
        this.velocity = new Vector(0, 0);
        this.velocityTmp = new Vector(100, 400);
        this.gravity = new Vector(0, -10);
        this.friction = 0.95;
        this.leftc = this.rightc = this.upc = this.downc = false;
    }
    
    update(dt) { 
        if (this.upc) this.velocity.y = this.velocityTmp.y;
        if (this.downc) this.velocity.y = -this.velocityTmp.y;
        if (this.leftc) this.velocity.x = -this.velocityTmp.x;
        if (this.rightc) this.velocity.x = this.velocityTmp.x;
        
        var tmpPosition = new Vector(this.position.x, this.position.y);
        this.position.x += this.velocity.x * dt;
        var x = parseInt(this.position.x / tileSize);
        var y = parseInt(this.position.y / tileSize);
        var collide = false;
        for (let move of this.moves) {
            var tmpX = x + move[0];
            var tmpY = y + move[1];
            if (tmpX >= 0 && tmpX < mapWidth && tmpY >= 0 && tmpY < mapHeight) {
                var tile = tiles[tmpY * mapWidth + tmpX];
                if (!tile.walkable) {
                    var width = this.size / 2 + tileSize / 2;
                    var distX = Math.abs(tile.position.x - this.position.x);
                    var distY = Math.abs(tile.position.y - this.position.y);
                    if (distX <= width && distY <= width) {
                        collide = true;
                    }
                }
            }
        }
        
        if (collide) {
            this.position.x = tmpPosition.x;
            this.velocity.x *= -1;
        }
        
        tmpPosition = new Vector(this.position.x, this.position.y);
        this.position.y += this.velocity.y * dt;
        x = parseInt(this.position.x / tileSize);
        y = parseInt(this.position.y / tileSize);
        collide = false;
        for (let move of this.moves) {
            var tmpX = x + move[0];
            var tmpY = y + move[1];
            if (tmpX >= 0 && tmpX < mapWidth && tmpY >= 0 && tmpY < mapHeight) {
                var tile = tiles[tmpY * mapWidth + tmpX];
                if (!tile.walkable) {
                    var width = this.size / 2 + tileSize / 2;
                    var distX = Math.abs(tile.position.x - this.position.x);
                    var distY = Math.abs(tile.position.y - this.position.y);
                    if (distX <= width && distY <= width) {
                        collide = true;
                    }
                }
            }
        }
        
        if (collide) {
            this.position.y = tmpPosition.y;
            this.velocity.y *= -1;
        }
        
        this.velocity = this.velocity.mul(this.friction);
        this.velocity = this.velocity.add(this.gravity);
    }
    
    render(context, matrix) {
        
        var position = this.position;
        var downLeft = this.downLeft.matrix(matrix).add(position);
        var downRight = this.downRight.matrix(matrix).add(position);
        var upRight = this.upRight.matrix(matrix).add(position);
        var upLeft = this.upLeft.matrix(matrix).add(position);
        
        position = position.add(camera);
        downLeft = downLeft.add(camera);
        downRight = downRight.add(camera);
        upRight = upRight.add(camera);
        upLeft = upLeft.add(camera);
        
        context.fillStyle = "#ff0000";
        context.strokeStyle = context.style;
        context.beginPath();
        context.moveTo(origX + downLeft.x, origY - downLeft.y);
        context.lineTo(origX + downRight.x, origY - downRight.y);
        context.lineTo(origX + upRight.x, origY - upRight.y);
        context.lineTo(origX + upLeft.x, origY - upLeft.y);
        context.lineTo(origX + downLeft.x, origY - downLeft.y);
        context.stroke();
        context.fill(); 
    }
    
    getPlayerPosition() {
        var position = this.position;
        return position.add(camera);
    }
    
    up(bool) {
        this.upc = bool;
    }
    
    down(bool) {
        this.downc = bool;
    }
    
    left(bool) {
        this.leftc = bool;
    }
    
    right(bool) {
        this.rightc = bool;
    }
}


