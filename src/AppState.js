import { reactive } from "vue";

export const AppState = reactive({
    keys: {
        d:{
            pressed: false,
        },
        a:{
            pressed: false,
        },
        w:{
            pressed: false,
        }
    },
    canvasSize: {
        x:1024,
        y:576,
    },
    paused: false,
    jump: false,
    blockSize: 32,
    devRender: false,
    canvasScale: 2
})