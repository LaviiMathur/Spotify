var currentSong = "";
var currentArtist;
var audio = new Audio();
let progress = 0;
let mute = document.querySelector(".mute");
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let pause = document.querySelector(".play");

let timeline = document.querySelector(".timeline");

var songArray = [
  {
    name: "Aashqui te loan",
    artist: "Hardy Sandhu",
  },
  {
    name: "Chitte Suit Te",
    artist: "Geeta Zaildar",
  },
  {
    name: "Dhol jageero da",
    artist: "Master Saleem",
  },
  {
    name: "Dil de de",
    artist: "Garry Sandhu",
  },
  {
    name: "Dil lutiya",
    artist: "Jazzy B",
  },

  {
    name: "Jatt kuwar",
    artist: "Sippy Gill",
  },
  {
    name: "Mitran da naa chalda",
    artist: "Harejeet Harman",
  },
  {
    name: "Mittran di chhatri",
    artist: "Babbu Maan",
  },
  {
    name: "Panga",
    artist: "Diljeet and Yo Yo Honey Singh",
  },
  {
    name: "Sohneyo narazgi te nahi",
    artist: "Soni Pabla",
  },
  {
    name: "Youngster returns",
    artist: "Jassie Gill and Babbal Rai",
  },
];
var randomIndex;

//cover clicked song
function getName(container) {
  currentSong = container.querySelector(".songName").textContent;
  currentArtist = container.querySelector(".artistName").textContent;

  play(currentSong, currentArtist);
}

//shuffle play

for (let k = 0; k < document.querySelectorAll(".shuffle").length; k++) {
  document.querySelectorAll(".shuffle")[k].addEventListener("click", () => {
    randomIndex = Math.floor(Math.random() * songArray.length);
    randomSong = songArray[randomIndex];
    currentSong = randomSong.name;
    currentArtist = randomSong.artist;
    play(currentSong, currentArtist);

    changeBanner(currentSong, currentArtist);
  });
}

//play audio
function play(playingSong, playingArtist) {
  audio.src = "songs/" + playingSong + ".mp3";
  changeBanner(playingSong, playingArtist);
  audio.play();
  pause.innerText = "pause";

  //update duration
  setInterval(() => {
    document.querySelector(".timestamp").innerHTML =
      convertTime(audio.currentTime) + "/" + convertTime(audio.duration);
  }, 1000);
}
//update seekbar
audio.addEventListener("timeupdate", () => {
  progress = parseInt((audio.currentTime / audio.duration) * 100);
  timeline.value = progress;
});
timeline.addEventListener("change", () => {
  audio.currentTime = parseInt((timeline.value * audio.duration) / 100);
});
//duration time convertion
function convertTime(time) {
  var mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  var secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  return mins + ":" + secs;
}
//volume

function changevolume(amount) {
  audio.volume = amount;
}
//banner
function changeBanner(songPlaying, artist) {
  document.querySelector(".smallbanner").src = "covers/" + songPlaying + ".jpg";
  document.querySelector(".playingSongName").innerHTML = songPlaying;
  document.querySelector(".playingArtistName").innerHTML = artist;
}
//control buttons

//play-pause
pause.addEventListener("click", () => {
  if (audio.paused || audio.currentTime <= 0) {
    pause.innerText = "pause";
    audio.play();
  } else {
    pause.innerText = "play_arrow";
    audio.pause();
  }
  buttonanimation(pause);
});

//previous
previous.addEventListener("click", () => {
  buttonanimation(previous);
  randomIndex--;
  randomSong = songArray[randomIndex];
  currentSong = randomSong.name;
  currentArtist = randomSong.artist;
  play(currentSong, currentArtist);
});
//next
next.addEventListener("click", () => {
  buttonanimation(next);
  randomIndex++;
  randomSong = songArray[randomIndex];
  currentSong = randomSong.name;
  currentArtist = randomSong.artist;
  play(currentSong, currentArtist);
});
//mute

mute.addEventListener("click", () => {
  buttonanimation(mute);
  if (audio.volume > 0) {
    audio.volume = 0;
    mute.innerText = "volume_off";
  } else {
    audio.volume = 0.5;
    mute.innerText = "volume_up";
  }
});
//button animation
function buttonanimation(button) {
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}
