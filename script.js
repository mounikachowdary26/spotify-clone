
let currentAudio = new Audio();
let isPlaying = false;
const playPauseButton = document.querySelector('.play-pause');
const skipBackwardButton = document.querySelector('.skip-backward');
const skipForwardButton = document.querySelector('.skip-forward');
const playbackSpeedSelect = document.querySelector('#speed');
const progressBar = document.querySelector('.progress-bar div');
const progressBarContainer = document.querySelector('.progress-bar');
const songTitleElement = document.querySelector('.song-title');
const currentTimeElement = document.querySelector('.current-time');
const durationElement = document.querySelector('.duration');
const musicControl = document.querySelector('.music-control');
const searchInput = document.querySelector('.search-bar');
const allCards = document.querySelectorAll('.card');
let lastPlayedCard = null;

// Get artist cards and songs section
const artistCards = document.querySelectorAll('.artist-card');
const songsSection = document.getElementById('songs-section');
const artistNameHeading = document.getElementById('artist-name-heading');
const songsList = document.querySelector('.songs-list');
const closeSongsBtn = document.getElementById('close-songs-btn');

// Artist and song data
const artistData = {
    "Taylor Swift": [
        { title: "Love Story", audio: "/assets/albums/songs/Taylor Swift - Love Story (Lyrics).mp3", cover: "/assets/images/love story.jpeg" },
        { title: "Shake It Off", audio: "/assets/albums/songs/Shake It Off - Taylor Swift (Lyrics)  Shawn Mendes, Camila Cabello, Jonas Blue, OneRepublic.mp3", cover: "/assets/images/shake it off.jpeg" }
    ],
    "Arjit Singh": [
        { title: "Tum Hi Ho", audio: "/assets/albums/songs/Tum Hi Ho (Lyrics)Arijit SinghAashiqui 2@tseries.mp3", cover: "/assets/images/tum hi ho.jpeg" },
        { title: "Channa Mereya", audio: "/assets/albums/songs/Channa Mereya Full Video - ADHMRanbir Kapoor, AnushkaArijit SinghPritamKaran Johar.mp3", cover: "/assets/images/chenna mereya.jpeg" },
        { title: "Deva deva", audio: "/assets/albums/songs/Deva Deva - Extended Film VersionBrahmāstraAmitabh BRanbir @aliabhatt@pritam7415 ArijitJonita.mp3", cover: "/assets/images/deva deva.jpeg" }

    ]
};

// Add click event listeners to artist cards
artistCards.forEach(card => {
    card.addEventListener('click', function () {
        const artistName = this.getAttribute('data-artist');
        displaySongs(artistName);
    });
});

