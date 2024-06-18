---
title: Cultivating Quiet
published_at: 2024-04-02
snippet: zzzZZZ
disable_html_sanitization: true
allow_math: false
---

<!-- <canvas id="cnv"></canvas> -->

<script src="/scripts/c2.min.js"></script>

<script>
   // import { openSimplexNoise2D } from "https://deno.land/x/noise/mod.ts";
   // import { makeNoise2D } from "https://deno.land/x/open-simplex-noise/mod.ts"
   // import * as c2 from "/scripts/c2.js"
   // import { Perlin } from "/scripts/c2.js"

   // class FloatingSquare {
   //    constructor(websocket) {
   //       this.ws       = websocket
   //       this.speed    = 0.0001
   //       // this.noise2D  = openSimplexNoise2D (Math.random () * MAX)
   //       // this.noise2D  = makeNoise2D (Math.random () * MAX)
   //       this.noise2D = new c2.Perlin ()
   //       this.x = Math.random () * MAX
   //       this.y = Math.random () * MAX
   //    }

   //    send_data (t) {
   //       const adj_t = t * this.speed

   //       const data = {
   //          type : `data`,
   //          body : {
   //             x: this.noise2D (adj_t + this.x, this.y),
   //             y: this.noise2D (this.x, adj_t + this.y)
   //          }
   //       }

   //       if (this.ws.readyState == 1) this.ws.send (JSON.stringify (data))

   //    }
   // }

   document.body.style.margin   = 0
   document.body.style.overflow = `hidden`
   document.body.style.background = `black`

   const cnv = document.createElement (`canvas`)
   cnv.style.position = `absolute`
   cnv.style.top = `0px`
   cnv.style.zIndex = -1
   document.body.appendChild (cnv)

   const ctx = cnv.getContext(`2d`)

   function resize_canvas () {
      cnv.width = innerWidth
      cnv.height = innerHeight
   }

   resize_canvas ()

   window.onresize = resize_canvas

   let is_pressed = false

   class Squuare {
      constructor (ctx) {
         this.ctx         = ctx

         this.frame_count = 1

         const short_side = innerWidth > innerHeight ? innerHeight : innerWidth

         this.size = { 
            x: short_side / 6,
            y: short_side / 6
         }

         this.pos          = {}

         this.last_pos     = {}

         this.colour       = `white`

         this.child        = []
         this.cur_gen      = 0
         this.tot_gen      = 128
         this.child_exists = false

         this.is_pressed   = false

      }

      update_pos (p) {
         Object.assign (this.last_pos, this.pos)
         Object.assign (this.pos, p)
         if (this.child_exists) this.child.update_pos (this.last_pos)
      }

      draw () {

         // console.log (this.cur_gen)

         if (this.child_exists) this.child.draw ()

         const mid = { 
            x: innerWidth / 2,
            y: innerHeight / 2
         }

         const p = this.cur_gen / this.tot_gen


         const new_pos = {
            x: this.pos.x * (1 - p),
            y: this.pos.y * (1 - p)
         }

         const new_size = {
            x: (this.size.x * (1 - p)) + (p * innerWidth),
            y: (this.size.y * (1 - p)) + (p * innerHeight),
         }

         let x = new_pos.x * (1 - p)
         x += 1
         x *= mid.x
         // x *= innerWidth
         x -= new_size.x / 2

         let y = new_pos.y * (1 - p)
         y += 1
         y *= mid.y
         // y *= innerHeight
         y -= new_size.y / 2

         let colour_sig = (this.frame_count / (this.tot_gen * 8)) * Math.PI
         colour_sig = Math.cos (colour_sig) + 1
         colour_sig *= 127.5


         if (this.is_pressed) {
            this.ctx.fillStyle = `turquoise` 
            this.ctx.fillRect (0, 0, innerWidth, innerHeight)

            this.ctx.fillStyle = `deeppink` 
            this.ctx.fillRect (x, y, new_size.x, new_size.y)
         }

         else {
            this.ctx.fillStyle = `rgb(${ colour_sig }, ${ colour_sig }, ${ colour_sig })`
            this.ctx.fillRect (x, y, new_size.x, new_size.y)
         }

         const birth_frame = (this.frame_count % (2 ** 4)) == 0
         if (!this.child_exists && birth_frame) this.birth ()

         this.frame_count++
      }

      get_coords () {

         let x = this.pos.x
         x += 1
         x *= innerWidth / 2
         x -= this.size.x / 2

         let y = this.pos.y
         y += 1
         y *= innerHeight / 2
         y -= this.size.y / 2

         return { x: x, y: y}
      }

      birth () {
         if (this.cur_gen < this.tot_gen) {
            this.child = new Squuare (this.ctx)
            this.child_exists = true
            this.child.cur_gen = this.cur_gen + 1
            Object.assign (this.child.pos, this.last_pos)
         }
      }

      on_pointer_down (e) {
         const coords = this.get_coords ()
         const in_L = e.x > coords.x
         const in_T = e.y > coords.y
         const in_R = e.x < coords.x + this.size.x
         const in_B = e.y < coords.y + this.size.y

         if (in_L && in_T && in_R && in_B) {
            this.is_pressed = true
            this.pos.x = (e.x * 2 / innerWidth)  - 1
            this.pos.y = (e.y * 2 / innerHeight) - 1
         }
      }

      on_pointer_move (e) {
         if (this.is_pressed) {
            this.pos.x = (e.x * 2 / innerWidth)  - 1
            this.pos.y = (e.y * 2 / innerHeight) - 1
         }
      }

      on_pointer_up () {
         this.is_pressed = false
      }
   }

   const squuare = new Squuare (ctx)

   // console.dir (cnv)

   cnv.onpointerdown = e => squuare.on_pointer_down (e)
   cnv.onpointermove = e => squuare.on_pointer_move (e)
   cnv.onpointerup   = e => squuare.on_pointer_up ()

   const perlin = new c2.Perlin ()

   const offset = {
      x: Math.random () * 100,
      y: Math.random () * 100
   }

   let t = Date.now ()
   const speed = 0.0005

   function draw_frame () {
      t += speed
      ctx.fillStyle = `deeppink`
      ctx.fillRect (0, 0, innerWidth, innerHeight)
      const new_pos = {
         x: perlin.noise (offset.x + t, offset.y) * 2 - 1,
         y: perlin.noise (offset.x, offset.y + t) * 2 - 1
      }
      squuare.update_pos (new_pos)
      squuare.draw ()
      requestAnimationFrame (draw_frame)
   }

   draw_frame ()

</script>