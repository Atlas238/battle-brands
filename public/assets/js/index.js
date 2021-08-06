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

// Event Listener for when CreaturePage is in view (Feel free to reuse the event listener by creating a dom node and feeding that to the visHandler function)
// const greeting = document.getElementById('greeting');

// const isElementInView = (element) => {
//     let rect = element.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
//     );
// };

// const onVisibilityChange = (element, callback) => {
//     let oldVisible;
//     return function() {
//         let newVisible = isElementInView(element);
//         if (newVisible != oldVisible) {
//             oldVisible = newVisible;
//             if (typeof callback == 'function') {
//                 callback();
//             }
//         }
//     }
// }
 
// const visHanlder = onVisibilityChange(element, function() {
//     updateCreatureStats();
// });
// visHanlder(greeting);