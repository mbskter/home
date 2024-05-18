document.addEventListener('DOMContentLoaded', function () {
    // Initialize Materialize components
    M.AutoInit();

    // Load DJ Logos from JSON
    fetch('data/logos.json')
        .then(response => response.json())
        .then(logos => {
            const logoContainer = document.querySelector('.logo-container');
            logos.forEach(logo => {
                const div = document.createElement('div');
                div.className = 'logo-wrapper';

                const img = document.createElement('img');
                img.src = logo.src;
                img.alt = 'DJ Logo';

                div.appendChild(img);
                logoContainer.appendChild(div);
            });
        });

    // Load Events from JSON
    fetch('data/events.json')
        .then(response => response.json())
        .then(events => {
            const timelineContainer = document.querySelector('.timeline-container');
            events.sort((a, b) => new Date(a.date) - new Date(b.date));
            events.forEach((event, index) => {
                const eventDiv = document.createElement('div');
                eventDiv.className = `timeline-event ${index % 2 === 0 ? 'left' : 'right'}`;

                const contentDiv = document.createElement('div');
                contentDiv.className = 'content';

                const eventTitle = document.createElement('h3');
                eventTitle.textContent = event.name;

                const eventDate = document.createElement('p');
                eventDate.textContent = event.date;

                const eventImage = document.createElement('img');
                eventImage.src = event.image;
                eventImage.alt = event.name;
                eventImage.addEventListener('click', () => {
                    showImageModal(event.image);
                });

                const eventDetails = document.createElement('div');
                eventDetails.className = 'event-details';
                eventDetails.innerHTML = `<p><strong>Location:</strong> ${event.location}</p>`;

                contentDiv.appendChild(eventTitle);
                contentDiv.appendChild(eventDate);
                contentDiv.appendChild(eventImage);
                contentDiv.appendChild(eventDetails);
                eventDiv.appendChild(contentDiv);
                timelineContainer.appendChild(eventDiv);
            });
        });

    // Show Image Modal
    function showImageModal(imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.display = 'flex';

        const modalContent = document.createElement('div');
        modalContent.className = 'image-modal-content';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Event Image';

        modalContent.appendChild(img);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
            modal.remove();
        });
    }
});
