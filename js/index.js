// Contiendra les tâches tableau d'objet { id, tache, date }
let taches = [];
//Initialisation des champs text & date a zero
function initialisationChamps(){
  document.getElementById('text').value = "";
  document.getElementById('datePickerId').value = new Date().toISOString().split("T")[0];
  document.getElementById('submit').disabled = true;
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
function refreshAffichageDuTableau() {
    // Trie le tableau
    taches = taches.sort((a,b) => a.date - b.date)
    //Sauvegarde dans le localStorage //TACHE 10
    localStorage.setItem('tachesSauvegarde', JSON.stringify(taches));
    //  vide le tableau HTML
    $('#tableauTacheBody').html('');
    //  Ajout les lignes grace a la boucle
    taches.forEach(tache => {
        $('#tableauTacheBody').append(`
        <tr id='${tache.id}'>
        <td class="tdTache" value="${tache.tache}">${tache.tache}</td>
        <td class="tdDate" value="${tache.date}">${tache.date}</td>
        <td class="tdAction">
            <div class="actionBasic">
                <button @onClick="modifierTache" class='editButton' data-id='${tache.id}'>edit</button> / 
                <button class='deleteButton' data-id='${tache.id}'>delete</button>
            </div>
        </td>
      </tr>
        `); 
    });

    // init les actions
    initActionBtn();
}



//TACHE 3
datePickerId.min = new Date().toISOString().split("T")[0];

//TACHE 4
function addTaches(){
    //Verification date
    if(document.getElementById('datePickerId').value.toString() === "" || document.getElementById('text').value.toString() === ""){
      //Par defaut je vais afficher que la date est vide
      let erreurPhrase = "Merci de spécifier la date.";
      //sinon je vais afficher que le champs text est vide
      if(document.getElementById('text').value.toString() === ""){
        erreurPhrase = "Merci de spécifier le nom de la tâche";
      }
      //Affiche message erreur si pas de date spécifié
      Swal.fire({
        title: 'Information',
        position: "center",
        text: erreurPhrase.toString(),
        icon: 'info',
        confirmButtonText: 'Pas de soucis',
        timer: 2000
      })
    }else{
      //Creation de l'element
      const newElement = {
          id: Number(taches.length + 1),
          tache: document.getElementById('text').value.toString(),
          date: moment(document.getElementById("datePickerId").value).format('DD/MM/YYYY').toString()
      }
      //Ajout dans le tableau
      taches.push(newElement);
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

function initActionBtn () {
    /**
     * Modifier
     */
    $('.editButton').unbind('click').bind('click', function () {
        const id = $(this).data('id') // réupère l'id
        const elemTache = $('#'+id).find('.tdTache'); // récupère l'element du td
        const elemDate = $('#'+id).find('.tdDate'); // récupère l'element du td
        const elemAction = $('#'+id).find('.tdAction'); // récupère l'element du td
        const idInputTache = 'idInputTache' + id
        const htmlTache = `<input
        type="text"
        id="${idInputTache}"
        id="text"
        value="${ elemTache.attr('value') }"
        />`
        const idDatePicker = 'datePicker' + id
        const htmlDate = `<input value="${moment(elemDate.attr('value')).format('YYYY-MM-DD').toString()}" type="date" id="${idDatePicker}" onkeydown="return false">`
        elemTache.html(htmlTache)
        elemDate.html(htmlDate)
        $('.actionBasic').hide()

        const idValider = 'modifEnCoursValider'
        const idAnnuler = 'modifEnCoursAnnuler'
        elemAction.append(`<button id="${idValider}" data-id="{tache.id">Valider</button> /
            <button id="${idAnnuler}" data-id="{tache.id">Annuler</button>`)

        $('#' + idValider).unbind('click').bind('click', function () {
            taches.forEach(tache => {
                if (tache.id === id) {
                    tache.tache = $('#' + idInputTache).val()
                    tache.date = moment($('#' + idDatePicker).val()).format('DD/MM/YYYY').toString()
                    refreshAffichageDuTableau();
                }
            })
        })

        $('#' + idAnnuler).unbind('click').bind('click', function () {
            refreshAffichageDuTableau();
        })
    })

    /**
     * Delete
     */
    $('.deleteButton').unbind('click').bind('click', function () {
        Swal.fire({
            title: 'Etes-vous sur?',
            text: "Si vous validez cette donnée sera perdu",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const id = $(this).data('id') // réupère l'id
                taches = taches.filter(tache => id != tache.id)
                taches.forEach((tache, index) => {
                    tache.id = index;
                })
                refreshAffichageDuTableau();

                Swal.fire(
                    'Supprimé!',
                    'success'
                )
            }
        })
    })
}
