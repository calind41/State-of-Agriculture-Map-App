let modal = document.getElementById('modal-wrapper');
window.onclick = function(evt) {
  if(evt.target == modal) {
    modal.style.display="none";
  }
}

let openPopup = document.querySelector('#open-popup');
openPopup.onclick = () => {
  document.querySelector('#modal-wrapper').style.display = 'block';
}
document.querySelector('.close').onclick = () => {
  document.getElementById('modal-wrapper').style.display='none';
}