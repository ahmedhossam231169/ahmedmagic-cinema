// Modern Cinema Website JavaScript
let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Header scroll effect
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

// Mobile menu toggle
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close mobile menu when clicking on links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menu.classList.remove('bx-x');
    });
});

// Hero section swiper
var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Coming soon swiper
var swiper = new Swiper(".coming-contanier", {
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 2,
        },
        568: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        },
        968: {
            slidesPerView: 5,
        },
    }
});

// Booking Popup Functionality
const bookingPopup = document.getElementById('bookingPopup');
const closePopup = document.getElementById('closePopup');
const bookingForm = document.getElementById('bookingForm');
const movieTitleInput = document.getElementById('movieTitle');

// Quick View Popup Functionality
const quickViewPopup = document.getElementById('quickViewPopup');
const closeQuickViewBtn = document.getElementById('closeQuickView');

// Movie titles mapping
const movieTitles = {
    'filmsourth1.html': 'Dr. Strange',
    'filmsourth2.html': 'Pather',
    'filmsourth3.html': 'Batman VS Superman',
    'filmsourth4.html': 'John Wick 2',
    'filmsourth5.html': 'Aquaman',
    'filmsourth6.html': 'Black Panther',
    'filmsourth7.html': 'Uncharted',
    'filmsourth8.html': 'Brahmastra',
    'filmsourth9.html': 'Mortal Engines',
    'filmsourth10.html': 'Under World Blood Wars',
    'filmsourth11.html': 'Guardians of the Galaxy Volume 2',
    'filmsourth12.html': 'Thor Love and Thunder',
    'filmsourth13.html': 'Spider-Man No Way Home',
    'filmsourth14.html': 'Avengers: End Game'
};

