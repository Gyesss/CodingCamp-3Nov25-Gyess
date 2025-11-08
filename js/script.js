document.addEventListener('DOMContentLoaded', () => {
    updateCurrentTime();

    const form = document.getElementById('message-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        validateAndDisplayForm();
    });

    welcomeSpeech();

    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');

    let currentIndex = 0;

    function updateCarousel() {
        let itemWidth;
        if (window.innerWidth >= 1024) itemWidth = carouselWrapper.offsetWidth / 3;
        else if (window.innerWidth >= 768) itemWidth = carouselWrapper.offsetWidth / 2;
        else itemWidth = carouselWrapper.offsetWidth;
        carouselWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) currentIndex--;
        else {
            let itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            currentIndex = carouselItems.length - itemsPerView;
            if (currentIndex < 0) currentIndex = 0;
        }
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        let itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        if (currentIndex < carouselItems.length - itemsPerView) currentIndex++;
        else currentIndex = 0;
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        let itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        if (currentIndex > carouselItems.length - itemsPerView) {
            currentIndex = carouselItems.length - itemsPerView;
            if (currentIndex < 0) currentIndex = 0;
        }
        updateCarousel();
    });

    updateCarousel();
});

function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();
    const datePart = now.toDateString();
    const timeZoneMatch = now.toTimeString().match(/(\d{2}:\d{2}:\d{2}) (GMT[+-]\d{4} \(.+\))/);
    if (timeZoneMatch) currentTimeElement.textContent = `${datePart} ${timeZoneMatch[1]} ${timeZoneMatch[2]}`;
    else currentTimeElement.textContent = now.toString();
}

function welcomeSpeech() {
    let name = prompt("Enter your name:");
    document.getElementById('greet-name').innerHTML = `Hi ${name}`;
}

function validateAndDisplayForm() {
    const name = document.getElementById('input-name').value;
    const dob = document.getElementById('input-dob').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const message = document.getElementById('input-message').value;
    document.getElementById('res-name').textContent = name;
    document.getElementById('res-dob').textContent = dob;
    document.getElementById('res-gender').textContent = gender;
    document.getElementById('res-message').textContent = message;
}
