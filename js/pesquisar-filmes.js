$('#filmes').addClass('hidden');
$('#resp').attr('style', 'display:none');
let headerH = $('#navigation, #navigation-sticky').outerHeight();
$("#back-top").click(function () {
	$("#texto-pesquisar").val("");
	$('#filmes').addClass('hidden');
	$('html, body').stop().animate({
					scrollTop: $('#home').offset().top - headerH + "px"
				}, 1200, 'easeInOutExpo');
});

$("#addFavorito").click(function () {
	let link = $('#link').attr('src');
	let titulo = $('#titulo').html();
	let descricao = $('#descricao').html();
	let ator = $('#ator').html();


	let
	meuFilme = new Object();
	meuFilme.link = link;
	meuFilme.titulo = titulo;
	meuFilme.ator = ator;
	meuFilme.descricao = descricao;
	localStorage.setItem("favoritos", meuFilme);
	 console.log(localStorage.getItem( 'favoritos' ));

});

$("#pesquisar").click(function () {
	let texto = $("#texto-pesquisar").val();
	let apikey = '9b36b03a';

	if (texto == '') {
		$('#resp').attr('style', 'display:block');
		$('#resp').html("<span style='color:white'>Por favor, insira um filme!</span>");
		$('#resp').fadeOut(10000);

		return false;
	}

	$.ajax({
		url: 'http://omdbapi.com/?',
		type: 'GET',
		data: { apikey: apikey, t: texto },
		success: function (res) {
			if (res.Response == 'False') {
				$('#resp').attr('style', 'display:block');
				$('#resp').html("<span style='color:white'>Filme não encontrado!</span>");
				$('#resp').fadeOut(10000);
				return false;
			} else {

				if (res.Poster == 'N/A') {
					$('#link').attr('src', 'images/logo-dark.png');
				} else {
					$('#link').attr('src', res.Poster);
				}
				$('#titulo').html(res.Title);
				$('#descricao').html(res.Plot);

				$('#ator').html(res.Actors);
				$('#filmes').removeClass('hidden');
				$('html, body').stop().animate({
					scrollTop: $('#filmes').offset().top - headerH + "px"
				}, 1200, 'easeInOutExpo');
			}
		}
	});
});

