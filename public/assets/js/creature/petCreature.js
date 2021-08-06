const petCreatureId = document.getElementById('icon').getAttribute('data-id');
const petBtn = document.getElementById('petBtn');

// TODO: change routes to carestat routes
const petCreature = (id) => {
    try {
        fetch(`http://localhost:3001/creature/${id}`, {
            method: 'GET'
        }).then((response) => {
            response.json();
        }).then((data) => {
            // Now have carestat obj...
            if (data[0].carestat.energy > 0) {
                let updatedGroomingVal = data[0].carestat.grooming++;
                let updatedEnergyVal = data[0].carestat.energy--;
                try {
                    fetch(`http://localhost:3001/creature/${id}`, {
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

// petBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     petCreature(petCreatureId);
// });