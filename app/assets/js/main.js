// Docs: https://neutralino.js.org/docs/how-to/use-a-frontend-library

// const appdata = (process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")) + `\\${require(__dirname + '/package.json').name}\\`

// color-picker core
import {printColor,svg} from './actions/print-color.js'
import {saveColor,history} from './actions/history.js'
// event
history()
svg('#00000')
// chage la couleur au input donc au choix final, et au pendant le changement donc change
document.getElementById('pick-color').addEventListener('input',e  => printColor(e.target.value))
document.getElementById('pick-color').addEventListener('change',e  => printColor(e.target.value))
// sauvegarde la couleur
document.getElementById('save-color').addEventListener('click',() => saveColor(document.getElementById('pick-color').value))
//Ferme l'application
document.getElementById("close-btn").addEventListener("click",async (e) => {await Neutralino.app.exit()});
// Reduit la fenetre
document.getElementById("minimize-btn").addEventListener("click",async (e) => {await Neutralino.window.hide()});
// Recup le nom du prog pour la fenêtre
Window;addEventListener('load', async _ => {await Neutralino.window.setDraggableRegion('window_move')})

// SystemTray icon

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