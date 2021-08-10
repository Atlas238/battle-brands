module.exports = {
    threshold: function(careStatToCheck) {
        if(careStatToCheck > 2) {
            return true
        }
    },
    energyFull: function(energy){
        if(energy == 4) {
            return true
        }
    },
    energyHalf: function(energy){
        if(energy == 2) {
            return true
        }
    },
    energyEmpty: function(energy){
        if(energy == 0) {
            return true
        }
    },
    ifFirst: function(v1, v2){
        if(v1 == true && v2 == true){
            return true
        }
    },
    ifSecond: function(v1, v2){
        if(v1 == false && v2 == true){
            return true
        }
    }
}