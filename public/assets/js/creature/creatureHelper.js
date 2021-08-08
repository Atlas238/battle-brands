class ProgressMeter {
    constructor(selector,solidIco,emptyIco,maxValue){
        this.selector = selector;
        this.solid = solidIco;
        this.empty = emptyIco;
        this.maxValue = maxValue;
    }

    getMeter(currVal){
        let i = 0;
        let outList = [];
        if(currVal > this.maxValue){
            currVal = this.maxValue;
        }
        let currIcon = '';
        while(i < this.maxValue){
            if(currVal > 0){
                currIcon = `${this.solid}`;
                currVal--;
            } else {
                currIcon = `${this.empty}`;
            }
            const tempIco = document.createElement('i');
            tempIco.setAttribute("class",currIcon);
            outList.push(tempIco);
            i++;
        }
        return outList;
    }
};

const happyMeter = new ProgressMeter('happy-meter','fa-solid fa-heart','fa-regular fa-heart',4);
const hungerMeter = new ProgressMeter('hunger-meter','fa-solid fa-lemon','fa-regular fa-lemon',4);
const groomMeter = new ProgressMeter('groom-meter','fa-solid fa-hand','fa-regular fa-hand',4);
const energyMeter = new ProgressMeter('energy-meter','fa-solid fa-battery-empty','fa-solid fa-battery-full',4);