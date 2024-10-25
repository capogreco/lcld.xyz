export class Faller {
   constructor (canvas, context, col) {
      this.cnv = canvas
      this.ctx = context

      // this.hue = h
      this.col = col

      const { width, height } = this.cnv

      this.start_points = [
         { x: 0, y: height / 2 },
         { x: 0, y: 0 },
         { x: width / 4, y: 0 },
         { x: width / 2, y: 0 },
         { x: width * 3 / 4, y: 0 },
         { x: width, y: 0 },
         { x: width, y: height / 2 },
      ]

      this.end_points = []
      for (let i = 1; i < 8; i++) {
         this.end_points.push ({
            x: i * width / 8,
            y: height
         })
      }

      this.curves = new Array (7).fill ().map (() => Math.random () * 3 + 3)
      this.phase  = 0   
   }

   draw () {

      this.ctx.beginPath ()
      this.ctx.moveTo (0, this.cnv.height)
      this.start_points.forEach ((s, i) => {
         const e = this.end_points[i]
         const p = interlerp (s, e, this.phase ** this.curves[i])
         this.ctx.lineTo (p.x, p.y)
      })
      this.ctx.lineTo (this.cnv.width, this.cnv.height)
      this.ctx.closePath ()

      // this.ctx.fillStyle = `hsl(${ this.hue }, 100%, ${ 66 - ((this.phase ** 18) * 66) }%)`
      // this.ctx.fillStyle = `hsl(${ this.hue }, 100%, 66%)`
      this.ctx.fillStyle = this.col
      this.ctx.fill ()

      this.phase += 0.001
   }
}

function interlerp (start, end, phase) {
   const x = start.x + (end.x - start.x) * phase
   const y = start.y + (end.y - start.y) * phase
   return { x, y }
}