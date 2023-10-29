  <script>
import { onMounted } from 'vue'
import { Player } from '../models/Player'
import { walls, platforms } from '../models/collisions'
import { Sprite } from '../models/Sprite'
import { AppState } from '../AppState'
import { controls } from '../utils/Controls'
import { CollisionBlock } from '../models/CollisionBlock'
import { PlatformBlock } from '../models/PlatformBlock'
  export default {


    setup() {
        const canvas = document.getElementById('main')
        const c = canvas.getContext('2d')
        let player = null
        
        let scaler = AppState.canvasScale
        const blockSize = AppState.blockSize
        const scaledCanvas = {
            width: AppState.canvasSize.x / scaler,
            height: AppState.canvasSize.y / scaler
        }
        
        const keys = AppState.keys
        let paused = AppState.paused
        
        const collisionBlocks = []
        const platformBlocks = []
    
        function fill(){
            c.fillStyle = 'white'
            c.fillRect(0, 0, canvas.width, canvas.height)
        }
        
        function collisionSetup(){
            const walls2d = []
            const blocksX = background.img.width/blockSize
            for (let i = 0; i < walls.length; i += blocksX){
                walls2d.push(walls.slice(i, i + blocksX))
            }
            walls2d.forEach((row, y)=>{
                row.forEach((sym, x)=>{
                    if (sym != 0 ){
                        collisionBlocks.push(new CollisionBlock({position:{
                            x: x * blockSize,
                            y: y * blockSize,
                        }}))
                    }
                })
            })
        }

        function platformSetup(){
            const platforms2d = []
            const blocksX = background.img.width/blockSize
            for (let i = 0; i < walls.length; i += blocksX){
                platforms2d.push(platforms.slice(i, i + blocksX))
            }
            platforms2d.forEach((row, y)=>{
                row.forEach((sym, x)=>{
                    if (sym != 0 ){
                        platformBlocks.push(new PlatformBlock({position:{
                            x: x * blockSize,
                            y: y * blockSize,
                        }}))
                    }
                })
            })
        }

        function canvasSetup(){
            canvas.width = AppState.canvasSize.x
            canvas.height = AppState.canvasSize.y
        }

        function playerSetup(){
            player = new Player({
            position:{x:5*blockSize, y:24*blockSize,},
            collisionBlocks: collisionBlocks,
            imgSrc: 'src/assets/img/warrior/Idle.png',
            framerate: 8,
            scale:0.65,
            animations:{
                Idle:{
                    imgSrc: 'src/assets/img/warrior/Idle.png',
                    framerate: 8,
                },
                Run:{
                    imgSrc: 'src/assets/img/warrior/Run.png',
                    framerate: 8,
                }
            }
        })
        }
        
        const background = new Sprite({
            position:{
                x: 0,
                y: 0, 
            },
            imgSrc:"src/assets/img/map-1.png"
        })

        function animate(){
            if(!paused){  
                fill()

                c.save()
                c.scale(scaler, scaler)
                c.translate(-3*blockSize, -background.img.height + scaledCanvas.height + 4*blockSize)
                background.update(c, canvas)
                collisionBlocks.forEach((collisionBlock) => {
                    collisionBlock.update(c, canvas)
                })
                platformBlocks.forEach((platformBlock) => {
                    platformBlock.update(c, canvas)
                })
                player.update(c, canvas)
                player.velocity.x = 0
                if (keys.w.pressed && AppState.jump != true){
                    player.velocity.y = -7
                    // AppState.jump = true
                }
                if(keys.d.pressed){player.velocity.x = 5}
                else if(keys.a.pressed){player.velocity.x = -5}
                c.restore()
                
                


            }
            window.requestAnimationFrame(animate)
        }

        onMounted(()=>{
            controls.setup()
            canvasSetup()
            collisionSetup()
            platformSetup()
            playerSetup()
            console.log(player)
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