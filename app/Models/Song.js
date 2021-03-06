export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
    this.sandboxSong = false
    if (data.user)
      this.sandboxSong = true

  }

  get Template() {
    return `
    <div class="card" style="width: 30rem; height: 50rem;">
    <img src="${this.albumArt}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title")">${this.artist} - ${this.title}</h5>
      <p class="card-text">Album: ${this.album} | Buy now $${this.price}</p>
      <audio controls>
  <source src="${this.preview}" type="audio/ogg">
  <source src="${this.preview}" type="audio/mpeg">
  Your browser does not support the audio tag.
</audio>
      ${this.activeButton}
    </div>
  </div>
        `;
  }

  get activeButton() {
    if (this.sandboxSong) {
      return ` <button class="btn btn-danger" onclick="app.playlistController.removeSong('${this.id}')"> Remove </button>`
    } return ` <button class="btn btn-success" onclick="app.playlistController.addSong()"> Add </button>`
  }
}
