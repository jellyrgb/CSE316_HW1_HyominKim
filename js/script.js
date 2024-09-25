// Information for the facilities
const facilities = [
    { id: "gym", name: "Gym", description: "sports hall", capacity: 4, location: "C1033", availability: "Available to all", image: "images/gym.jpg" },
    { id: "auditorium", name: "Auditorium", description: "the auditorium theater", capacity: 30, location: "A234", availability: "Available to all", image: "images/auditorium.jpg" },
    { id: "pool", name: "Swimming Pool", description: "aqautic center", capacity: 4, location: "C1033", availability: "Available to all", image: "images/pool.jpg" },
    { id: "seminar", name: "Seminar Room", description: "lecture hall", capacity: 4, location: "C1033", availability: "Available to all", image: "images/seminar.jpg" },
    { id: "conference", name: "Conference Room", description: "meeting space", capacity: 4, location: "C1033", availability: "Only for SUNY Korea", image: "images/conference.jpg" },
    { id: "library", name: "Library", description: "study and read books", capacity: 4, location: "C1033", availability: "Only for SUNY Korea", image: "images/library.jpg" },
];

// Display facility information - Facility List page
const facilityList = document.getElementById('facility-list');
if (facilityList) {
    facilities.forEach(facility => {
        displayFacilityInfo(facility.id, facilityList);
    });
}

// Display facility information - Reservation page
const initialFacility = document.getElementById('facility-list-reservation');
displayFacilityInfo("gym", initialFacility);

// Event listener for facility selection
if (initialFacility) {
    // Everytime the user selects facility with dropdown, display the facility information
    document.getElementById('facility').addEventListener('change', function() {
        const facilityDisplay = document.getElementById('facility-list-reservation');
        if (facilityDisplay) {
            // Clear the existing facility information
            facilityDisplay.innerHTML = '';

            // Display newly selected facility information
            displayFacilityInfo(this.value, facilityDisplay);
        }
    });
}

// Function to display facility information
// @param target: the HTML element to display the facility information
function displayFacilityInfo(facilityId, target) {
    const facility = facilities.find(f => f.id === facilityId);

    // If target is not found, do nothing
    if (!target) {
        return;
    }

    if (facility) {
        const facilityItem = document.createElement('div');
        facilityItem.classList.add('facility-item');

        // I used bootstrap svg icons to display the related information
        facilityItem.innerHTML = `
            <img src="${facility.image}" alt="${facility.name}">
            <div class="facility-info">
                <h2>${facility.name}</h2>
                <p>${facility.description}</p>

                <div class="capacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                    </svg>
                    <span>${facility.capacity}</span>
                </div>

                <div class="location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"/>
                    <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                    </svg>
                    <span>${facility.location}</span>
                </div>

                <div class="availability">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                    </svg>
                    <span>${facility.availability}</span>
                </div>
            </div>
        `;
        target.appendChild(facilityItem);
    } else {
        // If facility is invalid, display a message
        target.innerHTML = '<p>No information available.</p>';
    }
}

// Reservation form logic
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
    // Everytime the user submits the form, save the data
    reservationForm.addEventListener('submit', function(event) {
        // Prevent from the user to submit the form with default behavior
        event.preventDefault();

        // Get the form data from the user input
        const facility = document.getElementById('facility').value;
        const date = new Date(document.getElementById('date').value);
        const people = parseInt(document.getElementById('people').value, 10);
        const affiliation = document.querySelector('input[name="affiliation"]:checked').value;
        const purpose = document.getElementById('purpose').value;

        // Data needed to validate the reservation
        const today = new Date();
        const facilityCapacity = facilities.find(f => f.id === facility).capacity;
        const isSUNYOnly = facilities.find(f => f.id === facility).availability === 'Only for SUNY Korea';

        // Check if the reservation is valid
        if (people > facilityCapacity) {
            alert("Cannot reserve. (Capacity)");
            return;
        }

        if (date < today) {
            alert("Cannot reserve. (Date)");
            return;
        }

        if (isSUNYOnly && affiliation === 'no') {
            alert("Cannot reserve. (Affiliation)");
            return;
        }

        // Reservation data to be saved
        const reservationData = {
            facility,
            date: date.toISOString().split('T')[0], // split() is to save the date in YYYY-MM-DD format
            people,
            affiliation,
            purpose
        };

        // Save the reservation data to the local storage
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservationData);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        alert("Reserved successfully.");
    });
}

