// Modern Cinema Website JavaScript
let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Authentication State Management
let currentUser = null;

// Check if user is logged in
function checkAuthStatus() {
    const userData = localStorage.getItem('magicCinemaUser') || sessionStorage.getItem('magicCinemaUser');
    if (userData) {
        try {
            currentUser = JSON.parse(userData);
            updateAuthUI();
            return true;
        } catch (error) {
            console.log('Invalid user data');
            return false;
        }
    }
    return false;
}

// Update UI based on authentication status
function updateAuthUI() {
    const signInBtn = document.querySelector('header .btn');
    if (currentUser) {
        signInBtn.innerHTML = `<i class='bx bx-user'></i> ${currentUser.name}`;
        signInBtn.href = '#';
        signInBtn.onclick = (e) => {
            e.preventDefault();
            showUserMenu();
        };
    } else {
        signInBtn.innerHTML = 'Sign In';
        signInBtn.href = 'auth.html';
        signInBtn.onclick = null;
    }
}

// Show user menu
function showUserMenu() {
    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.innerHTML = `
        <div class="user-menu-content">
            <div class="user-info">
                <i class='bx bx-user-circle'></i>
                <span>${currentUser.name}</span>
            </div>
            <div class="user-menu-actions">
                <button onclick="viewProfile()" class="menu-btn">
                    <i class='bx bx-user'></i> Profile
                </button>
                <button onclick="viewBookings()" class="menu-btn">
                    <i class='bx bx-calendar'></i> My Bookings
                </button>
                <button onclick="logout()" class="menu-btn logout">
                    <i class='bx bx-log-out'></i> Logout
                </button>
            </div>
        </div>
    `;
    
    // Add styles
    menu.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
    `;
    
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !e.target.closest('header .btn')) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// User menu functions
function viewProfile() {
    alert(`Profile for ${currentUser.name}\nEmail: ${currentUser.email || 'Not provided'}`);
}

function viewBookings() {
    window.location.href = 'bookings.html';
}

function logout() {
    localStorage.removeItem('magicCinemaUser');
    sessionStorage.removeItem('magicCinemaUser');
    currentUser = null;
    updateAuthUI();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Save booking to localStorage
function saveBooking(bookingData) {
    // Get existing bookings
    let bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    
    // Generate unique booking ID
    const bookingId = `BK${String(bookings.length + 1).padStart(3, '0')}`;
    
    // Create new booking object
    const newBooking = {
        id: bookingId,
        movieTitle: bookingData.movie,
        moviePoster: getMoviePoster(bookingData.movie),
        showDate: formatSelectedDate(bookingData.showDate),
        showTime: bookingData.showTime,
        seat: bookingData.seat,
        screen: getRandomScreen(),
        amount: getRandomPrice(),
        paymentMethod: bookingData.payment,
        bookingDate: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }),
        status: 'upcoming',
        customerName: bookingData.name,
        customerPhone: bookingData.phone,
        createdAt: new Date().toISOString()
    };
    
    // Add to bookings array
    bookings.push(newBooking);
    
    // Save back to localStorage
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    
    // Also save to a separate recent bookings for easy access
    let recentBookings = JSON.parse(localStorage.getItem('recentBookings')) || [];
    recentBookings.unshift(newBooking);
    // Keep only last 5 recent bookings
    recentBookings = recentBookings.slice(0, 5);
    localStorage.setItem('recentBookings', JSON.stringify(recentBookings));
    
    console.log('Booking saved successfully:', newBooking);
    
    return bookingId;
}

// Helper functions for booking data
function getMoviePoster(movieTitle) {
    const posterMap = {
        'Guardians of the Galaxy Volume 2': 'images/home1.jpg',
        'Thor Love and Thunder': 'images/home2.png',
        'Spider-Man No Way Home': 'images/home3.jpg',
        'Avengers: End Game': 'images/home4.png',
        'Dr. Strange': 'images/m1.jpg',
        'Pather': 'images/m2.jpg',
        'Batman VS Superman': 'images/m3.jpg',
        'John Wick 2': 'images/m4.jpg',
        'Aquaman': 'images/m5.jpg',
        'Black Panther': 'images/m6.jpg',
        'Uncharted': 'images/m7.jpg',
        'Brahmastra': 'images/m8.jpg',
        'Mortal Engines': 'images/m9.jpg',
        'Under World Blood Wars': 'images/m10.jpg'
    };
    return posterMap[movieTitle] || 'images/home1.jpg';
}

function getNextAvailableDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function getRandomShowTime() {
    const times = ['2:30 PM', '5:00 PM', '7:30 PM', '9:45 PM'];
    return times[Math.floor(Math.random() * times.length)];
}

function getRandomScreen() {
    const screens = ['Screen 1', 'Screen 2', 'Screen 3', 'Screen 4'];
    return screens[Math.floor(Math.random() * screens.length)];
}

function getRandomPrice() {
    const prices = [12.00, 15.00, 16.50, 18.00, 20.00];
    return prices[Math.floor(Math.random() * prices.length)];
}

// Format selected date for display
function formatSelectedDate(dateString) {
    if (!dateString) return getNextAvailableDate();
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Show booking success notification
function showBookingSuccessNotification(bookingId, bookingData) {
    // Create a custom notification element
    const notification = document.createElement('div');
    notification.className = 'booking-success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class='bx bx-check-circle'></i>
            </div>
            <div class="notification-text">
                <h4>Booking Confirmed!</h4>
                <p>Your ticket for "${bookingData.movie}" has been saved.</p>
                <div class="booking-details">
                    <span>Booking ID: ${bookingId}</span>
                    <span>Date: ${formatSelectedDate(bookingData.showDate)}</span>
                    <span>Time: ${bookingData.showTime}</span>
                    <span>Seat: ${bookingData.seat}</span>
                </div>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class='bx bx-x'></i>
            </button>
        </div>
        <div class="notification-actions">
            <button onclick="window.location.href='bookings.html'" class="btn-primary">
                <i class='bx bx-calendar'></i> View My Bookings
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 10000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .booking-success-notification .notification-content {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .booking-success-notification .notification-icon {
        font-size: 2rem;
        color: white;
    }
    
    .booking-success-notification .notification-text h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .booking-success-notification .notification-text p {
        margin: 0 0 0.5rem 0;
        opacity: 0.9;
    }
    
    .booking-success-notification .booking-details {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    .booking-success-notification .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background 0.3s ease;
        margin-left: auto;
    }
    
    .booking-success-notification .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .booking-success-notification .notification-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .booking-success-notification .btn-primary {
        flex: 1;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        text-decoration: none;
    }
    
    .booking-success-notification .btn-primary:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
    }
`;
document.head.appendChild(style);

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
    
    // Reset date picker
    initializeDatePicker();
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
    
    // Get selected date and time
    const selectedDate = formData.get('showDate');
    const selectedTime = formData.get('showTime');
    
    // Validate date and time
    if (!selectedDate) {
        alert('Please select a show date');
        return;
    }
    
    if (!selectedTime) {
        alert('Please select a show time');
        return;
    }
    
    // Get form data
    const bookingData = {
        name: formData.get('customerName'),
        phone: formData.get('phoneNumber'),
        movie: formData.get('movieTitle'),
        showDate: selectedDate,
        showTime: selectedTime,
        seat: selectedSeat.dataset.seat,
        payment: selectedPayment.dataset.payment
    };
    
    // Save booking to localStorage
    const bookingId = saveBooking(bookingData);
    
    // Show success message with booking ID
    alert(`🎉 Booking Confirmed!\n\nBooking ID: ${bookingId}\nMovie: ${bookingData.movie}\nShow Date: ${formatSelectedDate(bookingData.showDate)}\nShow Time: ${bookingData.showTime}\nSeat: ${bookingData.seat}\nPayment: ${bookingData.payment}\n\nYour booking has been saved to your account!`);
    
    closeBookingPopup();
    
    // Show success notification
    showBookingSuccessNotification(bookingId, bookingData);
});

