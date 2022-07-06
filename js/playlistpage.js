let playBtn = document.getElementById("play_btn");
let pauseBtn = document.getElementById("pause_btn");
let random = document.getElementById("random")
let next = document.getElementById("next")
let back = document.getElementById("back")
let playAlbum = document.getElementById("circle")

let musicPlaylistPage = document.querySelectorAll("#musics")


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
let audioPlayer = document.getElementById("audio_player");

let musicName = document.getElementById("music_name")
let artistPlayer = document.getElementById("artist_player")


pauseBtn.addEventListener("click", pauseSong);
playBtn.addEventListener("click", playSong);


let file = ""
let artist = ""
let song = ""
let music = ""

let musicIndex = 0

let allMusics = []



class musicFile {
    constructor(artist, song, music) {

        this.artist = artist
        this.song = song
        this.music = music

    }
}



musicPlaylistPage.forEach(musics => {
    artist = musics.dataset.artist
    song = musics.dataset.song
    music = musics.dataset.music

    createMusic(artist, song, music)

})

function createMusic(artist, song, music) {
    allMusics.push(new musicFile(artist, song, music))
}

let allMusicsRadom = [...allMusics]





musicPlaylistPage.forEach(musics => {
    musics.addEventListener("click", (e => {

        audioPlayer.load()

        file = musics.dataset.song
        music = musics.dataset.music
        artist = musics.dataset.artist


        createMusicPlayer(music, artist)

        playSong(file)

        currentProgressBar()


        for (musicIndex in allMusics) {
            if (musics.dataset.song === allMusics[musicIndex].song) {
                return musicIndex
            }
        }


    }))
})


function playSong() {
    audioPlayer.load()
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

function createMusicPlayer(music, artist) {


    musicName.innerHTML = music
    artistPlayer.innerHTML = artist
}

playAlbum.addEventListener("click", (e=>{

    if(randomBtn===false){
    artist = allMusics[0].artist
    file = allMusics[0].song
    music = allMusics[0].music

    playSong(file)
    createMusicPlayer(artist,music)
    currentProgressBar()
    }
    else
    artist = allMusicsRadom[0].artist
    file = allMusicsRadom[0].song
    music = allMusicsRadom[0].music

    playSong(file)
    createMusicPlayer(artist,music)
    currentProgressBar()
}))






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

    return moveArrayElement(allMusicsRadom, musicIndex, 0)



}



nextBtn = false
next.addEventListener("click", nextMusic)

function nextMusic() {

    currentProgressBar()
    audioPlayer.load()


    musicIndex++


    if (musicIndex === allMusics.length) {
        musicIndex = 0

        music = allMusics[0].music
        artist = allMusics[0].artist
        file = allMusics[0].song

        createMusicPlayer(music, artist)
        playSong(file)

        return
    }


    if (randomBtn === false) {

        music = allMusics[musicIndex].music
        artist = allMusics[musicIndex].artist
        file = allMusics[musicIndex].song

        createMusicPlayer(music, artist)
        playSong(file)


    }

    else{
    

        if (musicIndex > 0 && nextBtn === false) {
            musicIndex = 0

            music = allMusicsRadom[musicIndex].music
            artist = allMusicsRadom[musicIndex].artist
            file = allMusicsRadom[musicIndex].song

            createMusicPlayer(music, artist)
            playSong(file)

            return nextBtn = true
        }

        else
            music = allMusicsRadom[musicIndex].music
    artist = allMusicsRadom[musicIndex].artist
    file = allMusicsRadom[musicIndex].song

    createMusicPlayer(music, artist)
    playSong(file)

    }

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

        createMusicPlayer(music, artist)
        playSong(file)

    }
}))



let allMusicsMainPage = [...allMusics]


allMusicsMainPage = JSON.stringify(allMusicsMainPage)

localStorage.setItem("allMusics", allMusicsMainPage)

