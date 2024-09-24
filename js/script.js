// Information about the facilities
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
    document.getElementById('facility').addEventListener('change', function() {
        const facilityDisplay = document.getElementById('facility-list-reservation');
        if (facilityDisplay) {
            facilityDisplay.innerHTML = '';
            displayFacilityInfo(this.value, facilityDisplay);
        }
    });
}

// Function to display facility information
function displayFacilityInfo(facilityId, target) {
    const facility = facilities.find(f => f.id === facilityId);

    // If target is not found, do nothing
    if (!target) {
        return;
    }

    if (facility) {
        const facilityItem = document.createElement('div');
        facilityItem.classList.add('facility-item');
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
        target.innerHTML = '<p>No information available.</p>';
    }
}

// Reservation form logic
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
        // 기본 제출 동작 방지
        event.preventDefault();

        const facility = document.getElementById('facility').value;
        const date = new Date(document.getElementById('date').value);
        const people = parseInt(document.getElementById('people').value, 10);
        const affiliation = document.querySelector('input[name="affiliation"]:checked').value;
        const purpose = document.getElementById('purpose').value;

        const today = new Date();
        const facilityCapacity = facilities.find(f => f.id === facility).capacity;
        const isSUNYOnly = facilities.find(f => f.id === facility).availability === 'Only for SUNY Korea';

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

        // 데이터 저장
        const reservationData = {
            facility,
            date: date.toISOString().split('T')[0],
            people,
            affiliation,
            purpose
        };

        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservationData);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        alert("Reserved successfully.");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('profile.html')) {
        const changeImageButton = document.getElementById('change-image');
        const modal = new bootstrap.Modal(document.getElementById('image-modal'));

        if (changeImageButton) {
            changeImageButton.addEventListener('click', function() {
                modal.show();
            });
        }

        const changePasswordButton = document.getElementById('change-password');
        const passwordModal = new bootstrap.Modal(document.getElementById('password-modal'));

        if (changePasswordButton) {
            changePasswordButton.addEventListener('click', function() {
                passwordModal.show();
            });
        }
    }
});


const reservationList = document.getElementById('reservation-list');
const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

if (reservations.length === 0) {
    // Display No Reservation Found if there is no reservations yet
    reservationList.innerHTML = '<h1 class="page-title">No Reservation Found</h1>';
} else {
    reservations.forEach(reservation => {
        const reservedItem = document.createElement('div');
        reservedItem.classList.add('reserved-item');
        reservedItem.innerHTML = displayReservationInfo(reservation, reservation.facility, reservationList);
    });
}

// Function to display reserved facility information
function displayReservationInfo(reservation, facilityId, target) {
    const facility = facilities.find(f => f.id === facilityId);

    // If target is not found, do nothing
    if (!target) {
        return;
    }

    if (facility) {
        const facilityItem = document.createElement('div');
        facilityItem.classList.add('facility-item');
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
        target.innerHTML = '<p>No information available.</p>';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('main');

    // Toggle the visibility of the navbar on hamburger menu click
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navbar.classList.toggle('navbar-active');
            
            // Toggle a class to shift the main content down when the navbar is expanded
            if (navbar.classList.contains('navbar-active')) {
                mainContent.style.marginTop = '150px'; // Adjust based on expanded navbar height
            } else {
                mainContent.style.marginTop = '0'; // Reset when the menu is collapsed
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    const imageModal = document.getElementById('image-modal');
    const passwordModal = document.getElementById('password-modal');

    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.classList.add('clicked');
        });
    });

    const removeClickedClass = () => {
        buttons.forEach(button => {
            button.classList.remove('clicked');
        });
    };

    if (imageModal || passwordModal) {
        imageModal.addEventListener('hidden.bs.modal', removeClickedClass);
        passwordModal.addEventListener('hidden.bs.modal', removeClickedClass);
    }
});