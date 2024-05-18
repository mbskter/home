$(document).ready(function () {
    // Load DJ Logos from JSON
    $.getJSON('data/logos.json', function (logos) {
        const $logoContainer = $('.logo-container');
        logos.forEach(logo => {
            const $div = $('<div>', { class: 'logo-wrapper col-3 col-md-2' });
            const $img = $('<img>', { src: logo.src, alt: 'DJ Logo' });
            $div.append($img);
            $logoContainer.append($div);
        });
    });

    // Load Events from JSON
    $.getJSON('data/events.json', function (events) {
        const $timelineContainer = $('.timeline-container');
        events.sort((a, b) => a.seq - b.seq); // Sort by sequence number

        events.forEach((event, index) => {
            const $eventDiv = $('<div>', { class: `timeline-event ${index % 2 === 0 ? 'left' : 'right'}` });
            const $contentDiv = $('<div>', { class: 'content' });
            const $eventTitle = $('<h3>').text(event.name);
            const $eventDate = $('<p>').text(event.date);
            const $eventImage = $('<img>', { src: event.image, alt: event.name, 'data-location': event.location });

            // Mouse hover to show location
            $eventImage.hover(
                function () {
                    const $locationDiv = $('<div>', { class: 'hover-location' }).text(event.location);
                    $(this).after($locationDiv);
                },
                function () {
                    $(this).next('.hover-location').remove();
                }
            );

            // Click to show large image in modal
            $eventImage.on('click', function () {
                showImageModal(event.image);
            });

            $contentDiv.append($eventTitle, $eventDate, $eventImage);
            $eventDiv.append($contentDiv);
            $timelineContainer.append($eventDiv);
        });
    });

    // Show Image Modal
    function showImageModal(imageSrc) {
        const $modal = $('<div>', { class: 'image-modal', css: { display: 'flex' } });
        const $modalContent = $('<div>', { class: 'image-modal-content' });
        const $img = $('<img>', { src: imageSrc, alt: 'Event Image' });

        $modalContent.append($img);
        $modal.append($modalContent);
        $('body').append($modal);

        $modal.on('click', function () {
            $modal.remove();
        });
    }
});
