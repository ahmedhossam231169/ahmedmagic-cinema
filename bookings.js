// Bookings Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeBookings();
});

function initializeBookings() {
    // Check authentication
    if (!checkAuthentication()) {
        redirectToLogin();
        return;
    }

    // Load user data
    loadUserData();
    
    // Initialize filter tabs
    setupFilterTabs();
    
    // Load bookings data
    loadBookings();
    
    // Setup event listeners
    setupEventListeners();
    
    // Add refresh button functionality
    addRefreshFunctionality();
}

// Authentication Check
function checkAuthentication() {
    const userData = localStorage.getItem('magicCinemaUser') || sessionStorage.getItem('magicCinemaUser');
    return userData !== null;
}

function redirectToLogin() {
    showToast('Please sign in to view your bookings', 'error');
    setTimeout(() => {
        window.location.href = 'auth.html';
    }, 2000);
}

// Load User Data
function loadUserData() {
    const userData = localStorage.getItem('magicCinemaUser') || sessionStorage.getItem('magicCinemaUser');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            document.getElementById('userName').textContent = user.name;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
}

// Filter Tabs Setup
function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter bookings
            const filter = tab.getAttribute('data-filter');
            filterBookings(filter);
        });
    });
}

// Filter Bookings
function filterBookings(filter) {
    const bookingCards = document.querySelectorAll('.booking-card');
    const emptyState = document.getElementById('emptyState');
    let visibleCount = 0;
    
    bookingCards.forEach(card => {
        const status = card.getAttribute('data-status');
        
        if (filter === 'all' || status === filter) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide empty state
    if (visibleCount === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

// Load Bookings Data
function loadBookings() {
    // Get bookings from localStorage
    let bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    
    console.log('Loading bookings:', bookings);
    
    // If no bookings exist, add sample data for demonstration
    if (bookings.length === 0) {
        bookings = getSampleBookings();
        localStorage.setItem('userBookings', JSON.stringify(bookings));
    }
    
    renderBookings(bookings);
}

// Sample Bookings Data
function getSampleBookings() {
    return [
        {
            id: 'BK001',
            movieTitle: 'Avengers: End Game',
            moviePoster: 'images/home4.png',
            showDate: 'Dec 20, 2024',
            showTime: '7:00 PM',
            seat: 'A5',
            screen: 'Screen 1',
            amount: 15.00,
            paymentMethod: 'Card',
            bookingDate: 'Dec 15, 2024',
            status: 'upcoming'
        },
        {
            id: 'BK002',
            movieTitle: 'Spider-Man No Way Home',
            moviePoster: 'images/home3.jpg',
            showDate: 'Dec 12, 2024',
            showTime: '9:30 PM',
            seat: 'B3',
            screen: 'Screen 2',
            amount: 18.00,
            paymentMethod: 'Cash',
            bookingDate: 'Dec 10, 2024',
            status: 'completed'
        },
        {
            id: 'BK003',
            movieTitle: 'Thor Love and Thunder',
            moviePoster: 'images/home2.png',
            showDate: 'Dec 25, 2024',
            showTime: '2:30 PM',
            seat: 'C1',
            screen: 'Screen 3',
            amount: 16.50,
            paymentMethod: 'Mobile Payment',
            bookingDate: 'Dec 18, 2024',
            status: 'upcoming'
        }
    ];
}

// Render Bookings
function renderBookings(bookings) {
    const bookingsList = document.getElementById('bookingsList');
    
    console.log('Rendering bookings:', bookings);
    
    // Clear all existing booking cards
    bookingsList.innerHTML = '';
    
    // Add all bookings
    bookings.forEach(booking => {
        const bookingCard = createBookingCard(booking);
        bookingsList.appendChild(bookingCard);
    });
    
    // Update statistics after rendering
    updateStatistics();
}

// Create Booking Card
function createBookingCard(booking) {
    const card = document.createElement('div');
    card.className = `booking-card ${booking.status}`;
    card.setAttribute('data-status', booking.status);
    
    card.innerHTML = `
        <div class="booking-header">
            <div class="booking-info">
                <h3>${booking.movieTitle}</h3>
                <div class="booking-meta">
                    <span class="booking-id">#${booking.id}</span>
                    <span class="booking-date">Booked on: ${booking.bookingDate}</span>
                </div>
            </div>
            <div class="booking-status">
                <span class="status-badge ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
            </div>
        </div>
        
        <div class="booking-details">
            <div class="detail-row">
                <div class="detail-item">
                    <i class='bx bx-calendar'></i>
                    <span>Show Date: ${booking.showDate}</span>
                </div>
                <div class="detail-item">
                    <i class='bx bx-time'></i>
                    <span>Show Time: ${booking.showTime}</span>
                </div>
            </div>
            <div class="detail-row">
                <div class="detail-item">
                    <i class='bx bx-chair'></i>
                    <span>Seat: ${booking.seat}</span>
                </div>
                <div class="detail-item">
                    <i class='bx bx-credit-card'></i>
                    <span>Payment: ${booking.paymentMethod}</span>
                </div>
            </div>
            <div class="detail-row">
                <div class="detail-item">
                    <i class='bx bx-map'></i>
                    <span>Screen: ${booking.screen}</span>
                </div>
                <div class="detail-item">
                    <i class='bx bx-dollar'></i>
                    <span>Amount: $${booking.amount.toFixed(2)}</span>
                </div>
            </div>
        </div>
        
        <div class="booking-actions">
            <button class="action-btn primary" onclick="viewTicket('${booking.id}')">
                <i class='bx bx-qr'></i> View Ticket
            </button>
            ${getActionButtons(booking)}
        </div>
    `;
    
    return card;
}

// Get Action Buttons based on booking status
function getActionButtons(booking) {
    switch (booking.status) {
        case 'upcoming':
            return `<button class="action-btn secondary" onclick="cancelBooking('${booking.id}')">
                <i class='bx bx-x'></i> Cancel
            </button>`;
        case 'completed':
            return `<button class="action-btn secondary" onclick="rateMovie('${booking.movieTitle}')">
                <i class='bx bx-star'></i> Rate Movie
            </button>`;
        case 'cancelled':
            return `<button class="action-btn secondary" onclick="rebookMovie('${booking.movieTitle}')">
                <i class='bx bx-refresh'></i> Rebook
            </button>`;
        default:
            return '';
    }
}

// Update Statistics
function updateStatistics() {
    const bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    
    const totalBookings = bookings.length;
    const upcomingBookings = bookings.filter(b => b.status === 'upcoming').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    
    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('upcomingBookings').textContent = upcomingBookings;
    document.getElementById('completedBookings').textContent = completedBookings;
    
    console.log('Statistics updated:', { totalBookings, upcomingBookings, completedBookings });
}

// Add refresh functionality
function addRefreshFunctionality() {
    // Add a refresh button to the page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader && !document.querySelector('.refresh-btn')) {
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'refresh-btn';
        refreshBtn.innerHTML = '<i class="bx bx-refresh"></i> Refresh';
        refreshBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.5rem 1rem;
            background: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        `;
        
        refreshBtn.addEventListener('click', () => {
            refreshBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Refreshing...';
            setTimeout(() => {
                loadBookings();
                refreshBtn.innerHTML = '<i class="bx bx-refresh"></i> Refresh';
                showToast('Bookings refreshed!', 'success');
            }, 1000);
        });
        
        pageHeader.style.position = 'relative';
        pageHeader.appendChild(refreshBtn);
    }
}

// Debug function to check localStorage
function debugBookings() {
    console.log('=== BOOKINGS DEBUG ===');
    console.log('localStorage userBookings:', localStorage.getItem('userBookings'));
    console.log('Parsed bookings:', JSON.parse(localStorage.getItem('userBookings') || '[]'));
    console.log('User data:', localStorage.getItem('magicCinemaUser'));
    console.log('======================');
}

// Event Listeners
function setupEventListeners() {
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('ticketModal');
        if (e.target === modal) {
            closeTicketModal();
        }
    });
    
    // Toast close button
    const toastClose = document.querySelector('.toast-close');
    if (toastClose) {
        toastClose.addEventListener('click', hideToast);
    }
}

// View Ticket
function viewTicket(bookingId) {
    const bookings = JSON.parse(localStorage.getItem('userBookings')) || getSampleBookings();
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking) {
        showToast('Booking not found', 'error');
        return;
    }
    
    // Update ticket modal content
    document.getElementById('ticketId').textContent = `#${booking.id}`;
    document.getElementById('ticketMovieTitle').textContent = booking.movieTitle;
    document.getElementById('ticketDate').textContent = booking.showDate;
    document.getElementById('ticketTime').textContent = booking.showTime;
    document.getElementById('ticketSeat').textContent = `Seat ${booking.seat}`;
    document.getElementById('ticketScreen').textContent = booking.screen;
    document.getElementById('ticketPoster').src = booking.moviePoster;
    
    // Show modal
    document.getElementById('ticketModal').classList.add('active');
}

// Close Ticket Modal
function closeTicketModal() {
    document.getElementById('ticketModal').classList.remove('active');
}

// Download Ticket
function downloadTicket() {
    showToast('Ticket download started!', 'success');
    // In a real app, this would generate and download a PDF
    setTimeout(() => {
        showToast('Ticket downloaded successfully!', 'success');
    }, 2000);
}

// Share Ticket
function shareTicket() {
    if (navigator.share) {
        navigator.share({
            title: 'My Movie Ticket',
            text: 'Check out my movie ticket!',
            url: window.location.href
        }).then(() => {
            showToast('Ticket shared successfully!', 'success');
        }).catch(() => {
            copyToClipboard();
        });
    } else {
        copyToClipboard();
    }
}

// Copy to Clipboard
function copyToClipboard() {
    const ticketInfo = document.getElementById('ticketMovieTitle').textContent;
    const ticketId = document.getElementById('ticketId').textContent;
    const text = `Movie: ${ticketInfo}\nTicket ID: ${ticketId}`;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('Ticket info copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy ticket info', 'error');
    });
}

// Cancel Booking
function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        const bookings = JSON.parse(localStorage.getItem('userBookings')) || getSampleBookings();
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = 'cancelled';
            localStorage.setItem('userBookings', JSON.stringify(bookings));
            
            // Refresh the page to update UI
            location.reload();
            
            showToast('Booking cancelled successfully', 'success');
        }
    }
}

