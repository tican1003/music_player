/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");

const app = {
  currentIndex: 0,
  isPlaying: false,
  songs: [
    {
      name: "Ngày Không Có Em",
      singer: "Thịnk",
      path: "./assets/music/song1.mp3",
      img: "./assets/img/song1.jpg",
    },
    {
      name: "Nghe Như Tình Yêu",
      singer: "hieuthuhai",
      path: "./assets/music/song2.mp3",
      img: "./assets/img/song2.jpg",
    },
    {
      name: "Đường Tôi Chở Em Về",
      singer: "buitruonglinh",
      path: "./assets/music/song3.mp3",
      img: "./assets/img/song3.jpg",
    },
    {
      name: "An Thần",
      singer: "Low G",
      path: "./assets/music/song4.mp3",
      img: "./assets/img/song4.jpg",
    },
    {
      name: "Love08",
      singer: "Duongg, OD",
      path: "./assets/music/song5.mp3",
      img: "./assets/img/song5.jpg",
    },
    {
      name: "Em Là Hoàng Hôn",
      singer: "Vang, Cloud 5",
      path: "./assets/music/song6.mp3",
      img: "./assets/img/song6.jpg",
    },
    {
      name: "Ôm Em Lần Cuối",
      singer: "NIT, Sing",
      path: "./assets/music/song7.mp3",
      img: "./assets/img/song7.jpg",
    },
    {
      name: "Forget Me Now (Remix)",
      singer: "Cukak, Fishy, Trí Dũng",
      path: "./assets/music/song8.mp3",
      img: "./assets/img/song8.jpg",
    },
    {
      name: "Em Thích",
      singer: "Sean, Lửa",
      path: "./assets/music/song9.mp3",
      img: "./assets/img/song9.jpg",
    },
    {
      name: "Ánh Sao Và Bầu Trời",
      singer: "T.R.I",
      path: "./assets/music/song10.mp3",
      img: "./assets/img/song10.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song) => {
      return `
            <div class="song">
              <div class="thumb"
              style="background-image: url('${song.img}')";">
              </div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
          `;
    });
    $(".playlist").innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lí phóng to / thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lí khi click nút play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi nhạc được phát
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
    };

    // Khi nhạc tạm dừng
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
    };

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lí khi tua nhạc
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url("${this.currentSong.img}")`;
    audio.src = this.currentSong.path;
  },
  start: function () {
    //Định nghĩa các thuộc tính cho Object
    this.defineProperties();

    //Lắng nghe / xử lí các sự kiện (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // Render playlist
    this.render();
  },
};

app.start();
