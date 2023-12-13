//Hace que aparezca la pantalla de carga
$(window).load(function () {
	//Preloader 
	$('#status').delay(300).fadeOut();
	$('#preloader').delay(300).fadeOut('slow');
	$('body').delay(550).css({ 'overflow': 'visible' });
})

//Crea las particulas en el evento mouse
// JavaScript
document.addEventListener('mousemove', function (event) {
	// Crear múltiples partículas
	for (var i = 0; i < 5; i++) {
		createParticle(event.clientX, event.clientY);
	}
});

function createParticle(x, y) {
	// Crear una nueva partícula
	var particle = document.createElement('div');
	particle.className = 'particle';

	// Establecer la posición de la partícula
	particle.style.left = (x - 2.5) + 'px';
	particle.style.top = (y - 2.5) + 'px';

	// Asignar trayectorias aleatorias
	var angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
	var speed = Math.random() * 4 + 1; // Velocidad aleatoria

	// Calcular las nuevas posiciones
	var deltaX = Math.cos(angle) * speed;
	var deltaY = Math.sin(angle) * speed;

	// Animar la partícula
	var animation = particle.animate([
		{ transform: 'translate(0, 0)' },
		{ transform: `translate(${deltaX}px, ${deltaY}px)` }
	], {
		duration: 2000,
		easing: 'ease-out',
		fill: 'forwards'
	});

	// Agregar la partícula al cuerpo del documento
	document.body.appendChild(particle);

	// Eliminar la partícula después de la duración de la animación
	animation.onfinish = function () {
		document.body.removeChild(particle);
	};
}
$(document).ready(function () {
	//animated logo
	$(".navbar-brand").hover(function () {
		$(this).toggleClass("animated shake");
	});

	//animated scroll_arrow
	$(".img_scroll").hover(function () {
		$(this).toggleClass("animated infinite bounce");
	});

	//Wow Animation DISABLE FOR ANIMATION MOBILE/TABLET
	wow = new WOW(
		{
			mobile: false
		});
	wow.init();

	//MagnificPopup
	$('.image-link').magnificPopup({ type: 'image' });


	// OwlCarousel N1
	$("#owl-demo").owlCarousel({
		autoPlay: 3000,
		items: 3,
		itemsDesktop: [1199, 3],
		itemsDesktopSmall: [979, 3]
	});

	// OwlCarousel N2
	$("#owl-demo-1").owlCarousel({
		navigation: false, // Show next and prev buttons
		slideSpeed: 300,
		paginationSpeed: 400,
		singleItem: true
	});

	//SmothScroll
	$('a[href*=#]').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			&& location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({ scrollTop: targetOffset }, 600);
				return false;
			}
		}
	});

	//Subscribe
	new UIMorphingButton(document.querySelector('.morph-button'));
	// for demo purposes only
	[].slice.call(document.querySelectorAll('form button')).forEach(function (bttn) {
		bttn.addEventListener('click', function (ev) { ev.preventDefault(); });
	});

});