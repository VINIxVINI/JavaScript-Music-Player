const musicContainer = document.querySelector('.music-container')
const playButton = document.querySelector('#play')
const previousButton = document.querySelector('#previous')
const nextButton = document.querySelector('#next')
const progressBar = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const audio = document.querySelector('#player')
const audioTitle = document.querySelector('#title')
const audioThumbnail = document.querySelector('#thumbnail')
const randomButton = document.querySelector('#random')
const slider = document.getElementById('myRange')
const output = document.getElementById('value')

output.innerHTML = slider.value

slider.oninput = function() {
    
    output.innerHTML = `${this.value}%`
    audio.volume = this.value/100
}

// Track Array
const tracks = ['Buwan', 'Save Us From Ourselves', 'Allay', 'True Faith', 
'Night Changes', 'Positions', 'why do you feel so down', 'Save Your Tears']

// Shows which track is playing
let trackIndex = 0
// Initial loading of track into the DOM
loadTrack(tracks[trackIndex])

// Update Track Info, this function takes in a track as a param
function loadTrack(track) {
    audioTitle.innerText = track
    audio.src = `Music/${track}.mp3`
    audioThumbnail.src = `Images/${track}.jpg`
}

// This function plays the track
function playTrack() {
    musicContainer.classList.add('play')
    // playButton.querySelector('i.fas').classList.remove('fa-play')
    // playButton.querySelector('i.fas').classList.add('fa-pause')
    playButton.querySelector('i.fas').classList.replace('fa-play', 'fa-pause')
    // console.log("Playing now...")

    audio.play()    
}
// This function pauses the track
function pauseTrack() {
    musicContainer.classList.remove('play')
    // playButton.querySelector('i.fas').classList.add('fa-play')
    // playButton.querySelector('i.fas').classList.remove('fa-pause')
    playButton.querySelector('i.fas').classList.replace('fa-pause', 'fa-play')

    audio.pause()
}
// This function plays the previous track
function previousTrack() {
    trackIndex--

    if (trackIndex < 0) {
        trackIndex = tracks.length - 1    
    }

    loadTrack(tracks[trackIndex])
    playTrack()
}
// This function plays the next track
function nextTrack() {
    trackIndex++

    if (trackIndex > tracks.length) {
        trackIndex = 0
    }

    loadTrack(tracks[trackIndex])
    playTrack()
}
//This function plays a random track
function randomTrack() {
    //Generating a random number for the track index
    trackIndex = Math.floor(Math.random() * tracks.length);

    loadTrack(tracks[trackIndex])
    playTrack()
}

// This function updates track progress
function updateProgress(e) {
    // logs current track progress
    // console.log(e.srcElement.currentTime)
    // logs total track duration
    // console.log(e.srcElement.duration)

    const {duration, currentTime} = e.srcElement
    //Calculation of progress bar percent by dividing current time with total duration
    const progressPercent = (currentTime / duration) * 100
    progressBar.style.width = `${progressPercent}%`
}
// This function sets progress on progress bar, onClick
function setProgress(e) {
    let width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
// This function controls the volume
function volume_change(e) {
}


//Event Listeners
//------------------

// Play/Pause Event
playButton.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play')
    
    if (isPlaying) {
        pauseTrack() 
    } else {
        playTrack()
    }
}) 

// Previous Track event
previousButton.addEventListener('click', previousTrack)

// Next Track event
nextButton.addEventListener('click', nextTrack)

// Track progress update Event
audio.addEventListener('timeupdate', updateProgress)

// Listens for click on progress bar to set progress
progressContainer.addEventListener('click', setProgress)

//Randomized track selection
randomButton.addEventListener('click', randomTrack)

// Volume slider event
// volumeSlider.addEventListener('volumechange', volumeController)
