// CAP OF 4 for happiness
// clean/care/pet DO increment grooming/ + happiness
// API /API/STATS/:ID
const petCreature = async (object) => {

    const userCreatureData = await fetch(`/api/stats/${object.user_id}`);
    
    
}