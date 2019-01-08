class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
    
    sub(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    
    mul(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    normalize() {
        var length = this.length();
        return new Vector(this.x / length, this.y / length);
    }
    
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    
    matrix(matrix) {
        var x = matrix[0] * this.x + matrix[1] * this.y + matrix[2];
        var y = matrix[3] * this.x + matrix[4] * this.y + matrix[5];
        return new Vector(x, y);
    }
}

function getRotationMatrix(theta) {
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    var matrix = [
        cos, -sin, 0,
        sin,  cos, 0,
        0,      0, 1,
    ];
    return matrix;
}