let confignstance = null;

class Config {
    
    constructor() {
        this.tileSize = 0;
        this.mapWidth = 0;
        this.mapHeight = 0;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
    }
    
    static getInstance() {
        if (confignstance === null) {
            confignstance = new Config();
        }
        return confignstance;
    }
}

