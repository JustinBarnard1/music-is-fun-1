import { ProxyState } from "../AppState.js";
import playlistService from "../Services/PlaylistService.js";

function _drawActive() {
    if (ProxyState.activeSong) {
        document.getElementById("active-song").innerHTML = ProxyState.activeSong.Template
    } else {
        document.getElementById("active-song").innerHTML = ""
    }
}

function _drawMySong() {
    let song = ProxyState.playlist
    let template = ""
    song.forEach(r => template += `<img src="${r.albumArt}" onclick="app.playlistController.setActive('${r._id}')">${r.artist} - ${r.title}</img>`)
    document.getElementById('playlist').innerHTML = template
}

export default class PlaylistController {
    constructor() {
        ProxyState.on("activeSong", _drawActive)
        ProxyState.on("playlist", _drawMySong)
        this.getMySong();
    }
    getMySong() {
        try {
            playlistService.getMySong();
        } catch (error) {
            console.error(error)
        }
    }
    setActive(songId) {
        playlistService.setActive(songId)
    }
    addSong() {
        try {
            playlistService.addSong()
        } catch (error) {
            console.error(error)
        }
    }
    removeSong() {
        try {
            playlistService.removeSong()
        } catch (error) {
            console.error(error)
        }
    }
}