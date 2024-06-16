---
title: Little Machines
published_at: 2024-03-25
snippet: .. and party invites.
disable_html_sanitization: true
allow_math: true
---

> *MF*: Imagine if you could invent something like that – where **you’d just endlessly distract yourself; at any point in the world and at any time in the world you can be reached by the imperatives of capitalism** ... Imagine an object like that! What would it look like?
>
> *Student #10*: **A phone?**[^1]

[^1]: Fisher, Mark, Postcapitalist Desire: The Final Lectures, ed. by Matt Colquhoun (Repeater, 2020) *p 134*

<canvas id="phone_cnv"></canvas>

<!-- ![cassette tape](/240325/cassette.png) -->

> *X: Where do you place the proletarian, then?*
>
>
>
> ... In a world in which there has emerged, in a way that actually does exist, that is a presence in the world, not the thought of science, but science objectified in some way, I mean these things entirely forged by science, ... gadgets and things, which at the moment occupy the same space as us - **in a world in which this emergence has taken place, can know-how at the level of manual labor carry enough weight to be a subversive factor?**  This is how, for me, the question arises.
>
>
>
> What do you do with all I tell you?  **You record it on a little machine, and afterward, you give parties which you hand out invitations to - that's a Lacan tape for you.**[^2]

[^2]: Lacan, Jacques, The Other Side of Psychoanalysis: The Seminar of Jacques Lacan, Book XVII, trans. by Russell Grigg, 1st edition (W. W. Norton & Company, Inc., 2007) *p 149* 

<canvas id="tape_cnv"></canvas>

> **It is clear, even if one admits that Marx will disappear for now, that he will reappear one day.**[^3]

[^3]: Foucault, Michel, Politics, Philosophy, Culture: Interviews and Other Writings, 1977-1984, Pbk. [ed.] (Routledge, 1990) *p 45*

<img src="/240325/little_machines.png" style="background-color:transparent">

<script type="module">
   import { Glitcher } from "/scripts/glitcher.js"

   const quotes = document.getElementsByTagName (`blockquote`)
   for (const e of quotes) {
      e.style.color = `black`
      e.style.borderLeftColor = `black`
   }

   const bg = document.body.style.backgroundColor

   const phone_cnv = document.getElementById (`phone_cnv`)
   const phone_ctx = phone_cnv.getContext (`2d`)

   const tape_cnv = document.getElementById (`tape_cnv`)
   const tape_ctx = tape_cnv.getContext (`2d`)

   const marx_path = `/240325/karl_marx.png`

   const phone_glitcher = await Glitcher.instantiate (phone_ctx, bg, marx_path)
   const tape_glitcher = await Glitcher.instantiate (tape_ctx, bg, marx_path)

   const background = ctx => {
      ctx.fillStyle = document.body.style.backgroundColor
      ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height)
   }
   
   // let marx_data

   // const draw = i => ctx.drawImage (i, 0, 0, cnv.width, cnv.height)

   const phone = new Image ()
   phone.src = `/240325/phone.png`

   const tape = new Image ()
   tape.src = `/240325/cassette.png`
  
   // const marx = new Image ()
   // marx.onload = async () => {
   //    const coeff = cnv.parentNode.scrollWidth / marx.width

   //    const w = marx.width * coeff
   //    const h = marx.height * coeff

   //    cnv.width = w
   //    cnv.height = h

   //    background ()
   //    await ctx.drawImage (marx, 0, 0, w, h)

   //    marx_data = await cnv.toDataURL ("image/jpeg")
   //    add_glitch ()
   // }
   // marx.src = `/240325/karl_marx.png`

   // const rand_int = max => Math.floor (Math.random () * max)

   // const glitchify = (data, chunk_max, repeats) => {
   //    const chunk_size = rand_int (chunk_max / 4) * 4
   //    const i = rand_int (data.length - 24 - chunk_size) + 24
   //    const front = data.slice (0, i)
   //    const back = data.slice (i + chunk_size, data.length)
   //    const result = front + back
   //    return repeats == 0 ? result : glitchify (result, chunk_max, repeats - 1)
   // }

   // const glitch_arr = []

   // const check_data = async data => {
   //    const image = new Image ()
   //    image.src = data
   //    return await (new Promise (resolve => {
   //       image.onload = function () {
   //          if (image.height === 0 || image.width === 0) {
   //             resolve (false)
   //             return
   //          }
   //          resolve (true)
   //       }
   //       image.onerror = () => {
   //          resolve (false)
   //       }
   //    }))
   // }

   // const add_glitch = async () => {
   //    const i = new Image ()
   //    const data = await glitchify (marx_data, cnv.width, 6)
   //    const data_is_good = await check_data (data)
   //    if (data_is_good) {
   //       i.src = data
   //       glitch_arr.push (i)
   //    }
   //    if (glitch_arr.length < 12) add_glitch ()
   //    else draw_frame ()
   // }

   // let is_glitching = false
   // let glitch_i = 0

   const draw_frame = () => {
      // if (is_glitching) {
      //    draw (glitch_arr[glitch_i])
      //    ctx.drawImage (device, 0, 0, cnv.width, cnv.height)
      // }
      // else {
      //    background (phone_ctx)
      //    ctx.drawImage (device, 0, 0, cnv.width, cnv.height)
      // }
      // const prob = is_glitching ? 0.05 : 0.02
      // if (Math.random () < prob) {
      //    glitch_i = rand_int (glitch_arr.length)
      //    is_glitching = !is_glitching
      // }
      phone_glitcher.draw ()
      phone_ctx.drawImage (phone, 0, 0, phone_cnv.width, phone_cnv.height)

      tape_glitcher.draw ()
      tape_ctx.drawImage (tape, 0, 0, phone_cnv.width, phone_cnv.height)

      requestAnimationFrame (draw_frame)
   }
   draw_frame ()

</script>

