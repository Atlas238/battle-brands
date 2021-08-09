const creatureBox = document.querySelector('#creature-selector');

const makeACreature = (event) => {
    event.preventDefault();
    let card = event.target;
    if(card.id === 'icon'){
        card = card.parentElement;
    }

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
