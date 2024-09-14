// Sample facility list data
const facilities = [
    { id: "gym", name: "Gym", capacity: 100, image: "images/gym.jpg" },
    { id: "auditorium", name: "Auditorium", capacity: 300, image: "images/auditorium.jpg" },
    { id: "conference", name: "Conference Room", capacity: 50, image: "images/conference.jpg" },
    { id: "library", name: "Library", capacity: 200, image: "images/library.jpg" },
    { id: "pool", name: "Pool", capacity: 30, image: "images/pool.jpg" },
    { id: "seminar", name: "Seminar Room", capacity: 20, image: "images/seminar.jpg" }
];

// Populate facility list page
const facilityList = document.getElementById('facility-list');
if (facilityList) {
    facilities.forEach(facility => {
        const facilityItem = document.createElement('div');
        facilityItem.innerHTML = `
            <img src="${facility.image}" alt="${facility.name}">
            <h2>${facility.name}</h2>
            <p>Capacity: ${facility.capacity}</p>
        `;
        facilityList.appendChild(facilityItem);
    });
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
