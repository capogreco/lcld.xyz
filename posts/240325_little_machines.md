---
title: Little Machines
published_at: 2024-03-25
snippet: ... and party invites
disable_html_sanitization: true
allow_math: true
---

<canvas id="phone_cnv"></canvas>

> *MF*: Imagine if you could invent something like that – where **you’d just endlessly distract yourself; at any point in the world and at any time in the world you can be reached by the imperatives of capitalism** ... Imagine an object like that! What would it look like?
>
> *Student #10*: **A phone?**[^3]

[^3]: Fisher, Mark, *Postcapitalist Desire: The Final Lectures*, ed. by Matt Colquhoun (Repeater, 2020) p 134

<canvas id="tape_cnv"></canvas>

> *X: Where do you place the proletarian, then?*
>
>
>
> ... In a world in which there has emerged, in a way that actually does exist, that is a presence in the world, not the thought of science, but science objectified in some way, I mean these things entirely forged by science, ... gadgets and things, which at the moment occupy the same space as us - **in a world in which this emergence has taken place, can know-how at the level of manual labor carry enough weight to be a subversive factor?**  This is how, for me, the question arises.
>
>
>
> What do you do with all I tell you?  **You record it on a little machine, and afterward, you give parties which you hand out invitations to - that's a Lacan tape for you.**[^2]

[^2]: Lacan, Jacques, *The Other Side of Psychoanalysis: The Seminar of Jacques Lacan, Book XVII*, trans. by Russell Grigg, 1st edition (W. W. Norton & Company, Inc., 2007) p 149 

<canvas id="book_cnv"></canvas>

<br>


> **It is clear, even if one admits that Marx will disappear for now, that he will reappear one day.**[^1]

[^1]: Foucault, Michel, *Politics, Philosophy, Culture: Interviews and Other Writings*, 1977-1984, Pbk. [ed.] (Routledge, 1990) p 45


<img src="/240325/little_machines.png" style="background-color:transparent">


<script type="module">
   import { Glitcher } from "/scripts/glitcher.js"

   const quotes = document.getElementsByTagName (`blockquote`)
   for (const e of quotes) {
      e.style.color = `black`
      e.style.borderLeftColor = `black`
   }

   const footnotes = document.getElementsByClassName (`footnotes`)

   for (const f of footnotes) {
      f.style.color = `black`
      f.style.borderTopColor = `black`
   }

   const anchortext = document.getElementsByTagName (`a`)
   for (const a of anchortext) {
      a.style.color = `black`
   }

   const bg = document.body.style.backgroundColor

   const phone_cnv = document.getElementById (`phone_cnv`)
   const phone_ctx = phone_cnv.getContext (`2d`)

   const tape_cnv = document.getElementById (`tape_cnv`)
   const tape_ctx = tape_cnv.getContext (`2d`)

   const book_cnv = document.getElementById (`book_cnv`)
   const book_ctx = book_cnv.getContext (`2d`)

   const marx_path = `/240325/karl_marx.png`

   const book_glitcher = await Glitcher.instantiate (book_ctx, bg, 2, marx_path)
   const tape_glitcher = await Glitcher.instantiate (tape_ctx, bg, 4, marx_path)
   const phone_glitcher = await Glitcher.instantiate (phone_ctx, bg, 8, marx_path)

   const background = ctx => {
      ctx.fillStyle = document.body.style.backgroundColor
      ctx.fillRect (0, 0, ctx.canvas.width, ctx.canvas.height)
   }
   
   const phone = new Image ()
   phone.src = `/240325/phone.png`

   const tape = new Image ()
   tape.src = `/240325/cassette.png`

   const book = new Image ()
   book.src = `/240325/books.png`

   const draw_frame = () => {

      phone_glitcher.draw ()
      const { data } = phone_ctx.getImageData (0, 0, phone_cnv.width, phone_cnv.height)
      const i_buf = data.map ((v, i) => {
         return i % 4 != 3 ? 255 - v : 255
      })
      console.dir (i_buf)
      const i_data = phone_ctx.createImageData (phone_cnv.width, phone_cnv.height)
      i_data.data.set (i_buf)
      const inv = new Image (phone_cnv.width, phone_cnv.height)
      inv.src = i_data
      // console.dir (inv)
      phone_ctx.drawImage (phone, 0, 0, phone_cnv.width, phone_cnv.height)
      phone_ctx.drawImage (inv, 0, 0, phone_cnv.width, phone_cnv.height)

      tape_glitcher.draw ()
      tape_ctx.drawImage (tape, 0, 0, phone_cnv.width, phone_cnv.height)

      book_glitcher.draw ()
      book_ctx.drawImage (book, 0, 0, phone_cnv.width, phone_cnv.height)

      requestAnimationFrame (draw_frame)
   }
   draw_frame ()

</script>

