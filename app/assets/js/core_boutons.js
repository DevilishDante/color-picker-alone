//Ferme l'application
document.getElementById("close-btn").addEventListener("click",async (e) => {
    await Neutralino.app.exit()
});
// Reduit la fenetre
document.getElementById("minimize-btn").addEventListener("click",async (e) => {
    await Neutralino.window.hide()
});
// Recup le nom du prog pour la fenêtre
// Window;addEventListener('load', async _ => {document.getElementById("title_name").textContent = await window.title.name()})
Window;addEventListener('load', async _ => {await Neutralino.window.setDraggableRegion('window_move')})