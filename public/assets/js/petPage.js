// Buttons...
const feedBtn = document.getElementById('feed');
const petBtn = document.getElementById('pet');
const catchBtn = document.getElementById('catch');
const icon = document.getElementById('icon');
const iconDiv = document.getElementById('icon-holder');

const { catchCreature, feedCreature, petCreature, updateCreature } = require('./creature');

// Creature State Check... (dummy vars)
const checkState = () => {
    fetch('http://localhost:3001/api/stats/1', {
        method: 'GET',
    }).then((response) => {
        response.json();
    }).then((data) => {
        if (data[0].carestat.happiness > 3) {
            icon.setAttribute('class', `fab ${data[0].brand.icon} fa-10x`);
            iconDiv.setAttribute('class', '');
            // Might need to move this statement to AFTER the animation class add (eg: happy)
            void icon.offsetWidth;
            icon.setAttribute('class', `fab ${data[0].brand.icon} fa-10x happy`);
        } else if (data[0].carestat.hunger > 4) {
            icon.setAttribute('class', `fab ${data[0].brand.icon} fa-10x`);
            iconDiv.setAttribute('class', '');
            void icon.offsetWidth;
            icon.setAttribute('class', `fab ${data[0].brand.icon} fa-10x hungry`);
        } else if (data[0].carestat.grooming = 5) {
            icon.setAttribute('class', `fab ${data[0].brand.icon} fa-10x`);
            iconDiv.setAttribute('class', '');
            void icon.offsetWidth;
            icon.setAttribute('class', `fab ${data[0].brand.icon} fa-10x groomed`);
            iconDiv.setAttribute('class', 'creature-groomed');
        } else {
            icon.setAttribute('class', `fab ${data[0].brand.icon} fa-10x`);
            iconDiv.setAttribute('class', '');
            void icon.offsetWidth;
            icon.setAttribute('class', `fab ${data[0].brand.icon} fa-10x rest`);
        }
    })

}

// Button Events...
feedBtn.addEventListener('click', (event) => {
    event.preventDefault();
    feedCreature();
});

petBtn.addEventListener('click', (event) => {
    event.preventDefault();
    petCreature();
});

catchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    catchCreature();
});