import { AppState } from "../AppState"
import { physics } from "../utils/Physics"
import { Sprite } from "./Sprite"

export class Player extends Sprite {
    constructor(data){
        super(data)
        this.collisionBlocks = data.collisionBlocks
        this.velocity = {x:0, y:1}
        this.gravity = data.gravity || 0.5
        this.hitbox = {
            position:{
                x:this.position.x, 
                y:this.position.y,
            },
            width: 10,
            height: 10,
        }
        this.animations = data.animations || null
        // for(let key in this.animations){
        //     const img = new Image()
        //     img.src = this.animations[key].imgSrc
        // }
    }

    update(c, canvas){
        this.updateFrames()
        this.updateHitbox()
        
        if(AppState.devRender){
            c.fillStyle = 'rgba(0, 255, 0, 0.5)'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
            
            c.fillStyle = 'rgba(0, 0, 255, 0.5)'
            c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        }
        
        this.draw(c)
        this.position.x += this.velocity.x
        
        
        this.updateHitbox()
        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.updateHitbox()
        this.checkForVerticalCollisions()
    }

    updateHitbox(){
        this.hitbox = {
            position:{
                x: this.position.x + 42,
                y: this.position.y + 33,
            },
            width: 22,
            height:36
        }
    }
    
    applyGravity(){
        this.position.y += this.velocity.y
        this.velocity.y += this.gravity
    }

    checkForVerticalCollisions(){
        for (let i = 0; i< this.collisionBlocks.length; i++){
            const block = this.collisionBlocks[i]
            if(physics.collision({obj1: this.hitbox, obj2: block})){
                    if(this.velocity.y>0){
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = block.position.y - offset - 0.01
                        break
                    }
                    if(this.velocity.y<0){
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y
                        this.position.y = block.position.y + block.height - offset + 0.01
                        break
                    }
            }
        }
    }

    checkForHorizontalCollisions(){
        for (let i = 0; i< this.collisionBlocks.length; i++){
            const block = this.collisionBlocks[i]
            if(physics.collision({obj1: this.hitbox, obj2: block})){
                    if(this.velocity.x>0){
                        this.velocity.x = 0
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = block.position.x - offset - 0.01
                        break
                    }
                    if(this.velocity.x<0){
                        this.velocity.x = 0
                        const offset = this.hitbox.position.x - this.position.x
                        this.position.x = block.position.x + block.width - offset + 0.01
                        break
                    }
            }
        }
    }
}