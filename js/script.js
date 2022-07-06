"use strict"

let playBtn = document.getElementById("play_btn");
let pauseBtn = document.getElementById("pause_btn");
let audioPlayer = document.getElementById("audio_player");
let random = document.getElementById("random")
let next = document.getElementById("next")
let back = document.getElementById("back")



let playMusic = document.querySelectorAll("#circle");

let progressBar = document.querySelector("#progress_bar");
let progressBar1 = document.querySelector("#progress_bar_1");
let progressBarRange = progressBar1.querySelector("input");
let barProgress = document.querySelector("#bar_progress");

let musicCurrentTime = document.getElementById("current_time");
let duration = document.getElementById("duration");

let volumeControl = document.querySelector("#volume_control");
let volumePanel = document.querySelector("#volume_panel");
let volumeRange = volumePanel.querySelector("input");
let volumeProgress = document.querySelector("#volume_progress");
let volume = document.getElementById("volume");

let musicName = document.getElementById("music_name")
let artistPlayer = document.getElementById("artist_player")
let imgPlayer = document.getElementById("album_image_player")



let allMusics = JSON.parse(localStorage.getItem("allMusics"))
let allMusicsRadom = JSON.parse(localStorage.getItem("allMusics"))


let file = ""
let music = ""
let artist = ""
let img = ""
let musicIndex = 0

pauseBtn.addEventListener("click", pauseSong);
playBtn.addEventListener("click", playSong);



playMusic.forEach(play => {
    play.addEventListener("click", () => {

        audioPlayer.load()

        if(play.dataset.album=== "qqvjfa"){
        if (randomBtn === false) {
            file = allMusics[0].song
            music = allMusics[0].music
            artist = allMusics[0].artist
            img = play.dataset.img


        }
        else
            file = allMusicsRadom[0].song
        music = allMusicsRadom[0].music
        artist = allMusicsRadom[0].artist
    
    }

    else
    file = play.dataset.song
    music = play.dataset.music
    artist = play.dataset.artist
    img = play.dataset.img


    createMusicPlayer(music, artist, img)

    playSong(file)

    currentProgressBar()


    


        playBtn.style.display = "none";
        pauseBtn.style.display = "flex";

    }

    
    )
})

function createMusicPlayer(music, artist, img) {

    musicName.innerHTML = music
    artistPlayer.innerHTML = artist
    imgPlayer.src = img


}


function playSong(file) {

    audioPlayer.innerHTML = `<source src="` + file + `" type="audio/mp3" />`
    audioPlayer.play()
    playBtn.style.display = "none";
    pauseBtn.style.display = "flex";

}




function pauseSong() {

    audioPlayer.pause()

    playBtn.style.display = "flex";
    pauseBtn.style.display = "none";

}


random.addEventListener("click", musicasAleatorias)

let randomBtn = false

function musicasAleatorias() {

    let currentIndex = allMusicsRadom.length
    let randomIndex = 0


    if (randomBtn === false) {

        random.style.opacity = "1"

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [allMusicsRadom[randomIndex], allMusicsRadom[currentIndex]] = [allMusicsRadom[currentIndex], allMusicsRadom[randomIndex]]
        }

        return randomBtn = true
    }

    if (randomBtn === true) {

        random.style.opacity = "0.6"

        return randomBtn = false

    }

}







// PROGRESS BAR
function currentProgressBar() {

    progressBarRange.value = 0
    barProgress.style.width = 0 + "%"

    setInterval((a) => {

        barProgress.style.width = ((audioPlayer.currentTime / audioPlayer.duration) * 100) + "%"

        musicCurrentTime.innerHTML = (audioPlayer.currentTime / 60).toFixed(2)
        duration.innerHTML = (audioPlayer.duration / 60).toFixed(2)


    }, 1000

    )

    setInterval((a) => {
        progressBarRange.value = ((audioPlayer.currentTime / audioPlayer.duration) * 100)

        if (musicCurrentTime.innerHTML === duration.innerHTML) {
            nextMusic()
        }

    }, 2000)

}


progressBarRange.addEventListener("input", (e) => {

    let musicDuration = audioPlayer.duration / 100

    barProgress.style.width = progressBarRange.value + "%"
    audioPlayer.currentTime = progressBarRange.value * musicDuration
})







// VOLUME


volumeRange.addEventListener("input", (e) => {

    volumeProgress.style.width = volumeRange.value + "%"
    audioPlayer.volume = volumeRange.value / 100

    if (audioPlayer.volume === 0) {
        volume.src = "./Assets/Player icon/mute.png"
    }
    else volume.src = "./Assets/Player icon/volume.png"

}, false)


volumeRange.addEventListener("mouseover", (e) => {
    volumeProgress.style.backgroundColor = "#1db954"
})

volumeRange.addEventListener("mouseout", (e) => {
    volumeProgress.style.backgroundColor = "#fff"


})




next.addEventListener("click", nextMusic)

function nextMusic() {

    currentProgressBar()
    audioPlayer.load()

    musicIndex++


    if (musicIndex === allMusics.length) {
        music = allMusics[0].music
        artist = allMusics[0].artist
        file = allMusics[0].song
        img = playMusic.dataset.img

        createMusicPlayer(music, artist, img)
        playSong(file)

        musicIndex = 0
        return
    }


    if (randomBtn === false) {

        music = allMusics[musicIndex].music
        artist = allMusics[musicIndex].artist
        file = allMusics[musicIndex].song
    }
    else
        music = allMusicsRadom[musicIndex].music
    artist = allMusicsRadom[musicIndex].artist
    file = allMusicsRadom[musicIndex].song
    img = playMusic[0].dataset.img

    createMusicPlayer(music, artist, img)
    playSong(file)

}






back.addEventListener("click", (e => {

    if (musicIndex > 0) {
        audioPlayer.load()

        musicIndex--



        if (randomBtn === false) {

            music = allMusics[musicIndex].music
            artist = allMusics[musicIndex].artist
            file = allMusics[musicIndex].song
        }
        else
            music = allMusicsRadom[musicIndex].music
        artist = allMusicsRadom[musicIndex].artist
        file = allMusicsRadom[musicIndex].song

        img = playMusic[0].dataset.img

        createMusicPlayer(music, artist, img)
        playSong(file)
    
    
    }
}))