import { AppState } from "../AppState"

export class CollisionBlock {
    constructor(data){
        this.position = data.position || {x:0,y:0}
        this.width = data.width || AppState.blockSize
        this.height = data.height || AppState.blockSize
    }

    draw(c){
        if(AppState.devRender){
            c.fillStyle = 'rgba(255,0,0,0.45)'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }

    update(c, canvas){
        this.draw(c)
    }
}