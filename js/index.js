// Contiendra les tâches tableau d'objet { id, tache, date }
let taches = []; 
//Contiendra l'id de tache
let idTache = 0;
//Initialisation des champs text & date a zero
function initialisationChamps(){
  document.getElementById('text').value = "";
  document.getElementById('datePickerId').value = "";
}
//Appel de la fonction pour les champs a zero
initialisationChamps();
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
//cette fonction va permettre de verrouiller ou deverrouiller le button "envoyer" pour eviter
//d envoyer des taches vides
function isDisabled(text) {
    const btn = document.getElementById('submit');
    if (text.value.toString() !== "") {
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
    <td><button class='editButton' id='${tache.id}'>edit</button> / <button class='deleteButton' id='${tache.id}'>delete</button></td>
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
        <td><button class='editButton' id='${tache.id}'>edit</button> / <button class='deleteButton' id='${tache.id}'>delete</button></td>
      </tr>
        `); 
    });
}


//TACHE 3
datePickerId.min = new Date().toISOString().split("T")[0];

//TACHE 4
function addTaches(){
    //Verification date
    if(document.getElementById('datePickerId').value.toString() === ""){
      //Affiche message erreur si pas de date spécifié
      Swal.fire({
        title: 'Information',
        position: "center",
        text: 'Merci de spécifier une date',
        icon: 'info',
        confirmButtonText: 'Pas de soucis',
        timer: 2000
      })
    }else{
      //Incrementation du compteur des taches
      idTache++;
      //Creation de l'element
      const newElement = {
          id: Number(idTache),
          tache: document.getElementById('text').value.toString(),
          date: document.getElementById("datePickerId").value.toString()
      }
      //Ajout dans le tableau
      taches.push(newElement);
      //Sauvegarde dans le localStorage //TACHE 10
      localStorage.setItem('tachesSauvegarde', JSON.stringify(taches));
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
      });
      //Remise a zero des champs
      initialisationChamps();
    }
}