import SongsController from "./Controllers/SongsController.js";
import PlaylistController from "./Controllers/PlaylistController.js"

class App {
  songsController = new SongsController();
  playlistController = new PlaylistController();
}

window["app"] = new App();
