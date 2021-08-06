const catchCreatureId = document.getElementById('icon').getAttribute('data-id');
const catchBtn = document.getElementById('catchBtn');

const catchCreature = (id) => {
    try {
        fetch(`http://localhost:3001/creature/${id}`, {
            method: 'GET',
        }).then((response) => {
            response.json();
        }).then((data) => {

            // Now have our carestat obj...

            if (data[0].carestat.energy > 0) {
                let updatedHappinessVal = data[0].carestat.happiness++;
                let updatedEnergyVal = data[0].carestat.energy--;
                try {
                    fetch(`http://localhost:3001/creature/${id}`, {
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

// catchBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     catchCreature(catchCreatureId);
// });