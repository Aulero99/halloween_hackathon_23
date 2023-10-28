  <script>
import { onMounted } from 'vue'
import { logger } from '../utils/Logger'
  import vars from '../variables.json'
//   import { Player } from '../models/Player'
  export default {
    setup() {
        const canvas = document.getElementById('main')
        const c = canvas.getContext('2d')
        let paused = false

        canvas.width = 1024
        canvas.height = 576

        const scaledCanvas = {
            width: canvas.width / 4,
            height: canvas.height / 4
        }

        function fill(){
            c.fillStyle = 'white'
            c.fillRect(0, 0, canvas.width, canvas.height)
        }


        class Sprite {
            constructor(data){
                this.position = data.position || {x:0,y:0}
                this.img = new Image()
                this.img.src = data.imgSrc
            }

            draw(){
                if (!this.img){return}
                c.drawImage(this.img, this.position.x, this.position.y)
            }

            update(){
                this.draw()
            }
        }

        class Player {
            constructor(data){
                this.position = data.position || {x:0, y:0,}
                this.color = data.color || "red"
                this.velocity = {x:0, y:1}
                this.gravity = data.gravity || 0.5
                this.height = data.height || 100
            }

            draw(){
                c.fillStyle = this.color
                c.fillRect(this.position.x, this.position.y, 100, this.height)
            }

            update(){
                this.draw()
                this.position.y += this.velocity.y
                this.position.x += this.velocity.x
                if(this.position.y + this.height + this.velocity.y < canvas.height){
                    this.velocity.y += this.gravity
                }else{
                    this.velocity.y = 0
                }
            }
        }
        
        const player = new Player({position:{x:20, y:0,}})


        const keys = {
            d:{
                pressed: false,
            },
            a:{
                pressed: false,
            }
        }

        const background = new Sprite({
            position:{
                x: 0,
                y: 0, 
            },
            imgSrc:"src/assets/img/background.png",
        })

        function animate(){
            if(!paused){  
                fill()

                c.save()
                c.scale(4, 4)
                c.translate(0, -background.img.height + scaledCanvas.height)
                background.update()
                c.restore()

                player.update()
                player.velocity.x = 0
                if(keys.d.pressed){player.velocity.x = 5}
                else if(keys.a.pressed){player.velocity.x = -5}
            }
            window.requestAnimationFrame(animate)
        }

        window.addEventListener('keydown', (e) => {
            switch (e.key){
                case 'd':
                    keys.d.pressed = true
                    break
                case 'a':
                    keys.a.pressed = true
                    break
                case 'w':
                    player.velocity.y = -18
                    break
            }
        })

        window.addEventListener('keyup', (e) => {
            switch (e.key){
                case 'd':
                    keys.d.pressed = false
                    break
                case 'a':
                    keys.a.pressed = false
                    break
            }
        })
    

        onMounted(()=>{
            animate()
        })
      return {
  
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

</style>