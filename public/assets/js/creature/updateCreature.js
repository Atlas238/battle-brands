// Time Variables For Demo!
const numHoursHunger = 1;
const numHoursHappiness = 3;
const numHoursGrooming = 5;
const numHoursEnergy = 1;

// CreatureID, UserID
const updateCreatureId = document.getElementById('icon').getAttribute('data-id')
const userID = document.getElementById('icon').getAttribute('data-user');
// Creature Icon and Holder
const icon = document.getElementById('icon');
const iconDiv = document.getElementById('icon-holder');
// Buttons
const catchBtn = document.getElementById('catchBtn');
const feedBtn = document.getElementById('feedBtn');
const petBtn = document.getElementById('petBtn');
//host
const host = 'http://localhost:3001';
let notSyncing = true; //Is set to false when the player interacts with their creature, so the autosync will not run
let previousSync = moment();

const currentCreature = {
    id: 0,
    hunger: 0,
    happiness: 0,
    grooming: 0,
    energy: 0,
    lastinteraction: new Date(),
};

const init = async () => {
    try {
        const loadStats = await fetch(`${host}/creature/care/${updateCreatureId}`,{method: 'GET',}).then(resp => resp.json());
        adjustCreatureStats(loadStats);
        currentCreature.id = loadStats.id;
        currentCreature.happiness = loadStats.happiness;
        currentCreature.hunger = loadStats.hunger;
        currentCreature.grooming = loadStats.grooming;
        currentCreature.energy = loadStats.energy;
        currentCreature.lastinteraction = loadStats.lastinteraction; //last interaction is updated when one of the btns is pressed
        console.log("Starting Stats Interval");
        // updateStats();
        console.log("Syncing with database")
        // startDbAutoSync();
        previousSync = moment();
        renderMeters(happyMeter,currentCreature.happiness);
        renderMeters(hungerMeter,currentCreature.hunger);
        renderMeters(groomMeter,currentCreature.grooming);
    } catch (err) {
        console.log(err);
    }
};

const adjustCreatureStats = () => {
    const dbTime = moment(currentCreature.lastinteraction);
    let currentTime = moment();
    let diffInTime = currentTime.diff(dbTime,'hours');
    diffInTime = diffInTime < 0 ? 0 : diffInTime;

    // Check and degrade values...
    // Delete
    if (diffInTime > numHoursHunger) {
        const valueDecrease = Math.floor(diffInTime/numHoursHunger);
        if(currentCreature.hunger - valueDecrease > 0) {
            currentCreature.hunger -= valueDecrease;
        } else {
            currentCreature.hunger = 0;
        }
    }
    if (diffInTime > numHoursHappiness) {
        const valueDecrease = Math.floor(diffInTime/numHoursHappiness);
        if(currentCreature.happiness - valueDecrease > 0) {
            currentCreature.happiness -= valueDecrease;
        } else {
            currentCreature.happiness = 0;
        }
    }
    if (diffInTime > numHoursGrooming) {
        const valueDecrease = Math.floor(diffInTime/numHoursGrooming);
        if(currentCreature.grooming - valueDecrease > 0) {
            currentCreature.grooming -= valueDecrease;
        } else {
            currentCreature.grooming = 0;
        }
    }
    if (diffInTime > numHoursEnergy) {
        const valueDecrease = Math.floor(diffInTime/numHoursEnergy);
        if(currentCreature.energy - valueDecrease > 0) {
            currentCreature.energy -= valueDecrease;
        } else {
            currentCreature.energy = 0;
        }
    }
};

const updateStats = async () => {
    const updateInterval = setInterval(() => {
        adjustCreatureStats(currentCreature);
        console.log(currentCreature);
        // Render Creature Stats
    },1000*60*60);
};

// Database gets updated every minute
const startDbAutoSync = () => {
    const syncInterval = setInterval(() => {
        if(notSyncing){
            console.log("Auto Sync");
            updateDatabase();
        }
    },1000);
}

const renderMeters = (progObj,currValue) => {
    const meterSpan = document.querySelector(`#${progObj.selector}`);
    const meterList = progObj.getMeter(currValue);
    meterSpan.textContent = '';
    meterSpan.append(...meterList);
}

const updateDatabase = async () => {
    // If id is 0 then the creature was not loaded properly
    if(currentCreature.id !== 0){
        console.log('Syncing now');
        try{
            const updateSql = await fetch(`${host}/creature/care/${updateCreatureId}`, {
                method: 'PUT',
                body: JSON.stringify(currentCreature),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const respData = await updateSql.json();

            if(respData.message){
                console.log("Data backed up on the super secret cloud");
            } else {
                console.log("Data not backed up... :'(");
            }
        } catch (error){
            console.log(error);
        }
    } else {
        // clearInterval(syncInterval);
        console.log(currentCreature.id);
    }
};

// Interaction Event Listeners
feedBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if(currentCreature.hunger + 1 <= hungerMeter.maxValue){
        currentCreature.hunger++;
        currentCreature.lastinteraction=moment().format('YYYY-MM-DDTHH:mm:ss');
        updateDatabase();
        renderMeters(hungerMeter,currentCreature.hunger);
    }
});
petBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if(currentCreature.grooming + 1 <= groomMeter.maxValue){
        currentCreature.grooming++;
        currentCreature.lastinteraction=moment().format('YYYY-MM-DDTHH:mm:ss');
        updateDatabase();
        renderMeters(groomMeter,currentCreature.grooming);
    }
});
catchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if(currentCreature.happiness + 1 <= happyMeter.maxValue){
        currentCreature.happiness++;
        currentCreature.lastinteraction=moment().format('YYYY-MM-DDTHH:mm:ss');
        updateDatabase();
        renderMeters(happyMeter,currentCreature.happiness);
    }
});

init();