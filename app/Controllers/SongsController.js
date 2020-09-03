import songsService from "../Services/SongsService.js";
import { ProxyState } from "../AppState.js"

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = ""
  let res = ProxyState.songs
  res.forEach(r => template += `<img src="${r.albumArt}" onclick="app.songsController.viewSong(${r._id})">${r.artist} - ${r.title}</img>`)
  document.getElementById("songs").innerHTML = template
}

function _drawActive() {
  if (ProxyState.activeSong) {
    document.getElementById("active-song").innerHTML = ProxyState.activeSong.activeTemplate
  } else document.getElementById("active-song").innerHTML = ""
}
/**Draws the Users saved songs to the page */
//function _drawPlaylist() { }

//Public
export default class SongsController {
  constructor() {
    ProxyState.on("songs", _drawResults)
    ProxyState.on("activeSong", _drawActive)
    this.getSong()
    //TODO Don't forget to register your listeners and get your data
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songsService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }
  getSong() {
    try {
      songsService.getSong()
    } catch (error) {
      console.error(error)
    }
  }
  viewSong(songId) {
    try {
      songsService.viewSong(songId)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) { }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }
}
