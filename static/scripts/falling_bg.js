import { Faller } from './faller.js'

let bg_col = `white`
// let bg_h = Math.random () * 360
document.body.style.backgroundColor = bg_col

const cnv  = document.createElement (`canvas`)

const size_to_window = c => {
    c.width  = innerWidth
    c.height = innerHeight
}

size_to_window (cnv)

globalThis.onresize = () => size_to_window (cnv)

cnv.style.position = `fixed`
cnv.style.top      = `0`
cnv.style.zIndex   = `-1`

document.body.appendChild (cnv)

const ctx = cnv.getContext (`2d`)
ctx.imageSmoothingEnabled = true

let frame_count = 0

const fallers = []

fallers.push (new Faller (cnv, ctx, bg_col))
bg_col = `hsl(${ Math.random () * 360 }, 100%, 66%)`

const draw_frame = () => {
    // ctx.fillStyle = `hsl(${ bg_h }, 100%, 66%)`
    ctx.fillStyle = bg_col
    ctx.fillRect (0, 0, cnv.width, cnv.height)

    const redundant = []
    fallers.forEach ((f, i) => {
        f.draw ()
        if (f.phase > 1) {
            redundant.push (i)
        }
    })

    redundant.forEach (i => {
        fallers.splice (i, 1)
        fallers.push (new Faller (cnv, ctx, bg_col))
        // bg_h = Math.random () * 360
        bg_col = `hsl(${ Math.random () * 360 }, 100%, 66%)`
    })

    frame_count++
    requestAnimationFrame (draw_frame)
}

draw_frame ()