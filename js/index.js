
var taches = [] // Contiendra les tâches tableau d'objet { id, tache, date }

function isDisabled(text) {
    var btn = document.getElementById('submit');
    if(text.value != '') {
        btn.disabled = false
    }
}