// Movie information database
const movieInfo = {
    'Guardians of the Galaxy Volume 2': {
        poster: 'images/home1.jpg',
        year: '2017',
        rating: '7.6/10',
        duration: '136 min',
        genre: 'Action, Adventure, Comedy',
        description: 'The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill\'s true parentage.',
        cast: 'Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel, Bradley Cooper',
        director: 'James Gunn',
        awards: 'Nominated for 1 Oscar, 7 wins & 42 nominations total'
    },
    'Thor Love and Thunder': {
        poster: 'images/home2.png',
        year: '2022',
        rating: '6.2/10',
        duration: '119 min',
        genre: 'Action, Adventure, Comedy',
        description: 'Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.',
        cast: 'Chris Hemsworth, Natalie Portman, Christian Bale, Tessa Thompson',
        director: 'Taika Waititi',
        awards: 'Nominated for 1 Oscar, 1 win & 7 nominations total'
    },
    'Spider-Man No Way Home': {
        poster: 'images/home3.jpg',
        year: '2021',
        rating: '8.2/10',
        duration: '148 min',
        genre: 'Action, Adventure, Fantasy',
        description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.',
        cast: 'Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon',
        director: 'Jon Watts',
        awards: 'Nominated for 1 Oscar, 6 wins & 69 nominations total'
    },
    'Avengers: End Game': {
        poster: 'images/home4.png',
        year: '2019',
        rating: '8.4/10',
        duration: '181 min',
        genre: 'Action, Adventure, Drama',
        description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.',
        cast: 'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth',
        director: 'Anthony Russo, Joe Russo',
        awards: 'Won 1 Oscar, 70 wins & 103 nominations total'
    },
    'Dr. Strange': {
        poster: 'images/m1.jpg',
        year: '2016',
        rating: '7.5/10',
        duration: '115 min',
        genre: 'Action, Adventure, Fantasy',
        description: 'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.',
        cast: 'Benedict Cumberbatch, Chiwetel Ejiofor, Rachel McAdams, Benedict Wong',
        director: 'Scott Derrickson',
        awards: 'Nominated for 1 Oscar, 1 win & 20 nominations total'
    },
    'Pather': {
        poster: 'images/m2.jpg',
        year: '2022',
        rating: '8.1/10',
        duration: '164 min',
        genre: 'Action, Drama, Thriller',
        description: 'A young man from a small village dreams of becoming a police officer to serve his country and protect his family.',
        cast: 'Allu Arjun, Rashmika Mandanna, Fahadh Faasil, Sunil',
        director: 'Sukumar',
        awards: '2 wins & 3 nominations'
    },
    'Batman VS Superman': {
        poster: 'images/m3.jpg',
        year: '2016',
        rating: '6.4/10',
        duration: '151 min',
        genre: 'Action, Adventure, Fantasy',
        description: 'Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of hero it really needs.',
        cast: 'Ben Affleck, Henry Cavill, Amy Adams, Jesse Eisenberg',
        director: 'Zack Snyder',
        awards: 'Nominated for 1 Oscar, 7 wins & 30 nominations total'
    },
    'John Wick 2': {
        poster: 'images/m4.jpg',
        year: '2017',
        rating: '7.4/10',
        duration: '122 min',
        genre: 'Action, Crime, Thriller',
        description: 'After returning to the criminal underworld to repay a debt, John Wick discovers that a large bounty has been put on his life.',
        cast: 'Keanu Reeves, Riccardo Scamarcio, Ian McShane, Ruby Rose',
        director: 'Chad Stahelski',
        awards: '1 win & 2 nominations'
    },
    'Aquaman': {
        poster: 'images/m5.jpg',
        year: '2018',
        rating: '6.8/10',
        duration: '143 min',
        genre: 'Action, Adventure, Fantasy',
        description: 'Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land.',
        cast: 'Jason Momoa, Amber Heard, Willem Dafoe, Patrick Wilson',
        director: 'James Wan',
        awards: 'Nominated for 1 Oscar, 1 win & 6 nominations total'
    },
    'Black Panther': {
        poster: 'images/m6.jpg',
        year: '2018',
        rating: '7.3/10',
        duration: '134 min',
        genre: 'Action, Adventure, Sci-Fi',
        description: 'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future.',
        cast: 'Chadwick Boseman, Michael B. Jordan, Lupita Nyong\'o, Danai Gurira',
        director: 'Ryan Coogler',
        awards: 'Won 3 Oscars, 7 wins & 90 nominations total'
    },
    'Uncharted': {
        poster: 'images/m7.jpg',
        year: '2022',
        rating: '6.3/10',
        duration: '116 min',
        genre: 'Action, Adventure, Comedy',
        description: 'Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor "Sully" Sullivan to recover a fortune lost by Ferdinand Magellan.',
        cast: 'Tom Holland, Mark Wahlberg, Antonio Banderas, Sophia Ali',
        director: 'Ruben Fleischer',
        awards: '1 win & 1 nomination'
    },
    'Brahmastra': {
        poster: 'images/m8.jpg',
        year: '2022',
        rating: '5.4/10',
        duration: '167 min',
        genre: 'Action, Adventure, Fantasy',
        description: 'A young man on the brink of love is forced to discover his destiny as he must fight against dark forces that threaten the world.',
        cast: 'Ranbir Kapoor, Alia Bhatt, Amitabh Bachchan, Mouni Roy',
        director: 'Ayan Mukerji',
        awards: '1 win & 2 nominations'
    },
    'Mortal Engines': {
        poster: 'images/m9.jpg',
        year: '2018',
        rating: '5.9/10',
        duration: '128 min',
        genre: 'Action, Adventure, Fantasy',
        description: 'In a post-apocalyptic world where cities ride on wheels and consume each other, a young woman meets a mysterious man with a dangerous past.',
        cast: 'Hera Hilmar, Robert Sheehan, Hugo Weaving, Jihae',
        director: 'Christian Rivers',
        awards: 'Nominated for 1 Oscar, 1 win & 1 nomination total'
    },
    'Under World Blood Wars': {
        poster: 'images/m10.jpg',
        year: '2016',
        rating: '5.8/10',
        duration: '91 min',
        genre: 'Action, Fantasy, Thriller',
        description: 'Vampire death dealer Selene fends off brutal attacks from both the Lycan clan and the Vampire faction that betrayed her.',
        cast: 'Kate Beckinsale, Theo James, Tobias Menzies, Lara Pulver',
        director: 'Anna Foerster',
        awards: '1 win & 1 nomination'
    }
};

