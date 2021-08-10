// Time Variables For Demo!
const numHoursHunger = 1;
const numHoursHappiness = 3;
const numHoursGrooming = 5;
const numHoursEnergy = 1;

// Global vars
const icon = document.getElementById('icon');
const updateCreatureId = icon.getAttribute('data-id')
const userID = icon.getAttribute('data-user');
const creatureBox = document.getElementById('creatureBox');

const catchBtn = document.getElementById('catchBtn');
const feedBtn = document.getElementById('feedBtn');
const petBtn = document.getElementById('petBtn');

// Host
// const host = 'http://localhost:3001';
const host = 'https://battle-brands.herokuapp.com';
let notSyncing = true; //Is set to false when the player interacts with their creature, so the autosync will not run

const currentCreature = {
    id: updateCreatureId,
    hunger: 0,
    happiness: 0,
    grooming: 0,
    energy: 0,
    lastinteraction: moment(),
};


/** Check creatures stats on page load, without an additional DB ping **/
const scanStats = () => {
    currentCreature.happiness = Number(document.getElementById('happinessState').getAttribute('value'));
    currentCreature.hunger = Number(document.getElementById('hungerState').getAttribute('value'));
    currentCreature.grooming = Number(document.getElementById('groomingState').getAttribute('value'));
    currentCreature.energy = Number(document.getElementById('energyState').getAttribute('value'));
    currentCreature.lastinteraction = moment(Date.parse(document.getElementById('icon').getAttribute('data-action'))).format('YYYY-MM-DDTHH:mm:ss');
}


const init = async () => {
    try {
        scanStats();
        adjustCreatureStats(currentCreature);
        renderAllMeters();
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
    },1000*60);
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


/** PRETTY PRETTY PET BOX! */
const renderMeters = (progObj,currValue) => {
    const meterSpan = document.querySelector(`#${progObj.selector}`);
    const meterList = progObj.getMeter(currValue);
    meterSpan.textContent = '';
    meterSpan.append(...meterList);
}

const adjustEnergy = (currValue) => {
    document.getElementById(energyMeter.selector).className = `battery-${currValue}`;
}

const renderAllMeters = () => {
    renderMeters(happyMeter,currentCreature.happiness);
    renderMeters(hungerMeter,currentCreature.hunger);
    renderMeters(groomMeter,currentCreature.grooming);
    adjustEnergy(currentCreature.energy);
    animateCreature("none");
}

const animateCreature = async (reaction) => {
    let feedButton = creatureBox.querySelector('#feedBtn'),
        petButton = creatureBox.querySelector('#petBtn'),
        playButton = creatureBox.querySelector('#catchBtn'),
        energyAnimation = (currentCreature.energy > 0) ? "idle" : "rest";
    
    if(reaction != "none" && reaction != null){
        // Disable for a few seconds
        feedButton.setAttribute('disabled', true);
        petButton.setAttribute('disabled', true);
        playButton.setAttribute('disabled', true);

        icon.classList.remove("animate-rest");
        icon.classList.remove("animate-idle");
        icon.classList.add(`animate-${reaction}`);
        // eat
        // eat-energize
        // groom
        // groom-happy
        // play
        // play-happy

        setTimeout(function(){
            feedButton.removeAttribute('disabled');
            petButton.removeAttribute('disabled');
            playButton.removeAttribute('disabled');

            icon.classList.remove(`animate-${reaction}`);
            icon.classList.add(`animate-${energyAnimation}`);
        }, 2 * 1000)
    }
    else{
        // Do nothing
        console.log(`Creature is in ${energyAnimation} state...`)
        icon.classList.remove("animate-rest");
        icon.classList.remove("animate-idle");
        icon.classList.add(`animate-${energyAnimation}`);
    }
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



/** FEEDING ('FEED') BUTTON **/
feedBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let animationType = "none";

    if(currentCreature.hunger + 1 <= hungerMeter.maxValue){
        console.log('Creature says: "Om nom nom..."');
        currentCreature.hunger++;
        renderMeters(hungerMeter,currentCreature.hunger);
        animationType="eat";

        if(currentCreature.energy +1 <= energyMeter.maxValue){
            currentCreature.energy++;
            console.log('Creature looks more energetic!')
            adjustEnergy(currentCreature.energy);
        }
        
        animateCreature(animationType);
        currentCreature.lastinteraction=moment().format('YYYY-MM-DDTHH:mm:ss');
        updateDatabase();
    }
    else{
        console.log('Creature is full');

    }
});


/** GROOMING ('PET') BUTTON **/
petBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let animationType = "none";

    if(currentCreature.grooming + 1 <= groomMeter.maxValue){
        console.log(`Creature lets you wipe it down`);
        currentCreature.grooming++;
        renderMeters(groomMeter,currentCreature.grooming);
        animationType="pet";

        if(currentCreature.happiness + 1 <= happyMeter.maxValue){
            console.log('Creature *purrrrs* happily');
            currentCreature.happiness++;
            renderMeters(happyMeter,currentCreature.happiness);
        }

        animateCreature(animationType);
        currentCreature.lastinteraction=moment().format('YYYY-MM-DDTHH:mm:ss');
        updateDatabase();
    }
    else{
        console.log('Creature is already clean');
    }
});


/** CATCH ('PLAY') BUTTON **/
catchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let animationType = "none";

    if(currentCreature.energy - 1 >= 0){
        console.log('Creature plays with you.')
        currentCreature.energy--;
        adjustEnergy(currentCreature.energy);
        animationType="play";

        if(currentCreature.happiness + 1 <= happyMeter.maxValue){
            console.log('Creature jumps with joy!');
            currentCreature.happiness++;
            renderMeters(happyMeter,currentCreature.happiness);
        }

        // LUCIOWARE TODO: Increase EXP if hearts are full
        // api/creature/exp/{amount}
        // calculate and animate EXP bar
        
        animateCreature(animationType);
        currentCreature.lastinteraction=moment().format('YYYY-MM-DDTHH:mm:ss');
        updateDatabase();
    }
    else{
        console.log('Creature is tired...');
    }
});

/** LUCIOWARE DEBUG **/
function resetTestCreatureDB(){
    currentCreature.happiness = 0;
    currentCreature.hunger = 0;
    currentCreature.grooming = 0;
    currentCreature.energy = 4;
    renderAllMeters();
    updateDatabase();
}
/*****/

init();