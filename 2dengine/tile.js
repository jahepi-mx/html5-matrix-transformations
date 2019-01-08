class Tile {
    constructor(x, y, walkable) {
        var half = tileSize / 2;
        x = tileSize * x + half;
        y = tileSize * y + half;
        this.position = new Vector(x, y);
        this.downLeft = new Vector(-half, -half);
        this.downRight = new Vector(half, -half);
        this.upRight = new Vector(half, half);
        this.upLeft = new Vector(-half, half);
        this.walkable = walkable === 0;
    }
    
    update(dt) {
        
    }
    
    render(context, matrix) {
        
        var position = this.position;
        var downLeft = this.downLeft.add(position);
        var downRight = this.downRight.add(position);
        var upRight = this.upRight.add(position);
        var upLeft = this.upLeft.add(position);
        
        position = position.add(camera);
        downLeft = downLeft.add(camera);
        downRight = downRight.add(camera);
        upRight = upRight.add(camera);
        upLeft = upLeft.add(camera);
        
        // Recalculate vertexs
        var playerPosition = player.getPlayerPosition();
        position = position.sub(playerPosition);
        downLeft = downLeft.sub(playerPosition);
        downRight = downRight.sub(playerPosition);
        upRight = upRight.sub(playerPosition);
        upLeft = upLeft.sub(playerPosition);

        position = position.matrix(matrix);
        downLeft = downLeft.matrix(matrix);
        downRight = downRight.matrix(matrix);
        upRight = upRight.matrix(matrix);
        upLeft = upLeft.matrix(matrix);
        
        position = position.add(playerPosition);
        downLeft = downLeft.add(playerPosition);
        downRight = downRight.add(playerPosition);
        upRight = upRight.add(playerPosition);
        upLeft = upLeft.add(playerPosition);
        
        context.fillStyle = this.walkable ? "#fff" : "#000";
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
}