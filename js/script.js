/* ==========================
   ADVANCED VIDEO SLIDER JS
   ========================== */

let videos = document.querySelectorAll(".slide-video");
let dots = document.querySelectorAll(".dot");
let index = 0;
let autoSlide;
let startX = 0;

/* ------------------------
   Show slide by index
   ------------------------ */
function showSlide(i) {
    videos.forEach(v => v.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    index = (i + videos.length) % videos.length; // loop

    videos[index].classList.add("active");
    dots[index].classList.add("active");

    resetAutoSlide(); // restart autoplay
}

/* ------------------------
   Next / Prev buttons
   ------------------------ */
function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

/* ------------------------
   Auto Slide (10s)
   ------------------------ */
function startAutoSlide() {
    autoSlide = setInterval(() => {
        nextSlide();
    }, 10000); // 10 sec
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

startAutoSlide();

/* ------------------------
   Hover Pause
   ------------------------ */
let hero = document.querySelector(".hero");

hero.addEventListener("mouseenter", () => clearInterval(autoSlide));
hero.addEventListener("mouseleave", startAutoSlide);

/* ------------------------
   Dot Click
   ------------------------ */
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        showSlide(i);
    });
});

/* ------------------------
   Arrow Click
   ------------------------ */
document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

/* ------------------------
   Keyboard Controls
   Left Arrow  ←  
   Right Arrow →
   ------------------------ */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
});

/* ------------------------
   Touch Swipe (Mobile)
   ------------------------ */
hero.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].clientX;
});

hero.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 60) {
        // Swipe Left → Next
        nextSlide();
    } else if (endX - startX > 60) {
        // Swipe Right → Prev
        prevSlide();
    }
});
// Scroll animation
const faders = document.querySelectorAll('.fade-left, .fade-right, .fade-up');

const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Auto-stop previous song when a new one starts playing
const audios = document.querySelectorAll("audio");

audios.forEach(audio => {
    audio.addEventListener("play", () => {
        audios.forEach(a => {
            if (a !== audio) a.pause();
        });
    });
});

const songs = {
    "ar-rahman": [
        {name: "Jai Ho", src: "audio/ar-rahman/jai-ho.mp3"},
        {name: "Humma Humma", src: "audio/ar-rahman/humma.mp3"}
    ],
    "anirudh": [
        {name: "Why This Kolaveri", src: "audio/anirudh/kolaveri.mp3"},
        {name: "Surviva", src: "audio/anirudh/surviva.mp3"}
    ],
    "sid-sriram": [
        {name: "Ennodu Nee Irundhal", src: "audio/sid-sriram/ennodu.mp3"},
        {name: "Thalli Pogathey", src: "audio/sid-sriram/thalli.mp3"}
    ],
    "swetha": [
        {name: "Kaathale Kaathale", src: "audio/swetha/kaathale.mp3"}
    ],
    "shreya": [
        {name: "Sun Raha Hai Na Tu", src: "audio/shreya/sunraha.mp3"},
        {name: "Teri Ore", src: "audio/shreya/teri-ore.mp3"}
    ],
    "gv-praksh": [
        {name: "Innum Konjam", src: "audio/gv/inum.mp3"}
    ],
    "jonita-gandhi": [
        {name: "Tum Hi Ho", src: "audio/jonita/tum.mp3"}
    ],
    "chinmayee": [
        {name: "Suttrum Vizhi", src: "audio/chinmayee/suttrum.mp3"}
    ],
    "andrea": [
        {name: "Naa Ready", src: "audio/andrea/naa-ready.mp3"}
    ]
};

const modal = document.getElementById("songModal");
const artistNameElem = document.getElementById("artistName");
const songListElem = document.getElementById("songList");
const closeBtn = document.querySelector(".close");
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");

document.querySelectorAll(".artist-card").forEach(card => {
    card.addEventListener("click", () => {
        let artistText = card.querySelector("p").innerText.toLowerCase().replace(" ", "-");
        if(!songs[artistText]) return alert("Songs not available yet!");
        artistNameElem.textContent = card.querySelector("p").innerText + " Songs";
        songListElem.innerHTML = songs[artistText].map(song => `<li data-src="${song.src}">${song.name}</li>`).join('');
        modal.style.display = "block";

        document.querySelectorAll("#songList li").forEach(li => {
            li.addEventListener("click", () => {
                audioSource.src = li.dataset.src;
                audioPlayer.load();
                audioPlayer.play();
            });
        });
    });
});

closeBtn.addEventListener("click", () => { modal.style.display = "none"; audioPlayer.pause(); });
window.addEventListener("click", (e) => { if(e.target == modal){ modal.style.display = "none"; audioPlayer.pause(); } });


