---
title: Fruiting Body
published_at: 2024-10-27
snippet: the spore-producing organ of a fungus
disable_html_sanitization: true
allow_math: false
---
<style>
   .button-35 {
      align-items: center;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: transparent 0 0 0 3px,rgba(18, 18, 18, .1) 0 6px 20px;
      box-sizing: border-box;
      color: #121212;
      cursor: pointer;
      display: inline-flex;
      flex: 1 1 auto;
      font-family: Inter,sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      justify-content: center;
      line-height: 1;
      margin: 0;
      outline: none;
      padding: 1rem 1.2rem;
      text-align: center;
      text-decoration: none;
      transition: box-shadow .2s,-webkit-box-shadow .2s;
      white-space: nowrap;
      border: 0;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
   }

   .button-35:hover {
      box-shadow: #121212 0 0 0 3px, transparent 0 0 0 0;
   }
</style>

<!-- HTML !-->
<button class="button-35" role="button" id="play_button" >PLAY</button>

<script>

   const a = {
      is_init: false,
      ctx: new AudioContext ()
   }

   a.ctx.suspend ()

   const init_audio = () = {
      await a.ctx.resume ()
      a.is_init = true
      console.dir (a.ctx.state)
   }

   const play_btn = document.getElementById (`play_button`)

   play_btn.onpointerdown = async () => {
      if (!a.is_init) init_audio ()
   }

</script>

