const feedCreatureId = document.getElementById('icon').getAttribute('data-id');
const feedBtn = document.getElementById('feedBtn');

// TODO: add carestat routes
const feedCreature = () => {
    try {
        fetch(`http://localhost:3001/creature/${id}`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            
            // Now have carestat obj...

            if(data[0].carestat.energy > 0) {
                if (data[0].carestat.hunger > 4) {
                    let newHungerVal = data[0].carestat.hunger++;
                    let newEnergyVal = data[0].carestat.energy--;
                    fetch(`http://localhost:3001/creature/${id}`, {
                        method: 'PUT',
                        body: {
                            carestat: {
                                hunger: newHungerVal,
                                energy: newEnergyVal,
                            },
                        },
                    }).then((response) => {
                        response.json()
                    }).then((data) => console.log(data));
                };
            };
        });
    } catch (error) { console.log('Error getting data from the database') };
};

// feedBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     feedCreature(feedCreatureId);
// });