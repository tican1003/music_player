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

const app = {
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
  handleEvents: function () {
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;

    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
  },
  start: function () {
    this.handleEvents();
    this.render();
  },
};

app.start();