// Function to display songs for the selected artist
function displaySongs(artistName) {
    // Set artist name heading
    artistNameHeading.textContent = `Songs by ${artistName}`;
    // Clear previous songs
    songsList.innerHTML = '';
    // Get songs for the selected artist
    const songs = artistData[artistName] || [];
    // Add songs to the songs list
    songs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.innerHTML = `
            <div class="song-cover">
                <img src="${song.cover}" alt="Song Cover" width="100" height="100">
            </div>
            <div class="song-details">
                <h5>${song.title}</h5>
                <audio controls>
                    <source src="${song.audio}" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;

        songsList.appendChild(songItem);
    });
     const artistContainer = document.querySelector('.artist-container');
     artistContainer.appendChild(songsSection);
    songsSection.style.display = 'block';

   // Ensure it appears immediately after the artist container
   songsSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
// Add click event listener to the Close button
closeSongsBtn.addEventListener('click', () => {
    songsSection.style.display = 'none'; 
});
function openLibrary() {
    alert('Opening Your Library...');
}

function createPlaylist() {
    alert('Create a new playlist!');
}

function showLikedSongs() {
    alert('Displaying your liked songs...');
}

function discoverMusic() {
    alert('Discovering new music!');
}

function settings() {
    alert('Opening settings...');
}

// Volume slider and volume icon elements
const volumeControl = document.querySelector('#volume-control');
const volumeIcon = document.querySelector('.volume-icon');
let lastVolume = 1; // Store the last non-zero volume level

// Function to toggle mute/unmute
volumeIcon.addEventListener('click', () => {
    if (currentAudio.volume > 0) {
        lastVolume = currentAudio.volume; // Save the current volume
        currentAudio.volume = 0; // Mute the audio
        volumeControl.value = 0; // Update the slider to 0
        volumeIcon.className = 'volume-icon fa fa-volume-mute'; // Update to mute icon
    } else {
        currentAudio.volume = lastVolume; // Restore the last volume
        volumeControl.value = lastVolume; // Update the slider
        volumeIcon.className = lastVolume < 0.5 ? 'volume-icon fa fa-volume-down' : 'volume-icon fa fa-volume-up'; // Update icon
    }
});

// Update the volume icon dynamically based on slider input
volumeControl.addEventListener('input', (event) => {
    const volumeValue = parseFloat(event.target.value);
    currentAudio.volume = volumeValue; // Set audio volume
    // Update icon
    if (volumeValue === 0) {
        volumeIcon.className = 'volume-icon fa fa-volume-mute';
    } else if (volumeValue < 0.5) {
        volumeIcon.className = 'volume-icon fa fa-volume-down';
    } else {
        volumeIcon.className = 'volume-icon fa fa-volume-up';
    }
});


// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Show or hide the music control bar
function toggleMusicControl(shouldShow) {
    musicControl.style.display = shouldShow ? 'flex' : 'none';
}

// Play/Pause functionality for the bottom music control
playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        currentAudio.pause();
        playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
    } else {
        currentAudio.play();
        playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
    }
    isPlaying = !isPlaying;

    // Ensure the card play button state is updated when the song plays/pauses
    if (lastPlayedCard) {
        const playButton = lastPlayedCard.querySelector('.play-button');
        playButton.innerHTML = isPlaying ? '<i class="fa fa-pause"></i>' : '<i class="fa fa-play"></i>';
    }
   
});


// Attach event listeners to cards
allCards.forEach(card => {
    const playButton = card.querySelector('.play-button'); // The play button inside each card

    // Play/Pause functionality for each card
    card.addEventListener('click', () => {
        const songSrc = card.getAttribute('data-song');
        const songTitle = card.getAttribute('data-title');


        if (lastPlayedCard === card && isPlaying) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            playButton.innerHTML = '<i class="fa fa-play"></i>';
            isPlaying = false;
            toggleMusicControl(false);
            playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
        } else {
            // Stop the previous song and reset its play button
            if (lastPlayedCard) {
                const lastPlayButton = lastPlayedCard.querySelector('.play-button');
                lastPlayButton.innerHTML = '<i class="fa fa-play"></i>';
            }

            currentAudio.src = songSrc;
            songTitleElement.textContent = songTitle;
            currentAudio.play();
            playButton.innerHTML = '<i class="fa fa-pause"></i>';
            toggleMusicControl(true);
            isPlaying = true;
            lastPlayedCard = card;
            playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
        }
 

           // Show the bottom music control after the first song starts playing
        if (!musicControl.classList.contains('shown')) {
            toggleMusicControl(true); // Show the music control on first play
            musicControl.classList.add('shown');
        }

        // Update progress and duration
        currentAudio.ontimeupdate = () => {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.style.width = progress + '%';
            currentTimeElement.textContent = formatTime(currentAudio.currentTime);
            durationElement.textContent = formatTime(currentAudio.duration || 0);
        };

        // Reset when song ends
        currentAudio.onended = () => {
            playButton.innerHTML = '<i class="fa fa-play"></i>';
            playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
            toggleMusicControl(false);
            isPlaying = false;
        };
    });

    // When hovering over the card, show the play button
    card.addEventListener('mouseenter', () => {
        if (!isPlaying) {
            playButton.style.display = 'block';
        }
    });

    // When the cursor leaves the card, hide the play button (if not playing)
    card.addEventListener('mouseleave', () => {
        if (!isPlaying) {
            playButton.style.display = 'none';
        }
    });
});

skipBackwardButton.addEventListener('click', () => {
    currentAudio.currentTime = Math.max(0, currentAudio.currentTime - 10);
});

skipForwardButton.addEventListener('click', () => {
    currentAudio.currentTime = Math.min(currentAudio.duration, currentAudio.currentTime + 10);
});

playbackSpeedSelect.addEventListener('change', () => {
    currentAudio.playbackRate = parseFloat(playbackSpeedSelect.value);
});

progressBarContainer.addEventListener('click', (e) => {
    const clickPosition = e.offsetX / progressBarContainer.offsetWidth;
    currentAudio.currentTime = clickPosition * currentAudio.duration;
});



// Add an input event listener
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase(); 
    console.log('Search Query:', query); 
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => { 
        const cardText = card.querySelector('.card-text')?.textContent.toLowerCase();
        const cardTitle = card.getAttribute('data-title')?.toLowerCase();
        console.log('Card Title:', cardTitle); 
        console.log('Card Text:', cardText); 
        // Show or hide the card based on the query match
        if ((cardText && cardText.includes(query)) || (cardTitle && cardTitle.includes(query))) {
            card.style.display = 'block'; 
        } else {
            card.style.display = 'none'; 
        }
    });
});
//navigation controls
document.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach(button => {
    button.addEventListener('click', event => {
        const carousel = document.querySelector('#english-songs-carousel .carousel-inner');
        const isNext = button.classList.contains('carousel-control-next');
        const scrollAmount = carousel.offsetWidth / 5; // Scroll width of one card
        carousel.scrollBy({ left: isNext ? scrollAmount : -scrollAmount, behavior: 'smooth' });
        event.preventDefault();
    });
});
// Navigation for English Songs
document.querySelectorAll('#english-songs-container .carousel-control-prev, #english-songs-container .carousel-control-next').forEach(button => {
    button.addEventListener('click', event => {
        const carousel = document.querySelector('#english-songs-container .carousel-inner');
        const isNext = button.classList.contains('carousel-control-next');
        const scrollAmount = carousel.offsetWidth / 5; // Adjust scroll step
        carousel.scrollBy({ left: isNext ? scrollAmount : -scrollAmount, behavior: 'smooth' });
        event.preventDefault();
    });
});
document.querySelector('#telugu-songs-carousel .carousel-control-prev').addEventListener('click', () => {
    const carouselInner = document.querySelector('#telugu-songs-carousel .carousel-inner');
    const scrollStep = carouselInner.clientWidth / 5; // Adjust based on visible cards
    carouselInner.scrollBy({ left: -scrollStep, behavior: 'smooth' });
});

document.querySelector('#telugu-songs-carousel .carousel-control-next').addEventListener('click', () => {
    const carouselInner = document.querySelector('#telugu-songs-carousel .carousel-inner');
    const scrollStep = carouselInner.clientWidth / 5; // Adjust based on visible cards
    carouselInner.scrollBy({ left: scrollStep, behavior: 'smooth' });
});

// Navigation for Hindi Songs
document.querySelectorAll('#hindi-songs-container .carousel-control-prev, #hindi-songs-container .carousel-control-next').forEach(button => {
    button.addEventListener('click', event => {
        const carousel = document.querySelector('#hindi-songs-container .carousel-inner');
        const isNext = button.classList.contains('carousel-control-next');
        const scrollAmount = carousel.offsetWidth / 5; // Adjust scroll step
        carousel.scrollBy({ left: isNext ? scrollAmount : -scrollAmount, behavior: 'smooth' });
        event.preventDefault();
    });
});

// Get the show more/less button and the hidden cards
const showMoreBtn = document.querySelector('.show-more-btn');
const hiddenCards = document.querySelectorAll('.artist-cards .hidden');
hiddenCards.forEach(card => {
    card.style.display = 'none'; // Hide extra cards by default
});

// Add click event listener to the "Show More" button
showMoreBtn.addEventListener('click', () => {
    const isExpanded = showMoreBtn.textContent === 'Show Less';
    hiddenCards.forEach(card => {
        card.style.display = isExpanded ? 'none' : 'flex'; // Hide or show the hidden cards
    });
    showMoreBtn.textContent = isExpanded ? 'Show More' : 'Show Less';
});


