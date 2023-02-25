// This is just a sample app. You can structure your Neutralinojs app code as you wish.
// This example app is written with vanilla JavaScript and HTML.
// Feel free to use any frontend framework you like :)
// See more details: https://neutralino.js.org/docs/how-to/use-a-frontend-library

// const appdata = (process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")) + `\\${require(__dirname + '/package.json').name}\\`


function setTray() {
    if(NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }
    let tray = {
        icon: "/app/assets/icons/icon-512.png",
        menuItems: [
            {id: "OPEN", text: "Ouvrir"},
            {id: "VERSION", text: "Get version"},
            {id: "SEP", text: "-"},
            {id: "QUIT", text: "Quit"}
        ]
    };
    Neutralino.os.setTray(tray);
}

function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "OPEN":
            Neutralino.window.show();
            break;
        case "VERSION":
            Neutralino.os.showMessageBox("Version information",
                `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
            break;
        case "QUIT":
            Neutralino.app.exit();
            break;
    }
}

function onWindowClose() {
    Neutralino.app.exit();
}

Neutralino.init();

Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}

//Ferme l'application
document.getElementById("close-btn").addEventListener("click",async (e) => {
    await Neutralino.app.exit()
});
// Reduit la fenetre
document.getElementById("minimize-btn").addEventListener("click",async (e) => {
    await Neutralino.window.hide()
});
// Recup le nom du prog pour la fenêtre
Window;addEventListener('load', async _ => {await Neutralino.window.setDraggableRegion('window_move')})