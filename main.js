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
    // Update movie cards to open popup
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', (e) => {
            e.preventDefault();
            const movieTitle = box.getAttribute('data-movie');
            if (movieTitle) {
                openBookingPopup(movieTitle);
            }
        });
    });
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