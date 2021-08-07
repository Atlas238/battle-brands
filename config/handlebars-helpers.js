module.exports = {
    threshold: function(careStatToCheck) {
        if(careStatToCheck > 2) {
            return true
        }
    }
}