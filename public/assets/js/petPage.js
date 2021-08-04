// Buttons...
const feedBtn = document.getElementById('feed');
const petBtn = document.getElementById('pet');
const catchBtn = document.getElementById('catch');
const icon = document.getElementById('icon');
const iconDiv = document.getElementById('icon-holder');

// Creature State Check... (dummy vars)
const checkState = () => {

    if (creature_happiness > 5) {

        icon.setAttribute('class', `fab ${creature_icon} fa-10x`);
        iconDiv.setAttribute('class', '');
        void icon.offsetWidth;
        icon.setAttribute('class', `fab ${creature_icon} fa-10x happy`);

    } else if (creature_hunger < 5) {

        icon.setAttribute('class', `fab ${creature_icon} fa-10x`);
        iconDiv.setAttribute('class', '');
        void icon.offsetWidth;
        icon.setAttribute('class', `fab ${creature_icon} fa-10x hungry`);

    } else if (creature_groomed > 5) {

        icon.setAttribute('class', `fab ${creature_icon} fa-10x`);
        iconDiv.setAttribute('class', '');
        void icon.offsetWidth;
        icon.setAttribute('class', `fab ${creature_icon} fa-10x groomed`);
        iconDiv.setAttribute('class', 'creature-groomed');

    } else {

        icon.setAttribute('class', `fab ${creature_icon} fa-10x`);
        iconDiv.setAttribute('class', '');
        void icon.offsetWidth;
        icon.setAttribute('class', `fab ${creature_icon} fa-10x rest`);

    }

}
// checkState();
const playCatch = () => {
    
}
// Button Events...
feedBtn.addEventListener('click', (event) => {
    // Run food animation? throwing little brick at icon, icon "eats", hunger stat goes up
});

petBtn.addEventListener('click', (event) => {
    // Run pet animation? little hand on top of icon, icon squish, happiness stat goes up
});

catchBtn.addEventListener('click', (event) => {
    // Run catch script, timing based 1-click game with ball going back and forth? just toss (same animation as food?)
});