console.log("Welcome to Spotify");

//Initialize the variables
var songIndex = 0;
var audioElement = new Audio('songs/1.mpeg');
var masterPlay = document.querySelector("#masterPlay");
var previous = document.querySelector("#previous");
var next = document.querySelector("#next");
var myProgressBar = document.querySelector("#myProgressBar");
var gif = document.querySelector("#gif");
let songs = [
    {songName:"Warriyo-Mortals", filePath:"songs/1.mpeg", coverPath:"covers/1.jpg"},
    {songName:"Cielo - Huma Huma", filePath:"songs/2.mpeg", coverPath:"covers/2.jpg"},
    {songName:"Deaf kev - Invincible", filePath:"songs/3.mpeg", coverPath:"covers/3.jpg"},
    {songName:"Different HEAVEN & EHIDE", filePath:"songs/4.mpeg", coverPath:"covers/4.jpg"},
    {songName:"Janji - heroes - tonight", filePath:"songs/5.mpeg", coverPath:"covers/5.jpg"},
    {songName:"Legion", filePath:"songs/6.mpeg", coverPath:"covers/6.jpg"},
    {songName:"Rabba", filePath:"songs/7.mpeg", coverPath:"covers/7.jpg"},
    {songName:"Bhula dena mujhe", filePath:"songs/8.mpeg", coverPath:"covers/8.jpg"},
    {songName:"rishtedaar chutiye", filePath:"songs/9.mpeg", coverPath:"covers/9.jpg"}
]

for(i=0; i<songs.length; i++){
    document.querySelectorAll(".songName")[i].innerText = songs[i].songName;
    document.querySelectorAll(".songItem")[i].setAttribute('src',songs[i].coverPath);
}

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//Progress Bar
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        audioElement.currentTime = 0;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        document.querySelector("#masterSongPlay").innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex+1}.mpeg`;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//Handle previous next 
previous.addEventListener('click',()=>{
    if(songIndex>0){
        songIndex--;
        audioElement.currentTime = 0;
        audioElement.src = `songs/${songIndex+1}.mpeg`;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        makeAllPlays();
    }
})

next.addEventListener('click',()=>{
    if(songIndex<songs.length-1){
        songIndex++;
        audioElement.currentTime = 0;
        audioElement.src = `songs/${songIndex+1}.mpeg`;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        makeAllPlays();
    }
})