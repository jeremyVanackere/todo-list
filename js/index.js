// Contiendra les tâches tableau d'objet { id, tache, date }
let taches = []; 
//Contiendra l'id de tache
let idTache = 0;
//TACHE 11
//Verification dans le localStorage
const recupTaches = JSON.parse(localStorage.getItem('tachesSauvegarde'))
//Si mon tableau n'est pas vide donc je prends la sauvegarde
if(recupTaches !== null){
    taches = recupTaches;
    idTache = taches.length;
    //Ajout les lignes dans le tableau
    refreshAffichageDuTableau();
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
//TACHE 6
//TACHE 7
function afficherDansTableau(tache){
  //Ajout les lignes grace a la boucle
    $('#tableauTacheBody').append(`
    <tr class='tache'>
    <td>${tache.tache}</td>
    <td>${tache.date}</td>
    <td>edit / delete</td>
  </tr>
    `);
}

//TACHE 5
//TACHE 6
//TACHE 7
function refreshAffichageDuTableau() {
    //vide le tableau HTML
    $('#tableauTacheBody').html('');
    //Ajout les lignes grace a la boucle
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
    /********* Test Tech 04 ************/
    console.log(localStorage.getItem(localStorage.length-1));
    //Sauvegarde dans le localStorage //TACHE 10
    localStorage.setItem('tachesSauvegarde', JSON.stringify(taches));

    /********** Test Tech 10 **************/
    for (var i = 0; i < localStorage.length; i++){
        console.log(localStorage.getItem(localStorage.key(i)));
    }


    //Refresh table
    refreshAffichageDuTableau();
    //Message d'avertissement pour dire que la tache est bien crée
    Swal.fire({
      title: 'Information',
      position: "top-right",
      text: 'Nouvelle tâche ajoutée !',
      icon: 'success',
      confirmButtonText: 'Cool',
      timer: 1500
    })
}