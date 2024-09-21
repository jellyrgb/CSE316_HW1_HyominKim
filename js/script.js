const facilities = [
    { id: "gym", name: "Gym", description: "sports hall", capacity: 4, location: "C1033", availability: "Available to all", image: "images/gym.jpg" },
    { id: "auditorium", name: "Auditorium", description: "the auditorium theater", capacity: 30, location: "A234", availability: "Available to all", image: "images/auditorium.jpg" },
    { id: "pool", name: "Swimming Pool", description: "aqautic center", capacity: 4, location: "C1033", availability: "Available to all", image: "images/pool.jpg" },
    { id: "seminar", name: "Seminar Room", description: "lecture hall", capacity: 4, location: "C1033", availability: "Available to all", image: "images/seminar.jpg" },
    { id: "conference", name: "Conference Room", description: "meeting space", capacity: 4, location: "C1033", availability: "Only for SUNY Korea", image: "images/conference.jpg" },
    { id: "library", name: "Library", description: "study and read books", capacity: 4, location: "C1033", availability: "Only for SUNY Korea", image: "images/library.jpg" },
];


const facilityList = document.getElementById('facility-list');
if (facilityList) {
    facilities.forEach(facility => {
        displayFacilityInfo(facility.id);
    });
}

// Event listener for facility selection
document.getElementById('facility').addEventListener('change', function() {
    console.log("OKAY")
    const facilityDisplay = document.getElementById('facility-display');
    if (facilityDisplay) {
        displayFacilityInfo(this.value);
    }
});

// Initial display of facility information
document.addEventListener('DOMContentLoaded', function() {
    const initialFacility = document.getElementById('facility').value;
    displayFacilityInfo(initialFacility);
});

const facilitySelect = document.getElementById('facility');
if (facilitySelect) {
    displayFacilityInfo(facilitySelect.value);
}

function displayFacilityInfo(facilityId) {
    const facility = facilities.find(f => f.id === facilityId);
    const facilityInfoDiv = document.getElementById('facility-display');
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
        facilityList.appendChild(facilityItem);
    } else {
        facilityInfoDiv.innerHTML = '<p>No information available.</p>';
    }
}

// Reservation form logic
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const facility = document.getElementById('facility').value;
        const date = new Date(document.getElementById('date').value);
        const people = parseInt(document.getElementById('people').value);
        const affiliation = document.querySelector('input[name="affiliation"]:checked').value;
        const facilityDetails = facilities.find(f => f.id === facility);

        // Check if reservation is valid
        if (people > facilityDetails.capacity) {
            alert("Cannot reserve: People exceed facility capacity.");
        } else if (date < new Date()) {
            alert("Cannot reserve: Date is in the past.");
        } else if (facilityDetails.id !== 'pool' && affiliation === 'no') {
            alert("Cannot reserve: Only SUNY Korea affiliated members can reserve this facility.");
        } else {
            alert("Reservation successful!");
            localStorage.setItem('reservation', JSON.stringify({
                facility: facilityDetails.name,
                date: date,
                people: people
            }));
        }
    });
}