// Initialize date picker
function initializeDatePicker() {
    const dateInput = document.getElementById('showDate');
    const selectedDateInfo = document.getElementById('selectedDateInfo');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format date for input (YYYY-MM-DD)
        const minDate = tomorrow.toISOString().split('T')[0];
        const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()).toISOString().split('T')[0];
        
        dateInput.min = minDate;
        dateInput.max = maxDate;
        
        // Set default date to tomorrow
        dateInput.value = minDate;
        updateDateInfo(minDate);
        
        // Add event listener for date changes
        dateInput.addEventListener('change', (e) => {
            updateDateInfo(e.target.value);
        });
    }
}

// Update date information display
function updateDateInfo(dateString) {
    const selectedDateInfo = document.getElementById('selectedDateInfo');
    if (selectedDateInfo && dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        let dateText = '';
        
        if (dateString === tomorrow.toISOString().split('T')[0]) {
            dateText = 'Tomorrow';
        } else if (date.toDateString() === today.toDateString()) {
            dateText = 'Today';
        } else {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dateText = date.toLocaleDateString('en-US', options);
        }
        
        selectedDateInfo.textContent = `Selected: ${dateText}`;
    }
}

// Get available show times based on selected date
function getAvailableShowTimes(selectedDate) {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Different show times for different days
    const weekdayTimes = ['2:30 PM', '5:00 PM', '7:30 PM', '9:45 PM'];
    const weekendTimes = ['11:00 AM', '2:30 PM', '5:00 PM', '7:30 PM', '9:45 PM'];
    
    return (dayOfWeek === 0 || dayOfWeek === 6) ? weekendTimes : weekdayTimes;
}

// Update show times based on selected date
function updateShowTimes(selectedDate) {
    const timeSelect = document.getElementById('showTime');
    if (timeSelect) {
        const availableTimes = getAvailableShowTimes(selectedDate);
        
        // Clear existing options
        timeSelect.innerHTML = '<option value="">Choose time</option>';
        
        // Add new options
        availableTimes.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
    }
}

// Update all Book Now buttons to open popup
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication status on page load
    checkAuthStatus();
    
    // Initialize date picker
    initializeDatePicker();
    
    // Add event listener for date changes to update show times
    const dateInput = document.getElementById('showDate');
    if (dateInput) {
        dateInput.addEventListener('change', (e) => {
            updateShowTimes(e.target.value);
        });
    }
    
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