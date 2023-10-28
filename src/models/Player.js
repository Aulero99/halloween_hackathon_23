const canvas = document.getElementById('main')
const c = canvas.getContext('2d')
export class Player{
    constructor(data){
        this.position = data.position || {x:0, y:0}
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, 100)
    }

    update(){
        this.position.y++
    }
}