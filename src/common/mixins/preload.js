export default {
  mounted() {
    if (this.preloadImgs && this.preloadImgs.length > 0) {
      this.startPreload(this.preloadImgs)
    }
  },
  methods: {
    startPreload(list) {
      const fn = () => this.preload(list)
      if (window.requestIdleCallback) {
        window.requestIdleCallback(fn)
      } else {
        setTimeout(() => {
          fn()
        }, 1000)
      }
    },
    preload(list) {
      list.forEach(src => {
        const img = new Image()
        img.src = src
      })
    }
  }
}
