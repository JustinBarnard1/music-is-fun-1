import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandboxApi } from "./AxiosService.js";

class PlaylistService {
    setActive(_id) {
        ProxyState.activeSong = ProxyState.playlist.find(p => p._id == _id)
    }
    async getMySong() {
        let res = await sandboxApi.get('')
        ProxyState.playlist = res.data.data.map(s => new Song(s))
    }
    async addSong() {
        let res = await sandboxApi.post('', ProxyState.activeSong)
        ProxyState.playlist = [...ProxyState.playlist, new Song(res.data.data)]
    }
    async removeSong() {
        await sandboxApi.delete(ProxyState.activeSong._id)
        ProxyState.playlist = ProxyState.playlist.filter(s => s._id != ProxyState.activeSong._id)
        ProxyState.activeSong = null
    }
}

const playlistService = new PlaylistService()
export default playlistService