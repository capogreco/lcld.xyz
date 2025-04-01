---
title: How to Kill a Zombie
published_at: 2024-08-31
snippet: an illustrated guide
disable_html_sanitization: true
allow_math: false
---

<canvas id="glitch_loop_oscillator"></canvas>

<!-- Audio from [here](https://youtu.be/49Tuck7eMqo). -->
Audio from [here](https://www.youtube.com/watch?v=whzD1EPBVLk&t=3657s).

<script>
   const cnv = document.getElementById (`glitch_loop_oscillator`)
   cnv.width = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16

   const ctx = cnv.getContext (`2d`)
   ctx.fillStyle = `black`
   ctx.fillRect (0, 0, cnv.width, cnv.height)

   const a = {
      ctx: new AudioContext (),
      phase: 0
   }

   a.ctx.suspend ()

   const point_phase = e => {
      const { target: { 
         offsetLeft, offsetTop, offsetWidth, offsetHeight 
      } } = e

      const abs = {
         x: e.clientX ? e.clientX : e.touches[0].clientX,
         y: e.clientY ? e.clientY : e.touches[0].clientY
      }

      const x = (abs.x - offsetLeft) / offsetWidth
      const y = (abs.y - offsetTop)  / offsetHeight

      return { x, y }
   }

   const midi_to_freq = n => 440 * Math.pow (2, (n - 69) / 12)

   const notes = {
      root: 78,
      chord: [ -4, -2, 2, 4, 6, 7, 9, 11 ],
      fine_tune: 1 / 3,
      i: 0,
   }

   notes.next = () => {
      const f = midi_to_freq (notes.root + notes.chord[notes.i] + notes.fine_tune)
      notes.i++
      notes.i %= notes.chord.length
      return f
   }

   const init_audio = async () => {
      a.ctx.resume ()
      
      const impulse_response = await fetch (`reverb/R1NuclearReactorHall.m4a`)
      const array_buf = await impulse_response.arrayBuffer ()
      const audio_buf = await a.ctx.decodeAudioData (array_buf)

      a.rev = a.ctx.createConvolver ()
      a.rev.buffer = audio_buf

      a.wet = a.ctx.createGain ()
      a.wet.gain.value = 0
      a.wet.connect (a.rev).connect (a.ctx.destination)

      const asset = await fetch (`/240831/relation_defamiliarised_mono.mp3`)
      // const asset = await fetch (`/240831/we_might_not_like_it.mp3`)
      const array_buffer = await asset.arrayBuffer ()
      const audio_buffer = await a.ctx.decodeAudioData (array_buffer)
      const audio_data = audio_buffer.getChannelData(0)

      a.wave_form = []

      for (let x = 0; x < cnv.width; x++) {
         const norm_wave = audio_data[Math.floor (audio_data.length * x / cnv.width)]
         const y = (1 + norm_wave) * (cnv.height / 2)
         a.wave_form.push (y)
      }

      await a.ctx.audioWorklet.addModule (`scripts/glitch_loop_osc.js`)
      a.sample = new AudioWorkletNode (a.ctx, `glitch_loop_osc`, {
         processorOptions: {
            audio_data
         }
      })

      a.sample.port.onmessage = e => {
         a.phase = e.data
      }

      a.sample.connect (a.ctx.destination)
      a.sample.connect (a.wet)

      a.freq  = await a.sample.parameters.get (`freq`)
      a.fulcrum = await a.sample.parameters.get (`fulcrum`)
      a.open = await a.sample.parameters.get (`open`)

      draw_frame ()
   }

   cnv.onpointerdown = e => {
      if (a.ctx.state != `running`) init_audio ()
      else {
         const t = a.ctx.currentTime

         a.freq.setValueAtTime (notes.next (), t)

         a.fulcrum.cancelScheduledValues (t)
         a.fulcrum.setValueAtTime (a.phase, t)
         a.fulcrum.linearRampToValueAtTime (point_phase (e).x, t + 2)

         a.open.cancelScheduledValues (t)
         a.open.setValueAtTime (0, t)
         a.open.linearRampToValueAtTime (1, t + 5)
         a.open.linearRampToValueAtTime (0, t + 10)
         a.open.linearRampToValueAtTime (1, t + 20)

         a.wet.gain.cancelScheduledValues (t)
         a.wet.gain.linearRampToValueAtTime (0, t + 0.2)
         a.wet.gain.setValueAtTime (0, t + 5)
         a.wet.gain.linearRampToValueAtTime (1, t + 10)
         a.wet.gain.linearRampToValueAtTime (0, t + 20)
      }
   }

   const draw_frame = milli_s => {
      requestAnimationFrame (draw_frame)
      // const t = milli_s * 0.001

      a.sample.port.postMessage (`get_phase`)
      
      ctx.clearRect (0, 0, cnv.width, cnv.height)

      ctx.beginPath ()
      a.wave_form.forEach ((y, x) => {
         ctx.moveTo (x, cnv.height / 2)
         ctx.lineTo (x, y)
      })

      ctx.strokeStyle = `black`
      ctx.stroke ()   

      ctx.beginPath ()
      const x = Math.floor (a.phase * cnv.width)
      ctx.moveTo (x, 0)
      ctx.lineTo (x, cnv.height)

      ctx.strokeStyle = `red`
      ctx.stroke ()
   }   
</script>
