class Tile {

   constructor(x, y, size, walkable) {
        this.position = new Vector(x, y);
        this.size = size;
        this.walkable = walkable;
        this.camera = Camera.getInstance();
        this.config = Config.getInstance();

        x = x * this.size;
        y = y * this.size;

        this.leftUpVector = new Vector(x, y);
        this.rightUpVector = new Vector(x + this.size, y);
        this.leftDownVector = new Vector(x, y + this.size);
        this.rightDownVector = new Vector(x + this.size, y + this.size);
    }

    update(deltatime) {

    }

    collide(player) {
        var width = player.size / 2 + this.size / 2;
        var height = width;
        var diffX = Math.abs((this.position.x * this.size + this.size / 2) - player.getX());
        var diffY = Math.abs((this.position.y * this.size + this.size / 2) - player.getY());
        return diffX <= width && diffY <= height;
    }

    render(context) {
        var matrix = TransformationMatrix.getInstance();
        /*
        var cameraVector = matrix.rotate(this.camera.getX(), this.camera.getY());
        cameraVector = matrix.scale(cameraVector.x, cameraVector.y);
        cameraVector = matrix.shearX(cameraVector.x, cameraVector.y);
        cameraVector = matrix.shearY(cameraVector.x, cameraVector.y);
        cameraVector = matrix.reflect(cameraVector.x, cameraVector.y);
        */
        var halfX = this.config.canvasWidth / 2;
        var halfY = this.config.canvasHeight / 2;

        // Transformations from origin
        var leftUpVector = matrix.rotate(this.leftUpVector.x + this.camera.getX() - halfX, this.leftUpVector.y + this.camera.getY() - halfY);
        leftUpVector = matrix.scale(leftUpVector.x, leftUpVector.y);
        leftUpVector = matrix.shearX(leftUpVector.x, leftUpVector.y);
        leftUpVector = matrix.shearY(leftUpVector.x, leftUpVector.y);
        leftUpVector = matrix.reflect(leftUpVector.x, leftUpVector.y);

        var rightUpVector = matrix.rotate(this.rightUpVector.x + this.camera.getX() - halfX, this.rightUpVector.y + this.camera.getY() - halfY);
        rightUpVector = matrix.scale(rightUpVector.x, rightUpVector.y);
        rightUpVector = matrix.shearX(rightUpVector.x, rightUpVector.y);
        rightUpVector = matrix.shearY(rightUpVector.x, rightUpVector.y);
        rightUpVector = matrix.reflect(rightUpVector.x, rightUpVector.y);

        var rightDownVector = matrix.rotate(this.rightDownVector.x + this.camera.getX() - halfX, this.rightDownVector.y + this.camera.getY() - halfY);
        rightDownVector = matrix.scale(rightDownVector.x, rightDownVector.y);
        rightDownVector = matrix.shearX(rightDownVector.x, rightDownVector.y);
        rightDownVector = matrix.shearY(rightDownVector.x, rightDownVector.y);
        rightDownVector = matrix.reflect(rightDownVector.x, rightDownVector.y);

        var leftDownVector = matrix.rotate(this.leftDownVector.x + this.camera.getX() - halfX, this.leftDownVector.y + this.camera.getY() - halfY);
        leftDownVector = matrix.scale(leftDownVector.x, leftDownVector.y);
        leftDownVector = matrix.shearX(leftDownVector.x, leftDownVector.y);
        leftDownVector = matrix.shearY(leftDownVector.x, leftDownVector.y);
        leftDownVector = matrix.reflect(leftDownVector.x, leftDownVector.y);

        context.beginPath();
        context.moveTo(halfX + leftUpVector.x, halfY + leftUpVector.y);
        context.lineTo(halfX + rightUpVector.x, halfY + rightUpVector.y);
        context.lineTo(halfX + rightDownVector.x, halfY + rightDownVector.y);
        context.lineTo(halfX + leftDownVector.x, halfY + leftDownVector.y);
        context.lineTo(halfX + leftUpVector.x, halfY + leftUpVector.y);
        context.stroke();

        context.fillStyle = this.walkable ? "#000" : "#fff";
        context.fill();
    }
}