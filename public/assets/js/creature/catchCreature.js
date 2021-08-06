const catchCreatureId = document.getElementById('icon').getAttribute('data-id');
const catchBtn = document.getElementById('catchBtn');

const catchCreature = (id) => {
    try {
        fetch(`http://localhost:3001/creature/care/${id}`, {
            method: 'GET',
        }).then((response) => {
            response.json();
        }).then((carestats) => {

            // Now have our carestat obj...

            if (carestats.energy > 0) {
                let updatedHappinessVal = carestats.happiness++;
                let updatedEnergyVal = carestats.energy--;
                try {
                    fetch(`http://localhost:3001/creature/care/${id}`, {
                        method: 'PUT',
                        body: {
                            happiness: updatedHappinessVal,
                            energy: updatedEnergyVal,
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

catchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    catchCreature(catchCreatureId);
});