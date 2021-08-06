const feedCreatureId = document.getElementById('icon').getAttribute('data-id');
const feedBtn = document.getElementById('feedBtn');

const feedCreature = (id) => {
    try {
        fetch(`http://localhost:3001/creature/care/${id}`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((carestats) => {

            console.log('Receieved Carestats for creature...');
            console.log(carestats);

            if(carestats.energy > 0) {
                if (carestats.hunger < 4) {
                    let newHungerVal = carestats.hunger + 1;
                    let newEnergyVal = carestats.energy - 1;
                    console.log('New Hunger and Energy Values...');
                    console.log(newHungerVal);
                    console.log(newEnergyVal);
                    try {
                        fetch(`http://localhost:3001/creature/care/${id}`, {
                            method: 'PUT',
                            body: {
                                hunger: newHungerVal,
                                energy: newEnergyVal,
                            },
                        }).then((response) => {
                            response.json()
                        }).then((data) => {
                            console.log('Creature carestats Updated');
                            console.log(data);
                        });
                    } catch (error) {
                        console.log('Error in updating carestats');
                        console.log(error);
                    };
                };
            };
        });
    } catch (error) { console.log('Error getting data from the database') };
};

feedBtn.addEventListener('click', (event) => {
    event.preventDefault();
    feedCreature(feedCreatureId);
});