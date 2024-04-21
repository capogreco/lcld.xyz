---
title: Stretching the Friendship
published_at: 2024-04-02
snippet: zzzZZZ
disable_html_sanitization: true
allow_math: true
---

<div id="emoji">&#128517</div>

<canvas id="kite" ></canvas>

<script type="module">
   const a_ctx = new AudioContext ()
   a_ctx.suspend ()

   const cnv = document.getElementById (`kite`)
   cnv.width = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 3 / 2

   const ctx = cnv.getContext (`2d`)

   const div = document.getElementById (`emoji`)
   Object.assign (div.style, {
      position: `absolute`,
      userSelect: `none`,
      zIndex: `1`,
      textAlign: `center`,
      fontSize: `120px`,
      width: `${ cnv.width }px`,
      top: `${ (cnv.height / 4) + 100 }px`,
   })

   const set_emoji = e => {
      div.innerHTML = e
   }

   const rand_int = m => Math.floor (Math.random () * m)

   const snores = []

   let snoring = false
   let snore_i = rand_int (8)

   for (let i = 0; i < 7; i++) {
      const audio = document.createElement (`audio`)
      audio.src = `/240421/snores/${ i }.mp3`
      audio.onplay = () => {
         set_emoji (`&#128564`)
         snoring = true
      }
      audio.onended = () => {
         set_emoji (`&#128517`)
         snoring = false
         snore_i += rand_int (5) + 1
         snore_i %= snores.length
      }
      snores.push (audio)
   }


   ctx.fillStyle = `hsl(${ Math.random () * 360 }, 100%, 80%)`

   ctx.beginPath ()
   ctx.moveTo (cnv.width / 2, 0)
   ctx.lineTo (0, cnv.height / 4)
   ctx.lineTo (cnv.width / 2, cnv.height)
   ctx.lineTo (cnv.width, cnv.height / 4)
   ctx.closePath ()
   ctx.fill ()

   div.onpointerdown = () => {
      if (snoring) return
      snores[snore_i].play ()
   }
</script>