// Rate Movie
function rateMovie(movieTitle) {
    const rating = prompt(`Rate "${movieTitle}" from 1 to 5 stars:`);
    
    if (rating && rating >= 1 && rating <= 5) {
        showToast(`Thank you for rating "${movieTitle}" with ${rating} stars!`, 'success');
        
        // In a real app, this would save the rating to the database
        const ratings = JSON.parse(localStorage.getItem('movieRatings')) || {};
        ratings[movieTitle] = parseInt(rating);
        localStorage.setItem('movieRatings', JSON.stringify(ratings));
    } else if (rating !== null) {
        showToast('Please enter a rating between 1 and 5', 'error');
    }
}

// Rebook Movie
function rebookMovie(movieTitle) {
    if (confirm(`Would you like to rebook "${movieTitle}"?`)) {
        showToast(`Redirecting to book "${movieTitle}"...`, 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('magicCinemaUser');
        sessionStorage.removeItem('magicCinemaUser');
        
        showToast('Logged out successfully', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Update toast content
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    if (type === 'success') {
        toastIcon.className = 'toast-icon bx bx-check-circle';
    } else {
        toastIcon.className = 'toast-icon bx bx-x-circle';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        hideToast();
    }, 3000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
}

// Add New Booking (for testing)
function addNewBooking(movieTitle, showDate, showTime, seat, amount) {
    const bookings = JSON.parse(localStorage.getItem('userBookings')) || getSampleBookings();
    
    const newBooking = {
        id: `BK${String(bookings.length + 1).padStart(3, '0')}`,
        movieTitle: movieTitle,
        moviePoster: 'images/home1.jpg',
        showDate: showDate,
        showTime: showTime,
        seat: seat,
        screen: 'Screen 1',
        amount: amount,
        paymentMethod: 'Card',
        bookingDate: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }),
        status: 'upcoming'
    };
    
    bookings.push(newBooking);
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    
    // Refresh the page to show new booking
    location.reload();
}

// Export functions for global access
window.viewTicket = viewTicket;
window.closeTicketModal = closeTicketModal;
window.downloadTicket = downloadTicket;
window.shareTicket = shareTicket;
window.cancelBooking = cancelBooking;
window.rateMovie = rateMovie;
window.rebookMovie = rebookMovie;
window.logout = logout;
window.debugBookings = debugBookings;

// Test function to add a sample booking
function addTestBooking() {
    const testBooking = {
        id: `BK${Date.now()}`,
        movieTitle: 'Test Movie',
        moviePoster: 'images/home1.jpg',
        showDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }),
        showTime: '7:00 PM',
        seat: 'A1',
        screen: 'Screen 1',
        amount: 15.00,
        paymentMethod: 'Card',
        bookingDate: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }),
        status: 'upcoming',
        customerName: 'Test User',
        customerPhone: '123-456-7890',
        createdAt: new Date().toISOString()
    };
    
    let bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    bookings.push(testBooking);
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    
    loadBookings();
    showToast('Test booking added!', 'success');
}

// Export test function
window.addTestBooking = addTestBooking;

// Debug on page load
setTimeout(() => {
    debugBookings();
}, 1000);