// Open booking popup
function openBookingPopup(movieTitle) {
    // If it's a link, get the title from the mapping, otherwise use the title directly
    const title = movieTitles[movieTitle] || movieTitle;
    movieTitleInput.value = title;
    bookingPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close booking popup
function closeBookingPopup() {
    bookingPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetBookingForm();
}

// Open quick view popup
function openQuickView(movieTitle) {
    const info = movieInfo[movieTitle];
    if (info) {
        document.getElementById('quickViewPoster').src = info.poster;
        document.getElementById('quickViewTitle').textContent = movieTitle;
        document.getElementById('quickViewYear').textContent = info.year;
        document.getElementById('quickViewRating').textContent = info.rating;
        document.getElementById('quickViewDuration').textContent = info.duration;
        document.getElementById('quickViewGenre').textContent = info.genre;
        document.getElementById('quickViewDescription').textContent = info.description;
        document.getElementById('quickViewCast').textContent = info.cast;
        document.getElementById('quickViewDirector').textContent = info.director;
        document.getElementById('quickViewAwards').textContent = info.awards;
        
        quickViewPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close quick view popup
function closeQuickView() {
    quickViewPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Book from quick view popup
function bookFromQuickView() {
    // Get the movie title from the quick view popup
    const movieTitle = document.getElementById('quickViewTitle').textContent;
    
    // Close the quick view popup
    closeQuickView();
    
    // Open the booking popup with the movie title
    openBookingPopup(movieTitle);
}

// Reset booking form
function resetBookingForm() {
    bookingForm.reset();
    document.querySelectorAll('.seat-option').forEach(seat => {
        seat.classList.remove('selected');
    });
    document.querySelectorAll('.payment-option').forEach(payment => {
        payment.classList.remove('selected');
    });
}

// Seat selection
document.querySelectorAll('.seat-option').forEach(seat => {
    seat.addEventListener('click', () => {
        document.querySelectorAll('.seat-option').forEach(s => s.classList.remove('selected'));
        seat.classList.add('selected');
    });
});

// Payment method selection
document.querySelectorAll('.payment-option').forEach(payment => {
    payment.addEventListener('click', () => {
        document.querySelectorAll('.payment-option').forEach(p => p.classList.remove('selected'));
        payment.classList.add('selected');
    });
});

// Event listeners
closePopup.addEventListener('click', closeBookingPopup);
bookingPopup.addEventListener('click', (e) => {
    if (e.target === bookingPopup) {
        closeBookingPopup();
    }
});

// Quick View event listeners
closeQuickViewBtn.addEventListener('click', closeQuickView);
quickViewPopup.addEventListener('click', (e) => {
    if (e.target === quickViewPopup) {
        closeQuickView();
    }
});

// Form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const selectedSeat = document.querySelector('.seat-option.selected');
    const selectedPayment = document.querySelector('.payment-option.selected');
    
    if (!selectedSeat) {
        alert('Please select a seat');
        return;
    }
    
    if (!selectedPayment) {
        alert('Please select a payment method');
        return;
    }
    
    // Get form data
    const bookingData = {
        name: formData.get('customerName'),
        phone: formData.get('phoneNumber'),
        movie: formData.get('movieTitle'),
        seat: selectedSeat.dataset.seat,
        payment: selectedPayment.dataset.payment
    };
    
    // Simulate booking process
    alert(`Booking Confirmed!\n\nName: ${bookingData.name}\nPhone: ${bookingData.phone}\nMovie: ${bookingData.movie}\nSeat: ${bookingData.seat}\nPayment: ${bookingData.payment}`);
    
    closeBookingPopup();
});

// Update all Book Now buttons to open popup
document.addEventListener('DOMContentLoaded', () => {
    // Movie cards now have individual buttons, no need for box click events
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});