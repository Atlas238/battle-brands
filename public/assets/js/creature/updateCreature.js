/** DEMO VARIABLE **/
const demoActive = true;
const deployed = true;

// Time Variables For Depreciation
const numHoursHappiness = 20;
const numHoursHunger = 30;
const numHoursGrooming = 40;
const numHoursEnergy = 10;


// Global vars
const icon = document.getElementById('icon');
const updateCreatureId = icon.getAttribute('data-id')
const userID = icon.getAttribute('data-user');
const creatureBox = document.getElementById('creatureBox');

const catchBtn = document.getElementById('catchBtn');
const feedBtn = document.getElementById('feedBtn');
const petBtn = document.getElementById('petBtn');

// Host
const host = deployed ? 'https://battle-brands.herokuapp.com' : 'http://localhost:3001';

let notSyncing = true; //Is set to false when the player interacts with their creature, so the autosync will not run

const currentCreature = {
    id: updateCreatureId,
    hunger: 0,
    happiness: 0,
    grooming: 0,
    energy: 0,
    lastinteraction: moment(),
};

let creatureExp = Number(document.getElementById('progress').getAttribute('value'));

/** Check creatures stats on page load, without an additional DB ping **/
const scanStats = () => {
    currentCreature.happiness = Number(document.getElementById('happinessState').getAttribute('value'));
    currentCreature.hunger = Number(document.getElementById('hungerState').getAttribute('value'));
    currentCreature.grooming = Number(document.getElementById('groomingState').getAttribute('value'));
    currentCreature.energy = Number(document.getElementById('energyState').getAttribute('value'));

    /** NEW TIME HANDLER **/
    let unparsedInteraction = document.getElementById('icon').getAttribute('data-action');
    currentCreature.lastinteraction = timeHandler( unparsedInteraction );
}

// Send a basic time, and get it back the way we want...
function timeHandler(timeToConvert){
    let parsedTime = new Date( Date.parse(timeToConvert) );
    let convertedTime = moment( parsedTime.toUTCString() ).format('YYYY-MM-DDTHH:mm:ss');
    console.log(`Time converted to UTC: ${convertedTime}`);
    return( convertedTime );
}


/** **/
const init = async () => {
    try {
        scanStats();
        adjustCreatureStats(currentCreature);
        renderAllMeters(true);
    } catch (err) {
        console.log(err);
    }
};
/** **
const init = async () => {
    try {
        const loadStats = await fetch(`${host}/creature/care/${updateCreatureId}`,{method: 'GET',}).then(resp => resp.json());
        adjustCreatureStats(loadStats);
        currentCreature.id = loadStats.id;
        currentCreature.happiness = loadStats.happiness;
        currentCreature.hunger = loadStats.hunger;
        currentCreature.grooming = loadStats.grooming;
        currentCreature.energy = loadStats.energy;
        currentCreature.lastinteraction = loadStats.lastinteraction;
        renderAllMeters(true);
    } catch (err) {
        console.log(err);
    }
};
/** **/

const adjustCreatureStats = () => {

    const intervalSize = (demoActive) ? 'seconds' : 'minutes';
    const dbTime = moment(currentCreature.lastinteraction);
    const currentTime = moment();

    let diffInTime = currentTime.diff(dbTime,intervalSize);
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
        const valueIncrease = Math.floor(diffInTime/numHoursEnergy);
        if(currentCreature.energy + valueIncrease <= energyMeter.maxValue) {
            currentCreature.energy += valueIncrease;
        } else {
            currentCreature.energy = 4;
        }
    }
};



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

const renderAllMeters = (loadflag) => {
    renderMeters(happyMeter,currentCreature.happiness);
    renderMeters(hungerMeter,currentCreature.hunger);
    renderMeters(groomMeter,currentCreature.grooming);
    adjustEnergy(currentCreature.energy);
    levelChecker(loadflag);
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

const levelChecker = (loadflag) => {
    const levelDisplay = document.getElementById('levelDisplay');
    const expBar = document.getElementById('progress');
    
    let creatureLevel = 1;
    creatureLevel = creatureLevel + ( Math.floor( creatureExp / 10 ) );
    levelDisplay.innerHTML = creatureLevel;

    let displayExpPercent = 0;
    displayExpPercent = ( Math.floor( creatureExp % 10 ) );

    if(displayExpPercent === 0 && creatureExp > 0 && !loadflag){
        expBar.style.width = "100%";
        levelDisplay.classList.add("levelup");

        setTimeout(function(){
            console.log("YOUR CREATURE LEVELED UP!");
            expBar.style.width = `${ 10 * displayExpPercent}%`;
            levelDisplay.classList.remove("levelup");
        }, 2 * 1000);
        // LUCIOWARE TODO: Add in level-up functionality!
    }
    else{
        expBar.style.width = `${ 10 * displayExpPercent}%`;
    }
    

    document.getElementById('progress').setAttribute('value', creatureExp);
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

const updateExperience = async (increaseAmount) => {
    // Increase Experience
    creatureExp += increaseAmount;
    if( currentCreature.id !== 0 || creatureExp != 0 ){
        try{
            const updateSql = await fetch(`${host}/api/creature/exp`, {
                method: 'PUT',
                body:JSON.stringify({
                    creature_id: currentCreature.id,
                    amount: creatureExp,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const respData = await updateSql.json();

            if(respData.message){
                console.log('Creature has gained 1 EXP!');
                levelChecker();
            } else {
                console.log("Error updating creature experience");
            }
        } catch (error){
            console.log(error);
        }
    } else {
        console.log("Something went wrong...");
    }
}



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
        else if(currentCreature.happiness == happyMeter.maxValue){
            updateExperience(1);
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
    if(demoActive){
        currentCreature.happiness = 0;
        currentCreature.hunger = 0;
        currentCreature.grooming = 0;
        currentCreature.energy = 4;
        renderAllMeters();
        updateDatabase();
    }
}
/*********************/

init();