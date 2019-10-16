const electron = require('electron')
const { app, BrowserWindow } = electron


require('electron-reload')(__dirname, {
    electron: require('${__dirname}/../../node_modules/electron')
})

let mainWindow = null

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        show:false
    })
    
    mainWindow.maximize()

    mainWindow.loadFile(__dirname + '/views/index.html')

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    })

    
})