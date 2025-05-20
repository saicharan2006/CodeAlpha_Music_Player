// For  current time
const realTime = document.getElementById('realTime');
let now = new Date();
let hours = now.getHours();       
let minutes = now.getMinutes();   



setInterval(() => {
  let now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
   
  realTime.innerHTML = `${hours}:${minutes}`;
 
}, 1000); 

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}



/// Song list 
const playlist = [
  {
    title: "Position",
    singer: "Ariana Grande",
    url: "audio/Ariana_Grande_-_Positions.mp3"
  },
  {
    title: "Starboy",
    singer: "The Weekend,Draft Punk",
    url: 'audio/Starboy English DJ Remix Mp3 Song Download(DjJpSwami.Com).mp3'
  },
  {
    title: "Harleys In Hawaii",
    singer: "Katy Perry",
    url: "audio/Harleys In Hawaii Slowed TikTok DJ Remix 2022(DjJpSwami.Com).mp3"
  },
  {
    title: "Attention",
    singer: "Charlie Puth",
    url: "audio/Attention-(Mr-Jat.in).mp3"
  },
];

let currentIndex = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progressBar = document.getElementById("progressBar");
const time = document.getElementById("time");
const title = document.getElementById("songTitle");
const singer = document.getElementById("singerName");
const songImage = document.getElementById("songImage");

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.url;
  title.textContent = song.title;
  singer.textContent = song.singer;
  playIcon.setAttribute("name", "play-sharp");
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playIcon.setAttribute("name", "pause");
    songImage.classList.add("rotating");
  } else {
    audio.pause();
    playIcon.setAttribute("name", "play-sharp");
    songImage.classList.remove("rotating");
  }
}

playBtn.addEventListener("click", playPause);

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  audio.play();
  playIcon.setAttribute("name", "pause");
  songImage.classList.add("rotating");
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  audio.play();
  playIcon.setAttribute("name", "pause");
  songImage.classList.add("rotating");
});

audio.addEventListener("loadedmetadata", () => {
  progressBar.max = audio.duration;
  time.textContent = `00:00 / ${formatTime(audio.duration)}`;
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = audio.currentTime;
  time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

audio.addEventListener("ended", () => {
  nextBtn.click(); 
});


loadSong(currentIndex);

const songListDiv = document.getElementById("songList");
const listBtn = document.getElementById("list");





listBtn.addEventListener("click", (e) => {
  e.stopPropagation(); 
  songListDiv.classList.toggle("visible");
});



document.addEventListener("click", (e) => {
  if (!songListDiv.contains(e.target) && e.target !== listBtn) {
    songListDiv.classList.remove("visible");
  }
});

songListDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const index = parseInt(e.target.getAttribute("data-index"));
    currentSong = index;
    loadSong(currentSong);
    playSong();
    songListDiv.classList.remove("visible");
  }
});
