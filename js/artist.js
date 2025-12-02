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
        "shreya": [
            {name: "Sun Raha Hai Na Tu", src: "audio/shreya/sunraha.mp3"},
            {name: "Teri Ore", src: "audio/shreya/teri-ore.mp3"}
        ]
    };

    const modal = document.getElementById("songModal");
    const artistNameElem = document.getElementById("artistName");
    const songListElem = document.getElementById("songList");
    const closeBtn = document.querySelector(".close");
    const audioPlayer = document.getElementById("audioPlayer");
    const audioSource = document.getElementById("audioSource");

    document.querySelectorAll(".play-btn").forEach(button => {
        button.addEventListener("click", () => {
            const artist = button.dataset.artist;
            artistNameElem.textContent = artist.replace(/-/g, ' ').toUpperCase() + " Songs";
            songListElem.innerHTML = songs[artist].map(song => `<li data-src="${song.src}">${song.name}</li>`).join('');
            modal.style.display = "block";

            // Play song on click
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
    window.addEventListener("click", (e) => { if(e.target == modal) { modal.style.display = "none"; audioPlayer.pause(); } });