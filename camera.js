let cameraInstance = null;

class Camera {
    
    constructor() {
        this.vector = new Vector();
    }
    
    setX(x) {
        this.vector.x = x;
    }
    
    setY(y) {
        this.vector.y = y;
    }
    
    getX() {
        return this.vector.x;
    }
    
    getY() {
        return this.vector.y;
    }
    
    static getInstance() {
        if (cameraInstance === null) {
            cameraInstance = new Camera();
        }
        return cameraInstance;
    }
}
