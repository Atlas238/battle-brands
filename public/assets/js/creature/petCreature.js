const petCreatureId = document.getElementById('icon').getAttribute('data-id');
const petBtn = document.getElementById('petBtn');

const petCreature = (id) => {
    try {
        fetch(`http://localhost:3001/creature/care/${id}`, {
            method: 'GET'
        }).then((response) => {
            response.json();
        }).then((carestats) => {
            // Now have carestat obj...
            if (carestats.energy > 0) {
                let updatedGroomingVal = carestats.grooming++;
                let updatedEnergyVal = carestats.energy--;
                try {
                    fetch(`http://localhost:3001/creature/care/${id}`, {
                        method: 'PUT',
                        body: {
                            grooming: updatedGroomingVal,
                            energy: updatedEnergyVal,
                        },
                    }).then((response) => {
                        response.json();
                    }).then((data) => console.log(data));
                } catch (error) { console.log(error) };
            };
        });
    } catch (error) { console.log(error) };
};

petBtn.addEventListener('click', (event) => {
    event.preventDefault();
    petCreature(petCreatureId);
});