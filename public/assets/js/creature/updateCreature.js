// Time Variables For Demo!
const numHoursHunger = 1;
const numHoursHappiness = 3;
const numHoursGrooming = 5;
const numHoursEnergy = 1;

// // for testing in node
// const fetch = require('node-fetch');

const updateCreatureStats = (id) => {
    // Get our data from the server
    try {
        fetch(`http://localhost:3001/creature/${id}`, { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
            const dbTime = new Date(Date.parse(data[0].carestat.lastinteraction)).getTime();
            let currentTime = new Date().getTime();
            // How long since last visit in hours?
            const diffInTime = Math.round((currentTime - dbTime) / (1000 * 60 * 60));
            // Hunger...
            const updatedCareStat = { 
                id: data[0].carestat.id,
            };
            // Check and degrade values...
            if (diffInTime > numHoursHunger) {
                updatedCareStat.hunger = data[0].carestat.hunger--;
            };
            if (diffInTime > numHoursHappiness) {
                updatedCareStat.happiness = data[0].carestat.happiness--;
            };
            if (diffInTime > numHoursGrooming) {
                updatedCareStat.grooming = data[0].carestat.grooming--;
            };
            if (diffInTime > numHoursEnergy) {
                updatedCareStat.energy = data[0].carestat.energy++;
            };
            try {
                // Post request to update creature stats
                fetch(`http://localhost:3001/creature/${id}`, {
                    method: 'PUT',
                    body: updateCreatureStats
                });
            } catch (error) {
                console.log('Error when updating stats to database');
            };
        });
    } catch (error) {
        console.log('Error getting data from database');
    };
}

module.exports = updateCreatureStats