<template>
  <canvas></canvas>
</template>

<script>
  // https://github.com/svga/SVGAPlayer-Web-Lite
  import {Downloader, Parser, Player} from 'svga.lite'

  const downloader = new Downloader()

  async function parserSvgaData(src) {
    const parser = new Parser()
    const svgaFile = await downloader.get(src)
    return await parser.do(svgaFile)
  }

  export default {
    data() {
      return {
        player: null,
      }
    },
    props: {
      src: {
        type: String,
        required: true
      }
    },
    async mounted() {
      const player = this.player = new Player(this.$el)
      const data = await parserSvgaData(this.src)
      await player.mount(data)
      // 事件回调
      player
          .$on('start', () => this.$emit('start'))
          .$on('pause', () => this.$emit('pause'))
          .$on('stop', () => this.$emit('stop'))
          .$on('end', () => this.$emit('end'))
          .$on('clear', () => this.$emit('clear'))
          .$on('process', () => this.$emit('process', player.progress))

      player.start()
    },
    methods: {
      start() {
        if (this.player) this.player.start()
      },
      pause() {
        if (this.player) this.player.pause()
      },
      stop() {
        if (this.player) this.player.stop()
      },
      clear() {
        if (this.player) {
          this.player.clear()
          this.player = null
        }
      },
    },
    beforeDestroy() {
      this.clear()
    }
  }
</script>

<style lang='scss' module>

</style>
