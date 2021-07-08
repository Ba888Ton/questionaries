module.exports = {
    css: {
        sourceMap: true,

      loaderOptions: {
        sass: {
            additionalData: `@import "@/assets/scss/_variables.scss"`
        },
        scss: {
            prependData: `@import "@/assets/scss/_variables.scss";`
        }
      }
    }
  }