// Modal logic for the profile page
document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is on the profile page
    if (window.location.pathname.endsWith('profile.html')) {
        // Change image modal logic
        const changeImageButton = document.getElementById('change-image');
        const imageModal = new bootstrap.Modal(document.getElementById('image-modal'));

        if (changeImageButton) {
            // Show modal when the user clicks the change image button
            changeImageButton.addEventListener('click', function() {
                imageModal.show();
            });
        }

        // Change password modal logic
        const changePasswordButton = document.getElementById('change-password');
        const passwordModal = new bootstrap.Modal(document.getElementById('password-modal'));

        if (changePasswordButton) {
            // Show modal when the user clicks change password button
            changePasswordButton.addEventListener('click', function() {
                passwordModal.show();
            });
        }
    }
});

// Reservation list logic for reservations page
const reservationList = document.getElementById('reservation-list');
// Get reservations from the local storage
const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

if (reservations.length === 0) {
    // Display 'No Reservation Found' if there is no reservations yet
    reservationList.innerHTML = '<h1 class="page-title">No Reservation Found</h1>';
} else {
    // Repeat through all the reservations in the local storage
    reservations.forEach(reservation => {
        const reservedItem = document.createElement('div');
        reservedItem.classList.add('reserved-item');

        // Display reservation info if there is any reservation
        reservedItem.innerHTML = displayReservationInfo(reservation, reservation.facility, reservationList);
    });
}

// Function to display reservation
// Similar to displayFacilityInfo, but with this function needs reservation JSON data
function displayReservationInfo(reservation, facilityId, target) {
    const facility = facilities.find(f => f.id === facilityId);

    // If target is not found, do nothing
    if (!target) {
        return;
    }

    if (facility) {
        const facilityItem = document.createElement('div');
        facilityItem.classList.add('facility-item');
        
        // I used svg to display the related information
        facilityItem.innerHTML = `
            <img src="${facility.image}" alt="${facility.name}">
            <div class="facility-info">
                <h2>${facility.name}</h2>
                <p>${reservation.purpose}</p>

                <div class="capacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                    <span>${reservation.date}</span>
                </div>

                <div class="location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                    </svg>
                    <span>${reservation.people}</span>
                </div>

                <div class="availability">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"/>
                    <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                    </svg>
                    <span>${facility.location}</span>
                </div>
            </div>
        `;
        target.appendChild(facilityItem);
    } else {
        // If facility is invalid, display a message
        target.innerHTML = '<p>No information available.</p>';
    }
}

// Change navbar to hamburger menu logic
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('main');

    // Toggle the visibility of the navbar on hamburger menu click
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navbar.classList.toggle('navbar-active');
            
            // Shift the rest of the content down
            if (navbar.classList.contains('navbar-active')) {
                mainContent.style.marginTop = '150px';
            } else {
                // Reset the margin when hamburger menu is closed
                mainContent.style.marginTop = '0';
            }
        });
    }
});

// Button click effect logic (turn to grey when modal is onscreen)
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');

    // Make it work for all of the modals in the page
    const imageModal = document.getElementById('image-modal');
    const passwordModal = document.getElementById('password-modal');

    // If the user clicks the button, change the state to clicked
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.classList.add('clicked');
        });
    });

    // When the modal is hidden, remove the clicked state
    const removeClickedClass = () => {
        buttons.forEach(button => {
            button.classList.remove('clicked');
        });
    };

    // Add event remove listener to the modals
    if (imageModal || passwordModal) {
        imageModal.addEventListener('hidden.bs.modal', removeClickedClass);
        passwordModal.addEventListener('hidden.bs.modal', removeClickedClass);
    }
});