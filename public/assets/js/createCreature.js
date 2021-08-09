const creatureBox = document.querySelector('#creature-selector');
const liveToaster = document.getElementById('liveToast')

const makeACreature = async (event) => {
    event.preventDefault();
    let card = event.target;
    if(card.id === 'icon'){
        card = card.parentElement;
    }

    if(card.dataset.type && card.dataset.brand){
        const toast = new bootstrap.Toast(liveToaster);
                toast.show();
        try{
            const updateSql = await fetch(`https://battle-brands.herokuapp.com/creature/create`, {
                method: 'POST',
                body: JSON.stringify({
                    brand_id: card.dataset.brand,
                    type_id: card.dataset.type,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const respData = await updateSql.json();
            if(respData.message){
                const toast = new bootstrap.Toast(liveToaster);
                toast.show();
            }
        } catch (error){
            console.log(error);
        }
    }
};

if(creatureBox){
    for(let item of creatureBox.children){
        item.addEventListener('click',makeACreature);
    }
}
