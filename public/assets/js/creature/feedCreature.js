

const feedCreature = async () => {
    try {
        fetch('http://api/stats/1', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {

        })
    } catch (error) {
        console.log('Error getting data from the database');
    }

    
    
}