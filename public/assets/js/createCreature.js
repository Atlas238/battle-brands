const creatureBox = document.querySelector('#creature-selector');

const makeACreature = (event) => {
    // event.preventDefault();
    const card = event.target;
    // console.log(card);
    if(card.dataset.type && card.dataset.brand){
        console.log(card.dataset.type);
        console.log(card.dataset.brand);
    }
};

if(creatureBox){
    for(let item of creatureBox.children){
        item.addEventListener('click',makeACreature);
    }
}
