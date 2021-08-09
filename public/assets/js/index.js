const creatureCards = document.querySelectorAll("#card");
const logoutBtn = document.querySelector("#logout");

if(logoutBtn){
    logoutBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            const fetchResp = await fetch("/user/logout",{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
            });
            const jsonData = await fetchResp.json();
            if(jsonData.message){
                location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    })
}
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