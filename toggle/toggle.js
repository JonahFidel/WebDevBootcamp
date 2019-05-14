var toggle = document.getElementById('colorChange');
var body = document.getElementsByTagName('body');

toggle.addEventListener('click', function(){
	body[0].classList.toggle('bg-purple');
});