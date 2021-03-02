// Contiendra les tâches tableau d'objet { id, tache, date }
let taches = []; 
//Contiendra l'id de tache
let idTache = 0;
//TACHE 11
//Verification dans le localStorage
const recupTaches = JSON.parse(localStorage.getItem('tachesSauvegarde'))
//Si mon tableau est vide donc pas de sauvegarde donc je mets le tableau a vide
if(recupTaches !== null){
    taches = recupTaches;
    idTache = taches.length;
}

function isDisabled(text) {
    const btn = document.getElementById('submit');
    if (text.value != "") {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
}

//TACHE 5
function afficherDansTableau(tache){
    $('#tableauTacheBody').append(`
    <tr>
    <td>${tache.tache}</td>
    <td>${tache.date}</td>
    <td>edit / delete</td>
  </tr>
    `);
}

function refreshAffichageDuTableau() {
    $('#tableauTacheBody').html('');
    taches.forEach(tache => {
        $('#tableauTacheBody').append(`
        <tr>
        <td>${tache.tache}</td>
        <td>${tache.date}</td>
        <td>edit / delete</td>
      </tr>
        `); 
    });
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
    //Sauvegarde dans le localStorage //TACHE 10
    localStorage.setItem('tachesSauvegarde', JSON.stringify(taches));
    //Refresh table
    refreshAffichageDuTableau();
}