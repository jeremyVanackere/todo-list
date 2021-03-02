function isDisabled(text) {
    var btn = document.getElementById('submit');
    if(text.value != '') {
        btn.disabled = false
    }
}