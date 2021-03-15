module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080, // CHANGE YOUR PORT HERE!
        https: true,
        hotOnly: false,
    },
    pwa: {
        name: 'Botonera Pipis',
        themeColor: "#000000",
        msTileColor: "#000000",
        appleMobileWebAppCapable: "yes",
        manifestOptions: {
            background_color: "#000000"
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            filename: 'index.html',
            title: 'Botonera Pipis',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    }
}
