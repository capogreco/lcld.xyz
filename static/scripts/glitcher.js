export class Glitcher {
   constructor (ctx, bg_col) {
      this.ctx = ctx
      this.cnv = ctx.canvas
      this.bg_col = bg_col
      this.glitch_arr = []
      this.is_glitching = false
      this.index = 0
   }

   static async instantiate (ctx, bg_col, img_path) {
      const g = new Glitcher (ctx, bg_col)
      const i = new Image ()
      i.src = img_path
      await i.decode ()
      g.cnv.width = g.cnv.parentNode.scrollWidth
      g.cnv.height = i.height * g.cnv.width / i.width
      g.background ()
      await g.ctx.drawImage (i, 0, 0, g.cnv.width, g.cnv.height)
      g.data = await g.cnv.toDataURL ("image/jpeg")
      await g.add_glitch ()
      return g
   }

   background () {
      this.ctx.fillStyle = this.bg_col
      this.ctx.fillRect (0, 0, this.cnv.width, this.cnv.height)
   }

   async add_glitch () {
      const i = new Image ()
      const data = await this.glitchify (this.data, this.cnv.width, 6)
      const data_is_good = await this.check_data (data)
      if (data_is_good) {
         i.src = data
         this.glitch_arr.push (i)
      }
      if (this.glitch_arr.length < 12) this.add_glitch ()
      // else draw_frame ()
   }

   glitchify (data, chunk_max, repeats) {
      const chunk_size = this.rand_int (chunk_max / 4) * 4
      const i = this.rand_int (data.length - 24 - chunk_size) + 24
      const front = data.slice (0, i)
      const back = data.slice (i + chunk_size, data.length)
      const result = front + back
      return repeats == 0 ? result : this.glitchify (result, chunk_max, repeats - 1)
   }

   async check_data (data) {
      const i = new Image ()
      i.src = data
      return await (new Promise (resolve => {
         i.onload = function () {
            if (i.height === 0 || i.width === 0) {
               resolve (false)
               return
            }
            resolve (true)
         }
         i.onerror = () => resolve (false)
      }))
   }

   draw_image (i) {
      this.ctx.drawImage (i, 0, 0, this.cnv.width, this.cnv.height)
   }

   rand_int (max) {
      return Math.floor (Math.random () * max)
   }


   draw () {
      if (this.is_glitching) {
         this.draw_image (this.glitch_arr[this.index])
      }
      else {
         this.background ()
      }
      const prob = this.is_glitching ? 0.05 : 0.02
      if (Math.random () < prob) {
         this.index = this.rand_int (this.glitch_arr.length)
         this.is_glitching = !this.is_glitching
      }
   }
}