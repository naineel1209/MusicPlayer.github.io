const music = document.querySelector("#music");

const image = document.querySelector("#image");
const artistName = document.querySelector("#artistName");
const songName = document.querySelector("#songName");

const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");

//Audio File
const audioDB = [
  {
    songName: "Blinded By The Lights",
    songUrl: "./music/blinding.mp3",
    artistName: "The Weeknd",
    imageCover: "./Images/pexels-2.jpg",
  },
  {
    songName: "I've Told Every Little Stars",
    songUrl: "./music/every-star.mp3",
    artistName: "Linda Scott",
    imageCover: "./Images/pexels-3.jpg",
  },
  {
    songName: "Harleys in Hawaii",
    songUrl: "./music/harleys.mp3",
    artistName: "Katy Perry",
    imageCover: "./Images/pexels-4.jpg",
  },
  {
    songName: "Suffer With Me",
    songUrl: "./music/suffer.mp3",
    artistName: "Suffer With Me",
    imageCover: "./Images/pexels-5.jpg",
  },
  {
    songName: "Sunflower - Into the Spiderverse",
    songUrl: "./music/sunflower.mp3",
    artistName: "Swae Lee",
    imageCover: "./Images/pexels-6.jpg",
  },
  {
    songName: "Save Your Tears",
    songUrl: "./music/tears.mp3",
    artistName: "The Weeknd",
    imageCover: "./Images/pexels-7.jpg",
  },
  {
    songName: "Believers",
    songUrl: "./music/beleiver.mp3",
    artistName: "Imagine Dragons",
    imageCover: "./Images/pexels-1.jpg",
  },
];

//!Getting the music list and appending it music list html
const musicList = document.querySelector(".music_list");

//! Music List(Play List)
audioDB.forEach((ele, index) => {
  // console.log(index, ele.artistName, ele.songName);

  const newDiv = document.createElement("div");
  newDiv.classList.add("music_list_item");
  newDiv.innerText = `${index + 1} - ${ele.artistName} - ${ele.songName}`;

  musicList.append(newDiv);
});

musicList.childNodes.forEach((ele, index) => {
  console.log(ele, index);

  ele.addEventListener("click", () => {
    audioIndex = index;
    loadMusic(audioDB[audioIndex]);
    isPlaying ? playMusic() : pauseMusic();
  });
});



/**
 *
 * Formula to achieve the reverse Modulo effect
 * (len + index - 1) % len
*
*/

let audioLen = audioDB.length; //helps in reloading the last song
let audioIndex = 0; //loads the first audio from DB
let isPlaying = false;


//1. Load the music at audioIndex
function loadMusic(audio) {
  console.log(audio.songName, audioIndex)

  //adding the properties for audio
  music.src = audio.songUrl;
  songName.innerText = audio.songName;
  artistName.innerText = audio.artistName;
  image.src = audio.imageCover;

  musicList.childNodes.forEach(function(ele, index){
    ele.classList.remove("colorChange");
    
    if(audioIndex === index){
      console.log("Inside");
      ele.classList.add("colorChange");
    }
  })
}

loadMusic(audioDB[audioIndex]);

function pauseMusic() {
  //pause the music
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  isPlaying = false;

  //remove the rotate animation
  console.log("remove rotate animation");
  image.classList.remove("rotate");
}

function playMusic() {
  isPlaying = true;

  //Play the music
  music.play();

  //Change the play button to pause
  play.classList.replace("fa-play", "fa-pause");

  //add the rotate class to the image
  image.classList.add("rotate");
}

//2. Hit the play button => play the music.
play.addEventListener("click", () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

//3. Hit the prev button => go to previous song
prev.addEventListener("click", function (e) {
  audioIndex = (audioIndex - 1 + audioLen) % audioLen;
  loadMusic(audioDB[audioIndex]);
  progressDiv.style.width = `0%`;
  music.currentTime = 0;
  isPlaying ? playMusic() : pauseMusic();
});

//4. Hit the next button => go to next song
next.addEventListener("click", function (e) {
  audioIndex = (audioIndex + 1) % audioLen;
  loadMusic(audioDB[audioIndex]);
  progressDiv.style.width = `0%`;
  music.currentTime = 0;
  isPlaying ? playMusic() : pauseMusic();
});

//5. If the current song finishes playing
music.addEventListener("ended", function () {
  setTimeout(function () {
    audioIndex = (audioIndex + 1) % audioLen;
    loadMusic(audioDB[audioIndex]);
    isPlaying ? playMusic() : pauseMusic();
  }, 1000);
});

//! progressDiv work
const progressDiv = document.querySelector(".progressDiv");
const progressBar = document.querySelector(".progressBar");

const ctHour = document.querySelector("#currentTime_hour");
const ctMins = document.querySelector("#currentTime_mins");
const dHour = document.querySelector("#duration_hour");
const dMins = document.querySelector("#duration_mins");

music.addEventListener("timeupdate", function (e) {
  // console.log('music update', e, music);
  const { currentTime, duration } = music;
  let percent = (currentTime / duration) * 100;

  progressDiv.style.width = `${percent}%`;

  // ! Update the timing
  if (Math.round(currentTime / 60) <= 9) {
    ctHour.innerText = `0${Math.round(currentTime / 60)}`;
  } else {
    ctHour.innerText = `${Math.round(currentTime / 60)}`;
  }
  if (Math.round(currentTime % 60) <= 9) {
    ctMins.innerText = `0${Math.round(currentTime % 60)}`;
  } else {
    ctMins.innerText = `${Math.round(currentTime % 60)}`;
  }
  if (Math.round(duration / 60) <= 9) {
    console.log(duration / 60);
    dHour.innerText = `0${Math.round(duration / 60)}`;
  } else {
    dHour.innerText = `${Math.round(duration / 60)}`;
  }
  if (Math.round(duration % 60) <= 9) {
    dMins.innerText = `0${Math.round(duration % 60)}`;
  } else {
    dMins.innerText = `${Math.round(duration % 60)}`;
  }

  console.log(currentTime, duration);
});

//! Touching the progress div changes the current time of the song
progressBar.addEventListener("click", function (e) {
  let offset = e.originalTarget.offsetWidth,
    layer = e.layerX;
  console.log(e.originalTarget.offsetWidth + "px");
  console.log(e.layerX + "px");

  let percent = (layer / offset) * 100;
  progressDiv.style.width = `${percent}%`;

  const { duration } = music;
  music.currentTime = (duration * percent) / 100;
  console.log(music.currentTime);
});




