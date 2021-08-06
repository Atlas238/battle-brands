// Time Variables For Demo!
const numHoursHunger = 1;
const numHoursHappiness = 3;
const numHoursGrooming = 5;
const numHoursEnergy = 1;

const updateCreatureId = document.getElementById('icon').getAttribute('data-id')

const updateCreatureStats = (id) => {
    // Get our data from the server
    try {
        fetch(`http://localhost:3001/creature/care/${id}`, { method: 'GET' }).then((response) => response.json())
        .then((currentCare) => {

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
                fetch(`http://localhost:3001/creature/care/${id}`, {
                    method: 'PUT',
                    body: updatedCareStat
                });
            } catch (error) {
                console.log(error);
                console.log('Error when updating stats to database');
            };
        });
    } catch (error) {
        console.log(error);
        console.log('Error getting data from database');
    };
}

updateCreatureStats(updateCreatureId);