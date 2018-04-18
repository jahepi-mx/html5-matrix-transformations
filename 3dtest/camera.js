let cameraInstance = null;

class Camera {
    
    constructor() {
        this.vector = new Vector(0, 0, 0);
    }
    
    setX(x) {
        this.vector.x = x;
    }
    
    setY(y) {
        this.vector.y = y;
    }
    
    setZ(z) {
        this.vector.z = z;
    }
    
    getX() {
        return this.vector.x;
    }
    
    getY() {
        return this.vector.y;
    }
    
    getZ() {
        return this.vector.z;
    }
    
    static getInstance() {
        if (cameraInstance === null) {
            cameraInstance = new Camera();
        }
        return cameraInstance;
    }
}
