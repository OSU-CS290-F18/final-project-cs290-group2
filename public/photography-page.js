/*
* Written By: Rose Garcia
* Photo page js for handling photo modal
*/

var photoElements = document.getElementsByClassName('photo-container');
var photoModal = document.getElementById('photo-modal');
var closeModalButton = document.getElementById('close-photo-button');

for(var x = 0; x < photoElements.length; x++){
    photoElements[x].addEventListener('click', openPhotoModal);
}

closeModalButton.addEventListener('click', closePhotoModal);

function openPhotoModal(){
    var childNodes = this.children;
    console.log(this.className);
    photoModal.style.display = "block";
    document.getElementById('modal-photo-link').src =
        childNodes[0].src;
    document.getElementById('modal-photo-cap').innerText =
        childNodes[1].innerText;
}

function closePhotoModal(){
    photoModal.style.display = "none";
}
