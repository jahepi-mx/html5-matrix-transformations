let matrixInstance = null;

class TransformationMatrix {
    
    constructor() {
        
        this.rotationMatrix = [
            0, 0,
            0, 0
        ];
        
        this.scaleMatrix = [
            0, 0,
            0, 0
        ];
        
        this.reflectMatrix = [
            -1, 0,
            0, -1
        ];
        
        this.shearXMatrix = [
            1, 0,
            0, 1
        ];
        
        this.shearYMatrix = [
            1, 0,
            0, 1
        ];
    }
    
    setShearX(factor) {
        /*
            Matrix
            [1, factor] [x]
            [0,      1] [y]
         */
        this.shearXMatrix[1] = factor;
    }
    
    setShearY(factor) {
        /*
            Matrix
            [1,      0] [x]
            [factor, 1] [y]
         */
        this.shearXMatrix[2] = factor;
    }
    
    setScale(factor) {
        /*
            Matrix
            [factor,      0] [x]
            [0,      factor] [y]
         */
        this.scaleMatrix[0] = factor;
        this.scaleMatrix[3] = factor;
    }
    
    setRotation(radians) {
        var xx = Math.cos(radians);
        var xy = Math.sin(radians); 
        var yx = Math.cos(Math.PI / 2 + radians);
        var yy = Math.sin(Math.PI / 2 + radians);
        /*
            Matrix
            [xx, yx] [x]
            [xy, yy] [y]
         */
        this.rotationMatrix[0] = xx;
        this.rotationMatrix[2] = xy;
        this.rotationMatrix[1] = yx;
        this.rotationMatrix[3] = yy;
    }
    
    setReflect(bool) {
        /*
            Matrix
            [-1, 0] [x]
            [0, -1] [y]
         */
        if (bool) {
            this.reflectMatrix[0] = -1;
            this.reflectMatrix[3] = -1;
        } else {
            this.reflectMatrix[0] = 1;
            this.reflectMatrix[3] = 1;
        }
    }
    
    rotate(x, y) {
        var newVector = new Vector();
        newVector.x = x * this.rotationMatrix[0] + y * this.rotationMatrix[1];
        newVector.y = x * this.rotationMatrix[2] + y * this.rotationMatrix[3];
        return newVector; 
    }
    
    scale(x, y) {
        var newVector = new Vector();
        newVector.x = x * this.scaleMatrix[0] + y * this.scaleMatrix[1];
        newVector.y = x * this.scaleMatrix[2] + y * this.scaleMatrix[3];
        return newVector; 
    }
    
    reflect(x, y) {
        var newVector = new Vector();
        newVector.x = x * this.reflectMatrix[0] + y * this.reflectMatrix[1];
        newVector.y = x * this.reflectMatrix[2] + y * this.reflectMatrix[3];
        return newVector; 
    }
    
    shearX(x, y) {
        var newVector = new Vector();
        newVector.x = x * this.shearXMatrix[0] + y * this.shearXMatrix[1];
        newVector.y = x * this.shearXMatrix[2] + y * this.shearXMatrix[3];
        return newVector; 
    }
    
    shearY(x, y) {
        var newVector = new Vector();
        newVector.x = x * this.shearYMatrix[0] + y * this.shearYMatrix[1];
        newVector.y = x * this.shearYMatrix[2] + y * this.shearYMatrix[3];
        return newVector; 
    }
    
    static getInstance() {
        if (matrixInstance === null) {
            matrixInstance = new TransformationMatrix();
        }
        return matrixInstance;
    }
}

