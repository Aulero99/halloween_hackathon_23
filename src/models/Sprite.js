export class Sprite {
    constructor(data){
        this.framerate = data.framerate || 1
        this.position = data.position || {x:0,y:0}
        this.scale = data.scale || 1
        this.img = new Image()
        this.img.onload = () => {
            this.width = (this.img.width / this.framerate) * this.scale
            this.height = (this.img.height) * this.scale
        }
        this.img.src = data.imgSrc
        this.currentFrame = 0
        this.frameBuffer = data.frameBuffer || 3
        this.elapsedFrames = 0
    }

    draw(c){
        if (!this.img){return}
        const cropbox = {
            position:{
                x:this.currentFrame * this.img.width / this.framerate,
                y:0,
            },
            width: this.img.width / this.framerate,
            height:this.img.height,
        }
        c.drawImage(
            this.img, 
            cropbox.position.x, 
            cropbox.position.y, 
            cropbox.width, 
            cropbox.height, 
            this.position.x, 
            this.position.y,
            this.width,
            this.height
            )
    }

    update(c, canvas){
        this.draw(c)
        this.updateFrames()
    }

    updateFrames(){
        this.elapsedFrames++
        if(this.elapsedFrames % this.frameBuffer === 0){
            if(this.currentFrame < this.framerate - 1){
                this.currentFrame++
            } else{ this.currentFrame = 0 }
        }
    }
}