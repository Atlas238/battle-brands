const creatureCards = document.querySelectorAll("#card");

function checkLevels(){

    for(i=0; i < creatureCards.length ; i++){
        let creatureLevel = 1;
        let thisCard = creatureCards[i];

        let experienceBlock = thisCard.querySelector("[data-type='level']");

        let experience = experienceBlock.getAttribute("data-experience");

        creatureLevel = creatureLevel + ( Math.floor( experience / 10 ) );

        experienceBlock.querySelector('span').innerHTML = creatureLevel;

    }
}

checkLevels();