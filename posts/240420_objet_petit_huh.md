---
title: Objet Petit Huh
published_at: 2024-04-02
snippet: What hides in happiness?
disable_html_sanitization: true
allow_math: true
---

<div style="text-align: center; font-size: xxx-large;" id="emoji">&#129325</div>


<script type="module">
   const title = document.getElementsByTagName (`h1`).item (0)
   const emoji = document.getElementById (`emoji`)

const modes = [ `.?!`, [ `&#128528`, `&#128562`, `&#129325` ] ]

   let frame_count = 0

   const draw_frame = () => {
      const i = frame_count++ % modes[0].length
      title.innerText = `Objet Petit Huh${ modes[0][i] }`
      // emoji.innerText = modes[1][i]
      setTimeout (draw_frame, 2000)
   }

   draw_frame ()
</script>