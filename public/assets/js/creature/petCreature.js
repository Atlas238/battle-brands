const petCreature = async () => {
    try {
        fetch('http://localhost:3001/api/stats/1', {
            method: 'GET'
        }).then((response) => {
            response.json();
        }).then((data) => {

            // Now have carestat obj...
            
            if (data[0].carestat.energy > 0) {
                let updatedGroomingVal = data[0].carestat.grooming++;
                let updatedEnergyVal = data[0].carestat.energy--;
                try {
                    fetch('http://localhost:3001/api/stats/1', {
                        method: 'PUT',
                        body: {
                            carestat: {
                                grooming: updatedGroomingVal,
                                energy: updatedEnergyVal,
                            },
                        },
                    }).then((response) => {
                        response.json();
                    }).then((data) => console.log(data));
                } catch (error) { console.log(error) };
            };
        });
    } catch (error) { console.log(error) };
};

module.exports = petCreature;