/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (skel.vars.browser == 'ie'		// IE
				||	skel.vars.browser == 'edge'		// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	skel.vars.mobile)				// Mobile devices
					off();

			// Enable everywhere else.
				else {

					skel.on('!large -large', on);
					skel.on('+large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	$(function() {
		$( ".lingua" ).change(function() {
			var language = $(this).find('option:selected').text();
		  if(language == "EN"){
			window.location.href = '../site-en/index-en.html';
		  }else if(language == "PT"){
			window.location.href = '../site-pt/index-pt.html';
		  }
		  else if(language == "SA"){
			  window.location.href = '../site-sa/index-sa.html';
		  }
		});
		
		
		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper'),
			$header = $('#header'),
			$nav = $('#nav'),
			$main = $('#main'),
			$navPanelToggle, $navPanel, $navPanelInner;

		// Disable animations/transitions until the page has loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly();

		// Background.
			$wrapper._parallax(0.925);

		// Nav Panel.

			// Toggle.
				$navPanelToggle = $(
					'<a href="#navPanel" id="navPanelToggle">Menu</a>'
				)
					.appendTo($wrapper);

				// Change toggle styling once we've scrolled past the header.
					$header.scrollex({
						bottom: '5vh',
						enter: function() {
							$navPanelToggle.removeClass('alt');
						},
						leave: function() {
							$navPanelToggle.addClass('alt');
						}
					});

			// Panel.
				$navPanel = $(
					'<div id="navPanel">' +
						'<nav>' +
						'</nav>' +
						'<a href="#navPanel" class="close"></a>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'right',
						target: $body,
						visibleClass: 'is-navPanel-visible'
					});

				// Get inner.
					$navPanelInner = $navPanel.children('nav');

				// Move nav content on breakpoint change.
					var $navContent = $nav.children();

					skel.on('!medium -medium', function() {

						// NavPanel -> Nav.
							$navContent.appendTo($nav);

						// Flip icon classes.
							$nav.find('.icons, .icon')
								.removeClass('alt');

					});

					skel.on('+medium', function() {

						// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

						// Flip icon classes.
							$navPanelInner.find('.icons, .icon')
								.addClass('alt');

					});

				// Hack: Disable transitions on WP.
					if (skel.vars.os == 'wp'
					&&	skel.vars.osVersion < 10)
						$navPanel
							.css('transition', 'none');

		// Intro.
			var $intro = $('#intro');

			if ($intro.length > 0) {

				// Hack: Fix flex min-height on IE.
					if (skel.vars.browser == 'ie') {
						$window.on('resize.ie-intro-fix', function() {

							var h = $intro.height();

							if (h > $window.height())
								$intro.css('height', 'auto');
							else
								$intro.css('height', h);

						}).trigger('resize.ie-intro-fix');
					}

				// Hide intro on scroll (> small).
					skel.on('!small -small', function() {

						$main.unscrollex();

						$main.scrollex({
							mode: 'bottom',
							top: '25vh',
							bottom: '-50vh',
							enter: function() {
								$intro.addClass('hidden');
							},
							leave: function() {
								$intro.removeClass('hidden');
							}
						});

					});

				// Hide intro on scroll (<= small).
					skel.on('+small', function() {

						$main.unscrollex();

						$main.scrollex({
							mode: 'middle',
							top: '15vh',
							bottom: '-15vh',
							enter: function() {
								$intro.addClass('hidden');
							},
							leave: function() {
								$intro.removeClass('hidden');
							}
						});

				});

			}/*SlideShow*/
			$(document).ready(function(){ 
				$('.slideshow-imagens').slick({ 
					autoplay:true
				});
				
			  $(".owl-carousel").owlCarousel({
				  items:4,
				  autoplay: true,
				  autoplayTimeout:1499,
				  loop: true,
				  responsive:{
					  0 : { //Telemovel
					  items: 3
					  },
					  768 : { //Tablet
						  items: 3
					  },
					  960 : { //Phablet
						  items: 2
					  },
					  1200 : { //Desktop
						  items: 4
					  },
					  1920 : { //Large Desktop
						  items: 4
					  }
				  }
			  });
				/* troca -> */ var inicio = $('#inicio').waypoint({ /* <- troca */
				  handler: function(direction) {
					$(".menu-item").removeClass('active');
					$(".menu-item").addClass('normal');
					$("#inicio-item").removeClass('normal'); // troca
					$("#inicio-item").addClass('active'); // troca
				  }
				});
			  
				/* troca -> */ var quemsomos = $('#quemsomos').waypoint({ /* <- troca */
				  handler: function(direction) {
					$(".menu-item").removeClass('active');
					$(".menu-item").addClass('normal');
					$("#quemsomos-item").removeClass('normal'); // troca
					$("#quemsomos-item").addClass('active'); // troca
				  }
				});
				
				/* troca -> */ var associacoes = $('#associacoes').waypoint({ /* <- troca */
				  handler: function(direction) {
					$(".menu-item").removeClass('active');
					$(".menu-item").addClass('normal');
					$("#associacoes-item").addClass('active');
					$("#associacoes-item").removeClass('normal');
				  }
				});
				/* troca -> */ var contactos = $('#contactos').waypoint({ /* <- troca */
				  handler: function(direction) {
					$(".menu-item").removeClass('active');
					$(".menu-item").addClass('normal');
					$("#contactos-item").removeClass('normal'); // troca
					$("#contactos-item").addClass('active'); // troca
				  }
				});
				/* troca -> */ var mapa = $('#mapa').waypoint({ /* <- troca */
				  handler: function(direction) {
					$(".menu-item").removeClass('active');
					$(".menu-item").addClass('normal');
					$("#mapa-item").removeClass('normal'); // troca
					$("#mapa-item").addClass('active'); // troca
				  }
				});

				
				//AQUI PATRICIA
				$("#residencia").on("click",function(){
					$("#lol-title").html("Resid??ncia");
					$("#lol-sub-title").html("Acesso ?? Habita????o Municipal em Lisboa");
					$("#lol-content").html("<p> Existe em lisboa um conjunto de casas municipais para pessoas interessadas em viver na cidade, sendo a aplica????o feita ao abrigo de um regulamento (RRAHM). Podem aplicar as moradias municipais aos cidad??os nacionais e estrangeiros, com autoriza????o de resid??ncia para o territ??rio portugu??s, que n??o tenham um lar adequado para satisfazer as necessidades fam??liares e que atendam aos requisitos de acesso estabelecidos. O pedido pode ser feito 'on-line' preenchendo um formul??rio eletr??nico, ou pessoalmente num dos balc??es de atendimento, apresentando os documentos necess??rios. <br><br> <h2 class='cbp'>Departamento dos Direitos Sociais</h2> <p><b class='ponto'>&bull; Fundo de Emerg??ncia Social de Lisboa - Sec????o do Agregado Familiar</b> <br> A promo????o de pol??ticas p??blicas municipais que promovem o efetivo acesso aos direitos sociais, ao atendimento das necessidades das pessoas que vivem em condi????es dif??ceis, que reservam ciclo de pobreza e desigualdade e permitam encontrar uma solu????o para vulnerabilidades e situa????es de emerg??ncia social, C??mara Municipal de Lisboa, que definem especialmente a manuten????o e desenvolvimento do Fundo de Emerg??ncia Social, nomeadamente na ??rea do apoio familiar atrav??s de Par??quias.</p> <p>O Fundo de Emerg??ncia Social de Lisboa (FES) ?? um apoio de natureza excepcional e tempor??ria que deve ser atribu??do a agregados carenciados de fam??lias s??rias em situa????es de emerg??ncia habitacional grave e que residam no Munic??pio de Lisboa.</p> <p>Os residentes t??m o direito de solicitar um apoio excepcional se estiverem em situa????o de emerg??ncia grave e reunirem as seguintes circunst??ncias cumulativas:<br> <b class='ponto'>&bull;</b> Se estiverem a precisar de casa, se tivessem perdido sua casa anterior como resultado de um deslizamento de terra, cat??strofe, execu????o de hipoteca como resultado de uma decis??o judicial, abuso dom??stico e fim de resid??ncia em estabelecimentos coletivos de ocorrer uma alta e confirmado risco de perda iminente de moradia, por falha de pagamento de aluguel de casa como resultado de desemprego e a falta do benef??cio respetivo, ou uma redu????o repentina de renda de benef??cios sociais;<br> <b class='ponto'>&bull;</b> N??o tem, nem nenhum membro da fam??lia, um lar alternativo no Munic??pio de Lisboa e nos munic??pios vizinhos;<br> <b class='ponto'>&bull;</b> N??o est??o a ocupar abusivamente uma casa municipal ou, como resultado de tal abuso, t??m sido alvo de despejo coercivo pela Pol??cia Municipal;<br> <b class='ponto'>&bull;</b> Ter uma renda mensal per capita igual ou inferior a 300 euros;<br> <b class='ponto'>&bull;</b> N??o beneficiar, por qualquer membro do agregado familiar, outros apoios ?? habita????o ou benef??cios sociais permanentes ou extraordin??rios concedidos com o mesmo fim e com a mesma justifica????o, pelas entidades p??blicas ou municipais de Lisboa.</p> <p>O pedido de apoio ao abrigo da FES - Fam??lias Familiares deve ser feito atrav??s do formul??rio adequado, dispon??vel na Par??quia da resid??ncia.</p> <p>Para mais explica????es e esclarecimentos sobre este apoio, pode verificar as <b>Perguntas mais Frequentes dispon??vel em htt://www.cm-lisboa.pt/perguntas-frequentes/intervencao-social/apoio-do-fundo-de-emergencia-social-agregados-familiares</b> ou para verificar as Regras de Trabalho para o Fundo de Emerg??ncia Social - Fam??lias Familiares, que foram publicadas pela Ordem n. 93/P/2014, publicado no 2?? suplemento do Boletim Municipal n.1065, de 17 de julho de 2014.</p> </div> <div> </div> </div> </li> </ul>");
				
				});
				$("#social").on("click",function(){ /* <- troca */
					$("#lol-title").html("Apoio Social"); // titulo da seccao
					$("#lol-sub-title").html("Imigrantes e Discrimina????o"); // sub titulo
					$("#lol-content").html("<p> A Unidade Suporte ??s V??timas Migrantes (UAVM) foi criada pela Associa????o Portuguesa para o Apoio ??s v??timas (APAV), sendo uma unidade especializada para o apoio de imigrantes residentes em Portugal que foram v??timas de crime ou discrimina????o racial.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Centros de Apoio ?? Integra????o de Imigrantes (CLAII)</h2> <p id='lol-content'>O local de Centros de Apoio ?? Integra????o de Imigrantes - CLAII - nasceu em parceria estabelecida entre o Auto Comissariado para os Migrantes - ACM, I.Pe munic??pios ou outras entidades da sociedade civil (associa????es de imigrantes ou outros, IPSS, NGO, centros paroquiais, entre outros) que, em coopera????o, promovam um servi??o integrado. CLAII s??o escrit??rios de rece????o, informa????o e apoio descentraizado, com liga????o ao Centro Nacional de Apoio ao Imigrante - CNAI, que pretende ajudar a responder ??s necessidades dos cidad??os imigrantes nas ??res de: <br><b class='ponto>&bull;</b> Regulariza????o da situa????o migrat??rias: Nacionalidade; Reagrupamento Familiar; Habita????o; Trabalho; Seguran??a Social; Repatriamento Volunt??rio; Cuidados de sa??de;Educa????o; Treino Profissional; Empreendedorismo; Associa??es de Suporte, entre outros.</p> <br><b class='ponto'>&bull; </b> Regulariza????o da situa????o migrat??rias: Nacionalidade; Reagrupamento Familiar; Habita????o; Trabalho; Seguran??a Social; Repatriamento Volunt??rio; Cuidados de sa??de;Educa????o; Treino Profissional; Empreendedorismo; Associa??es de Suporte, entre outros.</p>  <br><br> <h2 class='cbp' id='lol-sub-title'> Ag??ncias P??blicas para o Suporte aos Imigrantes </h2> <p> O Centro Nacional de Apoio ao Imigrante (CNAI) ?? uma estrutura dependente do Alto Comissariado para os Migrantes - ACM, IP e, em Lisboa, funciona no mesmo edif??cio. Destinado ao cidad??o imigrante, este centro concentra, no mesmo espa??o, diferentes servi??os espec??ficos, orientados para o tema da imigra????o. <br><br> No CNAI encontram-se Institui????es P??blicas e Gabinetes de Apoio Especializado, cujos atendimentos s??o realizados por mediadores e mediadores socioculturais, sendo alguns deles tamb??m imigrantes, permitindo aos imigrantes a possibilidade de expressar e obter informa????es na sua l??ngua materna.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Balc??es Municipais ??nicos</h2> <p>Os Balc??es Municipais ??nicos s??o servi??os multicanais integrados - sejam eles presenciais, telef??nicos e virtuais - concebido para responder ??s necessidades dos cidad??os que trabalham, vivem e visitam Lisboa, permitindo-lhes abordar os servi??os municipais atrav??s do canal que mais lhes conv??m ?? sua pr??pria disponibilidade.</p> <p>Incluem-se numa estrat??gia de aproxima????o do Munic??pio para com os cidad??os, disponibilizando servi??os de apoio e atendimento integrado ao cliente, nomeadamente:<br> <b class='ponto'>&bull;</b> Emiss??o do certificado de registo do cidad??o da UE.</p>   </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#educacao").on("click",function(){ /* <- troca */
					$("#lol-title").html("Educa????o"); // titulo da seccao
					$("#lol-sub-title").html("Sistema Educacional"); // sub titulo
					$("#lol-content").html("<p><b class='ponto'>&bull;</b> O sistema educacional desenvolve-se em tr??s n??veis: prim??rio, secund??rio e ensino superior. O n??vel prim??rio e secund??rio s??o universais, obrigat??rios e gratuitos.</p> <p><b class='ponto'>&bull;</b> A educa????o Pr??-Escolar, que vem antes da Escola Prim??ria, destina-se a crian??as com idades compreendidas entre os tr??s e os seis anos de idade, a idade de entrada ao ensino obrigat??rio.</p> <p><b class='ponto'>&bull;</b> O n??vel prim??rio inclui tr??s ciclos sequenciais, o primeiro com quatro anos (1?? ao 4?? ano), o segundo com dois anos (5?? ao 6?? ano) e o terceiro com tr??s anos (7?? at?? 9?? ano).</p> <p><b class='ponto'>&bull;</b> N??vel secund??rio ?? um ciclo de tr??s anos (10?? ao 12?? ano).</p> <p><b class='ponto'>&bull;</b> O ensino superior portugu??s inclui universidades e polit??cnicos. O ensino universit??rio ?? ministrado por universidades p??blicas e privadas, enquanto o ensino polit??cnico ?? ministrado por institui????es p??blicas e privadas n??o universit??rias. As instru????es privadas precisam de um reconhecimento pr??vio pelo Minist??rio da Educa????o e Ci??ncia. A rede de ensino superior tamb??m incorpora na institui????o da educa????o de concordata.</p> <p><b class='ponto'>&bull;</b> Universidades e Polit??cnicos concedem um diploma universit??rio.<br> O ciclo de estudos conducente ?? licenciatura no Polit??cnico tem a dura????o regular de seis semestres correspondentes a 180 cr??ditos ou, excepcionalmente, em situa????es abrangidas pelo direito nacional ou da Uni??o Europeia, dura????o normal at?? sete ou oito semestres de trabalho curricular e forma????o at?? 240 cr??ditos. <br> Universidades e Polit??cnicos podem conceder o grau de Mestrado. <br> O ciclo de estudos que leva ao grau de mestrado tem 90 a 120 cr??ditos e uma dura????o normal de tr??s a quatro semestres ou, excepcionalmente, como resultado de uma pr??tica internacional est??vel e consolidada, 60 cr??ditos e dura????o de dois semestres. No Polit??cnico, o ciclo de estudos que leva ao grau de Mestrado concede, principalmente, a aquisi????o de uma especializa????o profissional. Na Universidade, o ciclo de estudos que leva ao grau Mestrado deve garantir, principalmente, a aquisi????o de uma especializa????o acad??mica que recorra ?? pesquisa ou que aprofunde habilidades profissionais j?? existentes. Com o ensino universit??rio, o grau de Mestrado tamb??m pode ser concedido ap??s um ciclo integrado de estudos, com 300 ou 360 cr??ditos e uma dura????o normal de 10 a 12 semestres o trabalho curricular nos casos em que o tempo para o acesso ao exerc??cio de uma determinada actividade profissional, definida por norma jur??dica da Uni??o Europeia, resulta de uma pr??tica est??vel e consolidada com a Uni??o Europeia. Neste ciclo de estudos ?? concedido o grau acad??mico a quem j?? obteve 180 cr??ditos correspondentes aos seis primeiros semestres.</p> <p>Durante o segundo ciclo de estudos nas Universidades e Polit??cnicos o grau de Mestrado ?? concedida por aprova????o em todas as unidades curriculares que fazem parte do plano de Mestrado e ap??s aprova????o em ato p??blico de defesa da tese, do projeto desenvolvido ou do relat??rio de est??gio, obtendo o n??mero pr??-definido de cr??ditos. O grau de doutoramento ?? garantido por Universidades e Institutos Universit??rios aos quais foram aprovados durante as unidades curriculares do curso de doutorado quando existe, e durante o ato p??blico de defesa de uma tese. <br> Para se candidatar a um primeiro ciclo de estudos conducentes ?? licenciatura regular ou ao ciclo de estudos para o grau de mestre, pelo regime regular, os estudantes nacionais e estrangeiros devem preencher as seguintes condi????es: </b> <br><b class=ponto'>&bull;</b> Ser aprovado no n??vel secund??rio de estudos ou ter uma certificado de equival??ncia nacional ou estrangeira; <br><b class='ponto'>&bull;</b> Realizar os exames de admiss??o exigidos para a ??rea de estudos a que os alunos se candidatem com uma classifica????o igual ou superior ao m??nimo definido (existem institui????es de ensino superior que aceitam exames por estudantes estrangeiros); <br><b class='ponto'>&bull;</b> Satisfazer os pr??-requisitos exigidos (se aplic??vel) para a ??rea de estudos que o aluno est?? a aplicar.</p> <p><b>Condi????es especiais de acesso: </b><br> Para al??m das condi????es gerais de acesso, existem condi????es especiais para acesso aos estudos superiores para atletas de elite, cidad??os portugueses em miss??o oficial no estrangeiro, funcion??rios nacionais e estrangeiros em miss??o diplom??tica, Oficiais das For??as Armadas e Benefici??rios no quadro de coopera????o assinada pelo Estado Portugu??s.</p> <p><b>Concursos Especiais: </b><br> Al??m dos regimes gerais e especiais de acesso ?? institui????o de ensino superior, para pessoas que re??nem condi????es espec??ficas de habilita????o permitindo a admiss??o no ensino superior de novo p??blico num n??vel l??gico de Educa????o do novo p??blico de uma l??gica de aprendizagem ao longo da vida: <br><b class='ponto'>&bull;</b> Maiores de 23 anos que foram aprovados nos exames destinados a avaliar a capacidade de frequ??ncia do ensino superior; <br><b class='ponto'>&bull;</b> Intitulado com curso de especializa????o tecnol??gica (p??s-ensino m??dio n??o superior)<br> A admiss??o em cada Institui????o de Ensino Superior est?? sujeita a numerosas cla??sulas</p> <p><b>Admiss??o ao segundo ciclo de estudos </b><br> Pode candidatar-se ?? admiss??o no segundo n??vel de estudos conducente ao grau de Mestrado: <br><b class='ponto'>&bull;</b> Diploma de Licenciatura ou similar; <br><b class='ponto'>&bull;</b> Estrangeiros com diploma de licenciatura, reconhecido como preenchendo os requisitos do grau de Licenciatura aceite pela institui????o de Ensino Superior onde pretendem ser admitidos; <br><b class='ponto'>&bull;</b> Aqueles que possuem curr??culo escolar, cient??fico ou profissional, atestando capacidade para a realiza????o deste ciclo de estudos pela institui????o de ensino superior onde pretendem ser admitidos.</p> <p><b>Admiss??o ao terceiro ciclo de estudo </b><br> Pode aplicar-se ao terceiro ciclo de estudos conducente ao grau de doutoramento: <br><b class='ponto'>&bull;</b> Diploma de Licenciatura ou similar; <br><b class='ponto'>&bull;</b> Licenciamento com curr??culo escolar ou profissional relevante, reconhecido como atestando capacidade de realiza????o deste ciclo de estudos pelo departamento competente da Institui????o de Ensino Superior onde pretendem ser admitidos.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Dire????o Geral da Educa????o</h2> <p><b class='ponto'>&bull; Reconhecimento de Qualifica????o, Estudos e Certificados de Sistemas de Educa????o Estrangeira</b> <br> ?? um departamento que pertence ?? Administra????o Direta do Governo Central concedida com autonomia administrativa, que fornece informa????es sobre onde e como se pode obter informa????es sobre o reconhecimento de qualifica????o, estudos e certificados de sistemas educativos estrangeiros em rela????o ?? escola prim??ria e secund??ria em compara????o com as qualifica????es do Sistema Educativo Portugu??s. Os pedidos s??o apresentados nas escolas da ??rea de resid??ncia, formalizando o reconhecimento de qualifica????es em uma aplica????o adequada que deve ser feita pela escola, preenchida. </p>  <br><br> <h2 class='cbp' id='lol-sub-title'>Diretoria Geral de Educa????o Superior</h2> <p><b class='ponto'>&bull;</b> A Direc????o Geral do Ensino Superior inclui o NARIC (Centro Nacional de Informa????o sobre o Reconhecimento Acad??mico), o Centro Nacional de Informa????o especialmente dirigido para responder a quest??es sobre certificados estrangeiros e reconhecimento de diplomas.</p>   </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#embaixada").on("click",function(){ /* <- troca */
					$("#lol-title").html("Servi??os para Estrangeiros"); // titulo da seccao
					$("#lol-sub-title").html("Embaixada - Consulado"); // sub titulo
					$("#lol-content").html("<p>A embaixada ?? um departamento pol??tico encarregado das rela????es entre dois Estados; a se????o do consulado ?? respons??vel pelas quest??es relativas aos cidad??os nacionais do pa??s de origem no pa??s de acolhimento. Assim, os consulados executam um conjunto de servi??os e informa????es, tais como: </p> <p style='text-align: left;'> <b class='ponto'>&bull;</b> Recenseamento dos cidad??os do pa??s de origem residente no pa??s de acolhimento <br><b class='ponto'>&bull;</b> Concedimento de Vistos <br><b class='ponto'>&bull;</b> Registo Civil <br><b class='ponto'>&bull;</b> Emiss??o de passaportes e outros documentos</p>  <br><br> <h2 class='cbp' id='lol-sub-title'>Freguesia</h2> <div style= 'width:65vw;margin:auto;'> <p><b class='ponto'>&bull;</b> Atualmente Lisboa est?? organizada em 24 freguesias distribu??das por 5 ??reas geogr??ficas. Freguesias s??o unidades administrativas que, entre outros poderes, podem: <br><b class='ponto'>&rarr;</b>Passar certificados de resid??ncia para estrangeiros <br><b class='ponto'>&rarr;</b> Inscrever-se para o censo eleitoral</p> <div><img src='images/freguesia.jpg' width = '350px' height = '300px' align = 'center'/></div> <br><br> <h2 class='cbp' id='lol-sub-title'>SEF - Servi??o de Estrangeiros e Fronteiras</h2> <div style= 'width:65vw;margin:auto;'> <p><b class='ponto'>&bull;</b> O Departamento de Fronteiras (SEF) ?? um servi??o de seguran??a e um Departamento da Pol??cia Criminal, parte do Minist??rio do Interior, cuja miss??o ?? controlar as fronteiras e estrangeiros, estudar a atividade migrat??ria, executar a pol??tica de imigra????o e asilo no ??mbito do Constitui????o, a Lei e as diretrizes fornecidas pelo Governo. Entre outras atribui????es, o SEF ?? o departamento respons??vel pela emiss??o de autoriza????es de resid??ncia a cidad??os estrangeiros que residam legalmente em Portugal. <br><b class='ponto'>&bull;</b> Para lidar com assuntos relacionados com documentos, em Portugal pode-se ir aos balc??es de atendimento do Departamento de Fronteiras.</p> </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#emprego").on("click",function(){ /* <- troca */
					$("#lol-title").html("Emprego"); // titulo da seccao
					$("#lol-sub-title").html("Instituto de Emprego e Forma????o Profissional - IEEP"); // sub titulo
					$("#lol-content").html("<div style= 'width:65vw;margin:auto;'> <p><b class='ponto'>&bull;</b> O Instituto de Emprego e Forma????o, IP (IEEP), ?? o servi??o p??blico respons??vel pela gest??o do emprego a n??vel nacional e tem como finalidade promover a cria????o de emprego e combater o desemprego, atrav??s da implementa????o de pol??ticas activas de forma????o e emprego. </p> <p><b class='ponto'>&bull;</b> Tem uma ampla rede de Centros de Emprego, Treinamento e Reabilita????o Profissional e at?? Centros de Apoio ?? Cria????o de Neg??cios (CACE). Eles fornecem os seguintes servi??os: <br> <p style='text-align: left;'> <b class='ponto'>&rarr;</b> Ofertas de emprego ajustadas ao perfil do trabalhador e Medidas de apoio ao emprego<br> <b class='ponto'>&rarr;</b> Medidas de apoio ao emprego <p><b class='ponto'>&bull;</b> Desenvolvimento de especializa????o em busca de emprego e gest??o de carreira<br> <b class='ponto'>&rarr;</b> Desenvolvimento de compet??ncias profissionais <br> <b class='ponto'>&rarr;</b> Apoio ?? reabilita????o profissional</p> <p><b class='ponto'>&bull;</b> A estrutura dos servi??os do IEFP ?? descentralizada, organizada em cinco Delega????es Regionais espalhadas pelo pa??s. A cidade de Lisboa faz parte da Delega????o Regional de Lisboa e Vale do Tejo, constitu??da pelo pa??s, composta por 3 centros denominados por Servi??os de Emprego e um Servi??o de Forma????o, que funcionam como servi??os de proximidade.</p> <p><b>Para se registar, ?? necess??rio:</b><br> <b class='ponto'>&bull;</b> Morar na ??rea geogr??fica do centro <br><b class='ponto'>&bull;</b> Ter um cart??o de identifica????o para cidad??os estrangeiros ou um passaporte (no caso de ser um cidad??o de um pa??s pertencente ao ??rea Econ??mico Europeu). <br><b class='ponto'>&bull;</b> Ter um t??tulo isso permite a sua perman??ncia em Portugal e ao acesso a um emprego no caso de ser cidad??o de um Pa??s n??o pertencente ao ??rea Econ??mico Europeu.</p></p> </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#fiscais").on("click",function(){ /* <- troca */
					$("#lol-title").html("Servi??os Fiscais"); // titulo da seccao
					$("#lol-sub-title").html("Escrit??rios Fiscais"); // sub titulo
					$("#lol-content").html("<p>Prestam servi??os como: <br> <b class='ponto'>&bull;</b> Emiss??o do t??tulo de resid??ncia fiscal - documento que permite aos servi??os fiscais Portugueses (Impostos e Autoridade Fiscal) certificar que um sujeito predeterminado ?? um contribuinte residente em Portugal. <br> <b class='ponto'>&bull;</b> Apoio aos contribuintes sobre os seus impostos e obriga????es fiscais</p> </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#saude").on("click",function(){ /* <- troca */
					$("#lol-title").html("Sa??de"); // titulo da seccao
					$("#lol-sub-title").html("A Telecare"); // sub titulo
					$("#lol-content").html("<div style= 'width:65vw;margin:auto;'> <p>O Servi??o Telecare, disponibilizada gratuitamente pela C??mara Municipal de Lisboa, tem como finalidade a manuten????o da autonomia dos idosos nas suas resid??ncias, com dignidade e seguran??a, permitindo uma resposta imediata em caso de urg??ncia / emerg??ncia ou resultante destes, 24h por dia, 7 dias por dia. semana, bem como o apoio em caso de solid??o a quem est?? em situa????o de vulnerabilidade ou depend??ncia (f??sica ou psicol??gica).</p>  <br><br> <h2 class='cbp' id='lol-sub-title'>Centros de Sa??de</h2> <p><b class='ponto'>&bull;</b> Centros de Centros de Sa??de, tamb??m designados resumidamente como ACES, t??m como miss??o fornecer cuidados de sa??de prim??rios ?? popula????o de uma determinada ??rea geogr??fica e possuem as seguintes unidades funcionais: <br><b class='ponto'>&rarr;</b> Unidade de Sa??de Fam??liar (USF) <br><b class='ponto'>&rarr;</b> Unidade de Cuidados de Sa??de Personalizada (UCSP) <br><b class='ponto'>&rarr;</b> Unidade de Cuidado na Comunidade (UCC) <br><b class='ponto'>&rarr;</b> Unidade de Sa??de P??blica (USP) <br><b class='ponto'>&rarr;</b> Unidade de Recursos de Cuidados Compartilhados (URAP) <p><b class='ponto'>&bull;</b> Estrangeiros que residem legalmente em Portugal podem ter acesso aos servi??os oficiais de sa??de e t??m direito a medica????o. Para isso, ?? necess??rio obter no Centro de Sa??de da ??rea de resid??ncia o 'cart??o do usu??rio', que ser?? concedido ??queles que apresentarem a 'autoriza????o de resid??ncia' ou o 'visto de trabalho'.</p> <p><b class='ponto'>&bull;</b> Se n??o houver 'autoriza????o de resid??ncia' ou 'visto de trabalho', o acesso aos servi??os de sa??de ?? concedido se um documento emitido pela reguesia local declarar que a pessoa reside em Portugal por mais de 90 dias.</p> <p><b class='ponto'>&bull;</b> A cidade de Lisboa ?? organizada em 3 departamentos, diferenciados pela sua ??rea geogr??fica: Lisboa Norte, Lisboa Central e Lisboa Leste / Oeiras.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Hospitais P??blicos</h2> <p><b class='ponto'>&bull;</b> O sistema de sa??de ?? formado pelo Servi??o Nacional de Sa??de e por todas as entidades p??blicas que desenvolvem atividades de promo????o, preven????o e tratamento na ??rea da sa??de.</p> <p><b class='ponto'>&bull;</b> Estrangeiros que residem legalmente em Portugal podem ter acesso aos servi??os oficiais de sa??de e t??m direito a medica????o. Para isso, ?? necess??rio obter no Centro de Sa??de da ??rea de resid??ncia o 'cart??o do usu??rio', que ser?? concedido ??queles que apresentarem a 'autoriza????o de resid??ncia' ou o 'visto de trabalho'.</p> <p><b class='ponto'>&bull;</b> Beneficie do Servi??o Nacional de Sa??de de todos os cidad??os portugueses, cidad??os dos pa??ses membros da UE, sob a regra aplic??vel UE, cidad??os estrangeiros que vivem em Portugal, em condi????es de reciprocidade, e cidad??os ap??tridas que vivem em Portugal.</p> <p><b class='ponto'>&bull;</b> Cada munic??pio ?? uma ??rea de sa??de dividida em ??reas menores, definidas geograficamente. No caso de Lisboa, a rede hospitalar - Lisboa Norte, Lisboa Central e Lisboa Sul ?? o resultado da fus??o de v??rios hospitais.</p> </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#publicos").on("click",function(){ /* <- troca */
					$("#lol-title").html("Servi??os P??blicos"); // titulo da seccao
					$("#lol-sub-title").html("Loja do Cidad??o"); // sub titulo / altera sempre isto
					$("#lol-content").html("<div style= 'width:65vw;margin:auto;'> <p>Um conjunto de servi??os reunidos no mesmo espa??o pertencente a v??rias entidades p??blicas e privadas, a fim de facilitar o relacionamento entre os cidad??os e as empresas com o Servi??o P??blico.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Esquadra Policial</h2> <p>A Pol??cia de Seguran??a P??blica (PSP) ?? uma for??a de seguran??a Portuguesa com o objectivo de defender a legalidade democr??tica, de garantir a seguran??a do lar e de defender os direitos dos cidad??os. Os m??ltiplos Centros de Comando Territoriais da PSP s??o, geralmente, divididos em Divis??es, que incluem v??rias esquadra. A Esta????o ?? a unidade b??sica da PSP, localizada no pr??prio pr??dio, onde todos os cidad??os, nacionais ou estrangeiros, registrados ou n??o em territ??rio nacional, t??m o direito de fazer uma den??ncia quando ?? v??tima de um crime, iniciando o devido processo judicial. Nenhuma autoridade policial ou judici??ria pode recusar-se a aceitar uma queixa baseada no argumento de que a v??tima n??o possui um visto ou uma autoriza????o de resid??ncia em Portugal.</p>  <br><br> <h2 class='cbp' id='lol-sub-title'> Transportes P??blicos </h2> <div style= 'width:65vw;margin:auto;'> <p><b class='ponto'>&bull;</b> Lisboa ?? servida por uma ampla rede de transportes:<br> Metro, el??ctrico, autocarros, ferries, comboios e t??xis.</p> <p><b>Metro de Lisboa</b><br> O Metropolitano de Lisboa, normalmente referido como METRO, tem uma extens??o de cerca de 43 km, sendo dividido por 4 rotas diferentes com 55 esta????es. Abre ??s 6:30 da manh??. O ??ltimo metro sai de cada terminal ??s 01:00. <div><img src='images/metro.jpg' width = '1000px' height = '500px'/></div> <p><b>Aeroporto de Lisboa</b><br> O Aeroporto de Lisboa, tamb??m conhecido como Aeroporto da Portela, fica a 7 km do centro, na zona nordeste da cidade e ?? cortado por dois terminais: Terminal 1, para voos internacionais, e Terminal 2, para 2 voos dom??sticos e de baixo custo, incluindo para os A??ores e a Madeira.</p> <p><b>Transporte Fluvial</b><br> Existe ainda uma rede de ferries, Transtejo e Soflusa, que ligam as duas margens do rio Tejo, com cais do Cais do Sodr??, Bel??m, Terreiro do Pa??o e Parque das Na????es, a norte da costa, e Cacilhas, Barreiro, Montijo , Trafaria, Porto Brand??o e Seixal na costa sul.</p> <p><b>El??tricos e Elevadores</b><br> Com sua caracter??stica cor amarela, os el??tricos s??o o meio de transporte tradicional no centro da cidade. Eles s??o operados pela Carris, assim como os elevadores que sobem as Colinas de Lisboa: Elevador da Bica, Elevador da Gl??ria, Elevador da Lavra e Elevador de Santa Justa.</p> <p><b>Transporte Rodovi??rio</b><br> A opera????o p??blica de autocarros tamb??m est?? sob a responsabilidade da Carris. Existe um Terminal Rodovi??rio em Lisboa, de onde partem e chegam diariamente dezenas de autocarros com os destinos mais distintos, nacionais e internacionais. Os t??xis tamb??m s??o muito comuns na cidade, sendo atualmente de cor creme, mas ainda mat??m as cores dos t??xis antigos: preto e verde.</p> <p><b>Transporte ferrovi??rio</b><br> A CP, Ferrovia Portuguesa, ?? a empresa p??blica portuguesa dedicada ao servi??o nacional de transporte ferrovi??rio de passageiros e, tamb??m, na ??rea de Lisboa: <br> <b class='ponto'>&rarr;</b> Linha Azambuja: opera entre Santa Apol??nia / Alc??ntara Terra e Azambuja, utilizando a Linha Belt Rail e parte da Linha Ferrovi??ria Norte. <br><b class='ponto'>&rarr;</b> Linha de Cascais: utiliza Linha Ferrovi??ria de Cascais. <br><b class='ponto'>&rarr;</b> Linha de Sintra: opera entre Rossio / Alverca e Sintra / Mora-Sintra - Mele??as, utilizando a linha de caminho-de-ferro de Sintra e partes da linha norte do caminho-de-ferro, Trilho de Correia e Linha Ferrovi??ria Oeste. <br> <b class='ponto'>&rarr;</b> Linha Sado: opera entre o Barreiro e Praias Sado A, utilizando partes do Alentejo, Linha Ferrovi??ria e Linha do Sul </p> <p style='text-align: Center;'><br><b> Bilhetes</h4> </b></p> <p><b>Cart??o 7 Colinas</b><br> Assim, quem viaja na Linha Azul em dire????o a Santa Apol??nia - Amadora-Este, ou vice-versa, tem que comprar uma passagem de 2 zonas se a viagem for al??m da Esta????o Pontinha. O mesmo acontece na Linha Amarela, no sentido Rato - Odivelas, ou vice - versa, se a viagem for al??m do Senhor Roubado. A rede de metropolitano de Lisboa tem um grande n??mero de bilhetes de transporte que permitem diferentes op????es de transporte do passageiro. Para os clientes que utilizam com frequ??ncia o Metro est??o dispon??veis o Cart??o 7 Colinas ou o Viva Viagem. A partir de 1 de fevereiro de 2012, as ??'Coroas foram aplicadas apenas aos Passes Urbanos, n??o sendo mais aplicadas a bilhetes ??nicos, com a cobran??a de valor ??nico, n??o se aplicando se o usu??rio ultrapassar ou n??o a 'Coroa L'. <br> </p> <p><b>Cart??o 7 Colinas / Viva Viagem</b><br> O 7 Cart??o Colinas / Viva Viagem ?? um bilhete para as empresas aderentes de transporte. Para o seu uso, ?? necess??rio carregar o cart??o com o ticket pretendido, em qualquer lugar do metro de Lisboa. Este cart??o tem um custo de 0,50 c??ntimos e pode ser usado para viajar com a Carris, o Metro de Lisboa, Fertagus, CP, Transtejo e Soflusa.Os bilhetes podem ser carregados neste cart??o, tanto para intermodal (modo Zapping, carregando o cart??o com dinheiro, em euros), ou seja, aqueles que incluem mais de uma empresa, ou exclusivamente, como um simples bilhete subterr??neo que pode ser carregado para este cart??o. Este cart??o tem validade de um ano ap??s ser carregado pela primeira vez e n??o poder?? ser usado at?? o final do per??odo. Num entanto, o dinheiro / bilhetes cobrado no cart??o pode ser usado durante essa data.<br> </p> <p><b>Lisboa Viva</b><br> O cart??o Lisboa Viva ?? um cart??o de suporte a bilhetes, que permite a cobran??a de bilhetes mensais, que podem ser utilizados exclusivamente no subsolo de Lisboa ou podem ser articulados com outros, como a Carris ou a CP.<br> </p>  <br><br> <h2 class='cbp' id='lol-sub-title'>Escrit??rios de Registo</h2> <p><b class='ponto'>&bull;</b> Escrit??rios de Registo ?? o nome dos servi??os p??blicos onde registos de diferentes tipos s??o feitos, tais como: Registo Civil, Registo de Im??veis, Registo de Ve??culos e Registo Comercial..</p> <p>Com o Registo Central fica o Registo Central especial de Nacionalidade e o respectivo lit??gio, o Registo Central para Estado Civil e o Registo Central de A????es e Testamentos. Nos livros para o registo da nacionalidade s??o registados todos os factos que determinar??o a atribui????o, aquisi????o e perda da nacionalidade portuguesa. Com o Conservador do Registo Central encontra-se o poder de emitir pareceres sobre quest??es relativas ?? nacionalidade, bem como para emitir, a pedido das partes interessadas, certificados de nacionalidade portuguesa. Estabelece tamb??m o poder de registar a aquisi????o da nacionalidade portuguesa, ou integr??-las, se for feito nos Consulados Portugueses. </p> </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
			});
			$(window).load(function () {
    $(".trigger_popup_fricc").click(function(){
       $('.hover_bkgr_fricc').show();
    });
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
});

	});

})(jQuery);