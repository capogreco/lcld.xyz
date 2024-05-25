---
title: Object Complicity I
published_at: 2024-04-02
snippet: comically oversized family utility vehicle
disable_html_sanitization: true
allow_math: true
---

<img id="cofuv" style="background-color: transparent;" src="/240401/cofuv.png" />


<script type="module">

   document.body.style.height = `${ innerHeight }px`

   window.onresize = () => {
      document.body.style.height = `${ innerHeight }px`
   }

   const img = document.getElementById (`cofuv`)

   const a_ctx = new AudioContext ()

   const filter = new BiquadFilterNode (a_ctx)
   filter.type = `peaking`
   filter.gain.value = 12
   filter.frequency.value = 440
   filter.Q.value = 1

   const comp = new DynamicsCompressorNode (a_ctx, {
      threshold: -24,
      knee: 24,
      ratio: 18,
      attack: 0,
      release: 0.2,
   })


   filter.connect (comp).connect (a_ctx.destination)



   const get_file = async filepath => {
      const response = await fetch (filepath)
      const array_buf = await response.arrayBuffer ()
      const audio_buf = await a_ctx.decodeAudioData (array_buf)
      return audio_buf
   }

   const ram_trx_buf = await get_file (`/240401/ram_trx.mp3`)
   let source_node

   let is_playing = false

   img.onpointerdown = e => {
      if (is_playing == true) return

      e.stopPropagation ()
      e.preventDefault ()

      const x = e.clientX * 2 / innerWidth - 1
      const y = e.clientY * -2 / innerHeight + 1

      source_node = new AudioBufferSourceNode (a_ctx, {
         buffer: ram_trx_buf
      })
      source_node.connect (filter)
      source_node.loop = true
      source_node.loopStart = 2.656
      source_node.loopEnd = 5.404
      source_node.start ()

      const now = a_ctx.currentTime

      source_node.playbackRate.cancelScheduledValues (now)
      source_node.playbackRate.setValueAtTime (source_node.playbackRate.value, now)
      source_node.playbackRate.exponentialRampToValueAtTime (2 ** y, now + 0.02)

      filter.frequency.cancelScheduledValues (now)
      filter.frequency.setValueAtTime (filter.frequency.value, now)
      filter.frequency.exponentialRampToValueAtTime (440 * (4 ** x), now + 0.02)

      is_playing = true
      console.dir (`is playing!`)
      document.body.style.backgroundColor = `black`
      img.style.opacity = 0
   }

   document.body.onpointerup = e => {
      if (is_playing == false) return

      source_node.stop ()

      is_playing = false
      console.dir (`stopping!`)
      document.body.style.backgroundColor = `hsl(${ Math.random () * 360 }, 100%, 80%)`
      img.style.opacity = 1
   }

   document.body.onpointermove = e => {
      if (!is_playing) return

      const x = e.clientX * 2 / innerWidth - 1
      const y = e.clientY * -2 / innerHeight + 1

      const now = a_ctx.currentTime

      source_node.playbackRate.cancelScheduledValues (now)
      source_node.playbackRate.setValueAtTime (source_node.playbackRate.value, now)
      source_node.playbackRate.exponentialRampToValueAtTime (2 ** y, now + 0.02)

      filter.frequency.cancelScheduledValues (now)
      filter.frequency.setValueAtTime (filter.frequency.value, now)
      filter.frequency.exponentialRampToValueAtTime (440 * (4 ** x), now + 0.02)
   }
</script>