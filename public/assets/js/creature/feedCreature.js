const feedCreature = async () => {
    try {
        fetch('http://api/stats/1', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            
            // Now have carestat obj...

            if(data[0].carestat.energy > 0) {
                if (data[0].carestat.hunger > 4) {
                    let newHungerVal = data[0].carestat.hunger++;
                    let newEnergyVal = data[0].carestat.energy--;
                    fetch('http://api/stats/1', {
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

module.exports = feedCreature;