// Time Variables For Demo!
const numHoursHunger = 1;
const numHoursHappiness = 3;
const numHoursGrooming = 5;
const numHoursEnergy = 1;

const updateCreatureId = document.getElementById('icon').getAttribute('data-id')
const userId = document.getElementById('icon').getAttribute('data-user');
const icon = document.getElementById('icon');
const iconDiv = document.getElementById('icon-holder');

const updateCreatureStats = async (creatureID, userID) => {
    // Get our data from the server
    try {
        const currentCare = await fetch(`http://localhost:3001/creature/care/${creatureID}`, { method: 'GET' }).then((response) => response.json());

            console.log(currentCare);
            const dbTime = new Date(Date.parse(currentCare.lastinteraction)).getTime();
            let currentTime = new Date().getTime();

            // How long since last visit in hours?
            const diffInTime = Math.round((currentTime - dbTime) / (1000 * 60 * 60));

            // Hunger...
            const updatedCareStat = { 
                id: currentCare.id,
                lastinteraction: new Date(),
            };

            // Check and degrade values...
            // Dete
            if (diffInTime > numHoursHunger) {
                if(currentCare.hunger > 0) {
                    updatedCareStat.hunger = currentCare.hunger--;
                };
            };
            if (diffInTime > numHoursHappiness) {
                if(currentCare.happiness > 0) {
                    updatedCareStat.happiness = currentCare.happiness--;
                };
            };
            if (diffInTime > numHoursGrooming) {
                if(currentCare.grooming > 0) {
                    updatedCareStat.grooming = currentCare.grooming--;
                };
            };
            if (diffInTime > numHoursEnergy) {
                if (currentCare.energy < 5) {
                    updatedCareStat.energy = currentCare.energy++;
                };
            };
            try {
                // Post request to update creature stats
                fetch(`http://localhost:3001/creature/care/${creatureID}`, {
                    method: 'PUT',
                    body: updatedCareStat
                });
            } catch (error) {
                console.log(error);
                console.log('Error when updating stats to database');
            };
        
            // ANIMATIONS...
            try {
            const newPull = await fetch(`http://localhost:3001/creature/care/${creatureID}`, {
                method: 'GET',
            });
            console.log(newPull.json());
            const brandPull = await fetch(`http://localhost:3001/creature/?user=${userId}&creature=${creatureID}`, {
                method: 'GET',
            });
            console.log(brandPull.json());
            if (newPull.happiness > 3) {
                icon.setAttribute('class', `fab ${brandPull[0].brand.icon} fa-8x`);
                iconDiv.setAttribute('class', '');
                // Might need to move this statement to AFTER the animation class add (eg: happy)
                void icon.offsetWidth;
                icon.setAttribute('class', `fab ${brandPull[0].brand.icon} fa-8x happy`);
            } else if (newPull.hunger > 4) {
                icon.setAttribute('class', `fab ${brandPull[0].brand.icon} fa-8x`);
                iconDiv.setAttribute('class', '');
                void icon.offsetWidth;
                icon.setAttribute('class', `fab ${brandPull[0].brand.icon} fa-8x hungry`);

                // COMMENTING OUT GROOMING FOR NOW (COMPLICATED ANIMATION CURRENTLY)

                // } else if (newPull.grooming = 5) {
                //     icon.setAttribute('class', `fab ${brandPull[0].brand.icon} fa-8x`);
                //     iconDiv.setAttribute('class', '');
                //     void icon.offsetWidth;
                //     icon.setAttribute('class', `fab ${brandPull[0].brand.icon} fa-8x groomed`);
                //     iconDiv.setAttribute('class', 'creature-groomed');

            } else {
                icon.setAttribute('class', `fab ${brandPull[0].brand.icon} fa-8x`);
                iconDiv.setAttribute('class', '');
                void icon.offsetWidth;
                icon.setAttribute('class', `fab ${brandPull[0].brand.icon} fa-8x rest`);
            }
        } catch (error) {
            console.log(error);
            console.log('Error setting animations');
        };
    } catch (error) {
        console.log(error);
        console.log('Error getting data from database');
    };
}

updateCreatureStats(updateCreatureId);