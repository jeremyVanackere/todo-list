var taches = [] // Contiendra les tâches tableau d'objet { id, tache, date }
var idTache = 0;

function isDisabled(text) {
    const btn = document.getElementById('submit');
    if (text.value != "") {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
}

//TACHE 3
datePickerId.min = new Date().toISOString().split("T")[0];

//TACHE 4
function addTaches(){
    //Incrementation du compteur des taches
    idTache++;
    //Creation de l'element
    const newElement = {
        id: idTache,
        tache: document.getElementById('text').value.toString(),
        date: document.getElementById("datePickerId").value.toString()
    }
    //Ajout dans le tableau
    taches.push(newElement);
}