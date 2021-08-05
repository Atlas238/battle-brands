// USE 1 Energy to raise happiness
const catchCreature = async () => {
    try {
        fetch('http://localhost:3001/api/stats/1', {
            method: 'GET',
        }).then((response) => {
            response.json();
        }).then((data) => {

            // Now have our carestat obj...

            if (data[0].carestat.energy > 0) {
                let updatedHappinessVal = data[0].carestat.happiness++;
                let updatedEnergyVal = data[0].carestat.energy--;
                try {
                    fetch('http://localhost:3001/api/stats/1', {
                        method: 'PUT',
                        body: {
                            carestat: {
                                happiness: updatedHappinessVal,
                                energy: updatedEnergyVal,
                            },
                        }
                    }).then((response) => {
                        response.json();
                    }).then((data) => {
                        console.log(data);
                    });
                } catch (error) {console.log(error)}
            };
        });
    } catch (error) {console.log(error)};
};

module.exports = catchCreature;