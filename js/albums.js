const albumCards = document.querySelectorAll(".album-card");
const catBoxes = document.querySelectorAll(".cat-box");

// Scroll reveal animation
window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 0.9;
    albumCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < triggerBottom) card.classList.add('visible');
    });
});

// Audio preview hover
albumCards.forEach(card => {
    const audio = card.querySelector(".preview-audio");
    card.addEventListener("mouseenter", () => { audio.play(); audio.volume = 0.3; });
    card.addEventListener("mouseleave", () => { audio.pause(); audio.currentTime = 0; });
});

// Category click → redirect to new page
catBoxes.forEach(box => {
    box.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        const pages = {
            tamil: "category-tamil.html",
            hindi: "category-hindi.html",
            malayalam: "category-malayalam.html",
            telugu: "category-telugu.html",
            kannada: "category-kannada.html",
            english: "category-english.html"
        };
        window.location.href = pages[lang];
    });
});