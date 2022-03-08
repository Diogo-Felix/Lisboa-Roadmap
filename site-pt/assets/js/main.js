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
					$("#lol-title").html("Residência");
					$("#lol-sub-title").html("Acesso à Habitação Municipal em Lisboa");
					$("#lol-content").html("<p> Existe em lisboa um conjunto de casas municipais para pessoas interessadas em viver na cidade, sendo a aplicação feita ao abrigo de um regulamento (RRAHM). Podem aplicar as moradias municipais aos cidadãos nacionais e estrangeiros, com autorização de residência para o território português, que não tenham um lar adequado para satisfazer as necessidades famíliares e que atendam aos requisitos de acesso estabelecidos. O pedido pode ser feito 'on-line' preenchendo um formulário eletrônico, ou pessoalmente num dos balcões de atendimento, apresentando os documentos necessários. <br><br> <h2 class='cbp'>Departamento dos Direitos Sociais</h2> <p><b class='ponto'>&bull; Fundo de Emergência Social de Lisboa - Secção do Agregado Familiar</b> <br> A promoção de políticas públicas municipais que promovem o efetivo acesso aos direitos sociais, ao atendimento das necessidades das pessoas que vivem em condições difíceis, que reservam ciclo de pobreza e desigualdade e permitam encontrar uma solução para vulnerabilidades e situações de emergência social, Câmara Municipal de Lisboa, que definem especialmente a manutenção e desenvolvimento do Fundo de Emergência Social, nomeadamente na área do apoio familiar através de Paróquias.</p> <p>O Fundo de Emergência Social de Lisboa (FES) é um apoio de natureza excepcional e temporária que deve ser atribuído a agregados carenciados de famílias sérias em situações de emergência habitacional grave e que residam no Município de Lisboa.</p> <p>Os residentes têm o direito de solicitar um apoio excepcional se estiverem em situação de emergência grave e reunirem as seguintes circunstâncias cumulativas:<br> <b class='ponto'>&bull;</b> Se estiverem a precisar de casa, se tivessem perdido sua casa anterior como resultado de um deslizamento de terra, catástrofe, execução de hipoteca como resultado de uma decisão judicial, abuso doméstico e fim de residência em estabelecimentos coletivos de ocorrer uma alta e confirmado risco de perda iminente de moradia, por falha de pagamento de aluguel de casa como resultado de desemprego e a falta do benefício respetivo, ou uma redução repentina de renda de benefícios sociais;<br> <b class='ponto'>&bull;</b> Não tem, nem nenhum membro da família, um lar alternativo no Município de Lisboa e nos municípios vizinhos;<br> <b class='ponto'>&bull;</b> Não estão a ocupar abusivamente uma casa municipal ou, como resultado de tal abuso, têm sido alvo de despejo coercivo pela Polícia Municipal;<br> <b class='ponto'>&bull;</b> Ter uma renda mensal per capita igual ou inferior a 300 euros;<br> <b class='ponto'>&bull;</b> Não beneficiar, por qualquer membro do agregado familiar, outros apoios à habitação ou benefícios sociais permanentes ou extraordinários concedidos com o mesmo fim e com a mesma justificação, pelas entidades públicas ou municipais de Lisboa.</p> <p>O pedido de apoio ao abrigo da FES - Famílias Familiares deve ser feito através do formulário adequado, disponível na Paróquia da residência.</p> <p>Para mais explicações e esclarecimentos sobre este apoio, pode verificar as <b>Perguntas mais Frequentes disponível em htt://www.cm-lisboa.pt/perguntas-frequentes/intervencao-social/apoio-do-fundo-de-emergencia-social-agregados-familiares</b> ou para verificar as Regras de Trabalho para o Fundo de Emergência Social - Famílias Familiares, que foram publicadas pela Ordem n. 93/P/2014, publicado no 2º suplemento do Boletim Municipal n.1065, de 17 de julho de 2014.</p> </div> <div> </div> </div> </li> </ul>");
				
				});
				$("#social").on("click",function(){ /* <- troca */
					$("#lol-title").html("Apoio Social"); // titulo da seccao
					$("#lol-sub-title").html("Imigrantes e Discriminação"); // sub titulo
					$("#lol-content").html("<p> A Unidade Suporte às Vítimas Migrantes (UAVM) foi criada pela Associação Portuguesa para o Apoio às vítimas (APAV), sendo uma unidade especializada para o apoio de imigrantes residentes em Portugal que foram vítimas de crime ou discriminação racial.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Centros de Apoio à Integração de Imigrantes (CLAII)</h2> <p id='lol-content'>O local de Centros de Apoio à Integração de Imigrantes - CLAII - nasceu em parceria estabelecida entre o Auto Comissariado para os Migrantes - ACM, I.Pe municípios ou outras entidades da sociedade civil (associações de imigrantes ou outros, IPSS, NGO, centros paroquiais, entre outros) que, em cooperação, promovam um serviço integrado. CLAII são escritórios de receção, informação e apoio descentraizado, com ligação ao Centro Nacional de Apoio ao Imigrante - CNAI, que pretende ajudar a responder às necessidades dos cidadãos imigrantes nas áres de: <br><b class='ponto>&bull;</b> Regularização da situação migratórias: Nacionalidade; Reagrupamento Familiar; Habitação; Trabalho; Segurança Social; Repatriamento Voluntário; Cuidados de saúde;Educação; Treino Profissional; Empreendedorismo; Associaões de Suporte, entre outros.</p> <br><b class='ponto'>&bull; </b> Regularização da situação migratórias: Nacionalidade; Reagrupamento Familiar; Habitação; Trabalho; Segurança Social; Repatriamento Voluntário; Cuidados de saúde;Educação; Treino Profissional; Empreendedorismo; Associaões de Suporte, entre outros.</p>  <br><br> <h2 class='cbp' id='lol-sub-title'> Agências Públicas para o Suporte aos Imigrantes </h2> <p> O Centro Nacional de Apoio ao Imigrante (CNAI) é uma estrutura dependente do Alto Comissariado para os Migrantes - ACM, IP e, em Lisboa, funciona no mesmo edifício. Destinado ao cidadão imigrante, este centro concentra, no mesmo espaço, diferentes serviços específicos, orientados para o tema da imigração. <br><br> No CNAI encontram-se Instituições Públicas e Gabinetes de Apoio Especializado, cujos atendimentos são realizados por mediadores e mediadores socioculturais, sendo alguns deles também imigrantes, permitindo aos imigrantes a possibilidade de expressar e obter informações na sua língua materna.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Balcões Municipais Únicos</h2> <p>Os Balcões Municipais Únicos são serviços multicanais integrados - sejam eles presenciais, telefónicos e virtuais - concebido para responder às necessidades dos cidadãos que trabalham, vivem e visitam Lisboa, permitindo-lhes abordar os serviços municipais através do canal que mais lhes convém à sua própria disponibilidade.</p> <p>Incluem-se numa estratégia de aproximação do Município para com os cidadãos, disponibilizando serviços de apoio e atendimento integrado ao cliente, nomeadamente:<br> <b class='ponto'>&bull;</b> Emissão do certificado de registo do cidadão da UE.</p>   </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#educacao").on("click",function(){ /* <- troca */
					$("#lol-title").html("Educação"); // titulo da seccao
					$("#lol-sub-title").html("Sistema Educacional"); // sub titulo
					$("#lol-content").html("<p><b class='ponto'>&bull;</b> O sistema educacional desenvolve-se em três níveis: primário, secundário e ensino superior. O nível primário e secundário são universais, obrigatórios e gratuitos.</p> <p><b class='ponto'>&bull;</b> A educação Pré-Escolar, que vem antes da Escola Primária, destina-se a crianças com idades compreendidas entre os três e os seis anos de idade, a idade de entrada ao ensino obrigatório.</p> <p><b class='ponto'>&bull;</b> O nível primário inclui três ciclos sequenciais, o primeiro com quatro anos (1º ao 4º ano), o segundo com dois anos (5º ao 6º ano) e o terceiro com três anos (7º até 9º ano).</p> <p><b class='ponto'>&bull;</b> Nível secundário é um ciclo de três anos (10º ao 12º ano).</p> <p><b class='ponto'>&bull;</b> O ensino superior português inclui universidades e politécnicos. O ensino universitário é ministrado por universidades públicas e privadas, enquanto o ensino politécnico é ministrado por instituições públicas e privadas não universitárias. As instruções privadas precisam de um reconhecimento prévio pelo Ministério da Educação e Ciência. A rede de ensino superior também incorpora na instituição da educação de concordata.</p> <p><b class='ponto'>&bull;</b> Universidades e Politécnicos concedem um diploma universitário.<br> O ciclo de estudos conducente à licenciatura no Politécnico tem a duração regular de seis semestres correspondentes a 180 créditos ou, excepcionalmente, em situações abrangidas pelo direito nacional ou da União Europeia, duração normal até sete ou oito semestres de trabalho curricular e formação até 240 créditos. <br> Universidades e Politécnicos podem conceder o grau de Mestrado. <br> O ciclo de estudos que leva ao grau de mestrado tem 90 a 120 créditos e uma duração normal de três a quatro semestres ou, excepcionalmente, como resultado de uma prática internacional estável e consolidada, 60 créditos e duração de dois semestres. No Politécnico, o ciclo de estudos que leva ao grau de Mestrado concede, principalmente, a aquisição de uma especialização profissional. Na Universidade, o ciclo de estudos que leva ao grau Mestrado deve garantir, principalmente, a aquisição de uma especialização acadêmica que recorra à pesquisa ou que aprofunde habilidades profissionais já existentes. Com o ensino universitário, o grau de Mestrado também pode ser concedido após um ciclo integrado de estudos, com 300 ou 360 créditos e uma duração normal de 10 a 12 semestres o trabalho curricular nos casos em que o tempo para o acesso ao exercício de uma determinada actividade profissional, definida por norma jurídica da União Europeia, resulta de uma prática estável e consolidada com a União Europeia. Neste ciclo de estudos é concedido o grau acadêmico a quem já obteve 180 créditos correspondentes aos seis primeiros semestres.</p> <p>Durante o segundo ciclo de estudos nas Universidades e Politécnicos o grau de Mestrado é concedida por aprovação em todas as unidades curriculares que fazem parte do plano de Mestrado e após aprovação em ato público de defesa da tese, do projeto desenvolvido ou do relatório de estágio, obtendo o número pré-definido de créditos. O grau de doutoramento é garantido por Universidades e Institutos Universitários aos quais foram aprovados durante as unidades curriculares do curso de doutorado quando existe, e durante o ato público de defesa de uma tese. <br> Para se candidatar a um primeiro ciclo de estudos conducentes à licenciatura regular ou ao ciclo de estudos para o grau de mestre, pelo regime regular, os estudantes nacionais e estrangeiros devem preencher as seguintes condições: </b> <br><b class=ponto'>&bull;</b> Ser aprovado no nível secundário de estudos ou ter uma certificado de equivalência nacional ou estrangeira; <br><b class='ponto'>&bull;</b> Realizar os exames de admissão exigidos para a área de estudos a que os alunos se candidatem com uma classificação igual ou superior ao mínimo definido (existem instituições de ensino superior que aceitam exames por estudantes estrangeiros); <br><b class='ponto'>&bull;</b> Satisfazer os pré-requisitos exigidos (se aplicável) para a área de estudos que o aluno está a aplicar.</p> <p><b>Condições especiais de acesso: </b><br> Para além das condições gerais de acesso, existem condições especiais para acesso aos estudos superiores para atletas de elite, cidadãos portugueses em missão oficial no estrangeiro, funcionários nacionais e estrangeiros em missão diplomática, Oficiais das Forças Armadas e Beneficiários no quadro de cooperação assinada pelo Estado Português.</p> <p><b>Concursos Especiais: </b><br> Além dos regimes gerais e especiais de acesso à instituição de ensino superior, para pessoas que reúnem condições específicas de habilitação permitindo a admissão no ensino superior de novo público num nível lógico de Educação do novo público de uma lógica de aprendizagem ao longo da vida: <br><b class='ponto'>&bull;</b> Maiores de 23 anos que foram aprovados nos exames destinados a avaliar a capacidade de frequência do ensino superior; <br><b class='ponto'>&bull;</b> Intitulado com curso de especialização tecnológica (pós-ensino médio não superior)<br> A admissão em cada Instituição de Ensino Superior está sujeita a numerosas claúsulas</p> <p><b>Admissão ao segundo ciclo de estudos </b><br> Pode candidatar-se à admissão no segundo nível de estudos conducente ao grau de Mestrado: <br><b class='ponto'>&bull;</b> Diploma de Licenciatura ou similar; <br><b class='ponto'>&bull;</b> Estrangeiros com diploma de licenciatura, reconhecido como preenchendo os requisitos do grau de Licenciatura aceite pela instituição de Ensino Superior onde pretendem ser admitidos; <br><b class='ponto'>&bull;</b> Aqueles que possuem currículo escolar, científico ou profissional, atestando capacidade para a realização deste ciclo de estudos pela instituição de ensino superior onde pretendem ser admitidos.</p> <p><b>Admissão ao terceiro ciclo de estudo </b><br> Pode aplicar-se ao terceiro ciclo de estudos conducente ao grau de doutoramento: <br><b class='ponto'>&bull;</b> Diploma de Licenciatura ou similar; <br><b class='ponto'>&bull;</b> Licenciamento com currículo escolar ou profissional relevante, reconhecido como atestando capacidade de realização deste ciclo de estudos pelo departamento competente da Instituição de Ensino Superior onde pretendem ser admitidos.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Direção Geral da Educação</h2> <p><b class='ponto'>&bull; Reconhecimento de Qualificação, Estudos e Certificados de Sistemas de Educação Estrangeira</b> <br> É um departamento que pertence à Administração Direta do Governo Central concedida com autonomia administrativa, que fornece informações sobre onde e como se pode obter informações sobre o reconhecimento de qualificação, estudos e certificados de sistemas educativos estrangeiros em relação à escola primária e secundária em comparação com as qualificações do Sistema Educativo Português. Os pedidos são apresentados nas escolas da área de residência, formalizando o reconhecimento de qualificações em uma aplicação adequada que deve ser feita pela escola, preenchida. </p>  <br><br> <h2 class='cbp' id='lol-sub-title'>Diretoria Geral de Educação Superior</h2> <p><b class='ponto'>&bull;</b> A Direcção Geral do Ensino Superior inclui o NARIC (Centro Nacional de Informação sobre o Reconhecimento Académico), o Centro Nacional de Informação especialmente dirigido para responder a questões sobre certificados estrangeiros e reconhecimento de diplomas.</p>   </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#embaixada").on("click",function(){ /* <- troca */
					$("#lol-title").html("Serviços para Estrangeiros"); // titulo da seccao
					$("#lol-sub-title").html("Embaixada - Consulado"); // sub titulo
					$("#lol-content").html("<p>A embaixada é um departamento político encarregado das relações entre dois Estados; a seção do consulado é responsável pelas questões relativas aos cidadãos nacionais do país de origem no país de acolhimento. Assim, os consulados executam um conjunto de serviços e informações, tais como: </p> <p style='text-align: left;'> <b class='ponto'>&bull;</b> Recenseamento dos cidadãos do país de origem residente no país de acolhimento <br><b class='ponto'>&bull;</b> Concedimento de Vistos <br><b class='ponto'>&bull;</b> Registo Civil <br><b class='ponto'>&bull;</b> Emissão de passaportes e outros documentos</p>  <br><br> <h2 class='cbp' id='lol-sub-title'>Freguesia</h2> <div style= 'width:65vw;margin:auto;'> <p><b class='ponto'>&bull;</b> Atualmente Lisboa está organizada em 24 freguesias distribuídas por 5 áreas geográficas. Freguesias são unidades administrativas que, entre outros poderes, podem: <br><b class='ponto'>&rarr;</b>Passar certificados de residência para estrangeiros <br><b class='ponto'>&rarr;</b> Inscrever-se para o censo eleitoral</p> <div><img src='images/freguesia.jpg' width = '350px' height = '300px' align = 'center'/></div> <br><br> <h2 class='cbp' id='lol-sub-title'>SEF - Serviço de Estrangeiros e Fronteiras</h2> <div style= 'width:65vw;margin:auto;'> <p><b class='ponto'>&bull;</b> O Departamento de Fronteiras (SEF) é um serviço de segurança e um Departamento da Polícia Criminal, parte do Ministério do Interior, cuja missão é controlar as fronteiras e estrangeiros, estudar a atividade migratória, executar a política de imigração e asilo no âmbito do Constituição, a Lei e as diretrizes fornecidas pelo Governo. Entre outras atribuições, o SEF é o departamento responsável pela emissão de autorizações de residência a cidadãos estrangeiros que residam legalmente em Portugal. <br><b class='ponto'>&bull;</b> Para lidar com assuntos relacionados com documentos, em Portugal pode-se ir aos balcões de atendimento do Departamento de Fronteiras.</p> </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#emprego").on("click",function(){ /* <- troca */
					$("#lol-title").html("Emprego"); // titulo da seccao
					$("#lol-sub-title").html("Instituto de Emprego e Formação Profissional - IEEP"); // sub titulo
					$("#lol-content").html("<div style= 'width:65vw;margin:auto;'> <p><b class='ponto'>&bull;</b> O Instituto de Emprego e Formação, IP (IEEP), é o serviço público responsável pela gestão do emprego a nível nacional e tem como finalidade promover a criação de emprego e combater o desemprego, através da implementação de políticas activas de formação e emprego. </p> <p><b class='ponto'>&bull;</b> Tem uma ampla rede de Centros de Emprego, Treinamento e Reabilitação Profissional e até Centros de Apoio à Criação de Negócios (CACE). Eles fornecem os seguintes serviços: <br> <p style='text-align: left;'> <b class='ponto'>&rarr;</b> Ofertas de emprego ajustadas ao perfil do trabalhador e Medidas de apoio ao emprego<br> <b class='ponto'>&rarr;</b> Medidas de apoio ao emprego <p><b class='ponto'>&bull;</b> Desenvolvimento de especialização em busca de emprego e gestão de carreira<br> <b class='ponto'>&rarr;</b> Desenvolvimento de competências profissionais <br> <b class='ponto'>&rarr;</b> Apoio à reabilitação profissional</p> <p><b class='ponto'>&bull;</b> A estrutura dos serviços do IEFP é descentralizada, organizada em cinco Delegações Regionais espalhadas pelo país. A cidade de Lisboa faz parte da Delegação Regional de Lisboa e Vale do Tejo, constituída pelo país, composta por 3 centros denominados por Serviços de Emprego e um Serviço de Formação, que funcionam como serviços de proximidade.</p> <p><b>Para se registar, é necessário:</b><br> <b class='ponto'>&bull;</b> Morar na área geográfica do centro <br><b class='ponto'>&bull;</b> Ter um cartão de identificação para cidadãos estrangeiros ou um passaporte (no caso de ser um cidadão de um país pertencente ao Área Económico Europeu). <br><b class='ponto'>&bull;</b> Ter um título isso permite a sua permanência em Portugal e ao acesso a um emprego no caso de ser cidadão de um País não pertencente ao Área Económico Europeu.</p></p> </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#fiscais").on("click",function(){ /* <- troca */
					$("#lol-title").html("Serviços Fiscais"); // titulo da seccao
					$("#lol-sub-title").html("Escritórios Fiscais"); // sub titulo
					$("#lol-content").html("<p>Prestam serviços como: <br> <b class='ponto'>&bull;</b> Emissão do título de residência fiscal - documento que permite aos serviços fiscais Portugueses (Impostos e Autoridade Fiscal) certificar que um sujeito predeterminado é um contribuinte residente em Portugal. <br> <b class='ponto'>&bull;</b> Apoio aos contribuintes sobre os seus impostos e obrigações fiscais</p> </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#saude").on("click",function(){ /* <- troca */
					$("#lol-title").html("Saúde"); // titulo da seccao
					$("#lol-sub-title").html("A Telecare"); // sub titulo
					$("#lol-content").html("<div style= 'width:65vw;margin:auto;'> <p>O Serviço Telecare, disponibilizada gratuitamente pela Câmara Municipal de Lisboa, tem como finalidade a manutenção da autonomia dos idosos nas suas residências, com dignidade e segurança, permitindo uma resposta imediata em caso de urgência / emergência ou resultante destes, 24h por dia, 7 dias por dia. semana, bem como o apoio em caso de solidão a quem está em situação de vulnerabilidade ou dependência (física ou psicológica).</p>  <br><br> <h2 class='cbp' id='lol-sub-title'>Centros de Saúde</h2> <p><b class='ponto'>&bull;</b> Centros de Centros de Saúde, também designados resumidamente como ACES, têm como missão fornecer cuidados de saúde primários à população de uma determinada área geográfica e possuem as seguintes unidades funcionais: <br><b class='ponto'>&rarr;</b> Unidade de Saúde Famíliar (USF) <br><b class='ponto'>&rarr;</b> Unidade de Cuidados de Saúde Personalizada (UCSP) <br><b class='ponto'>&rarr;</b> Unidade de Cuidado na Comunidade (UCC) <br><b class='ponto'>&rarr;</b> Unidade de Saúde Pública (USP) <br><b class='ponto'>&rarr;</b> Unidade de Recursos de Cuidados Compartilhados (URAP) <p><b class='ponto'>&bull;</b> Estrangeiros que residem legalmente em Portugal podem ter acesso aos serviços oficiais de saúde e têm direito a medicação. Para isso, é necessário obter no Centro de Saúde da área de residência o 'cartão do usuário', que será concedido àqueles que apresentarem a 'autorização de residência' ou o 'visto de trabalho'.</p> <p><b class='ponto'>&bull;</b> Se não houver 'autorização de residência' ou 'visto de trabalho', o acesso aos serviços de saúde é concedido se um documento emitido pela reguesia local declarar que a pessoa reside em Portugal por mais de 90 dias.</p> <p><b class='ponto'>&bull;</b> A cidade de Lisboa é organizada em 3 departamentos, diferenciados pela sua área geográfica: Lisboa Norte, Lisboa Central e Lisboa Leste / Oeiras.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Hospitais Públicos</h2> <p><b class='ponto'>&bull;</b> O sistema de saúde é formado pelo Serviço Nacional de Saúde e por todas as entidades públicas que desenvolvem atividades de promoção, prevenção e tratamento na área da saúde.</p> <p><b class='ponto'>&bull;</b> Estrangeiros que residem legalmente em Portugal podem ter acesso aos serviços oficiais de saúde e têm direito a medicação. Para isso, é necessário obter no Centro de Saúde da área de residência o 'cartão do usuário', que será concedido àqueles que apresentarem a 'autorização de residência' ou o 'visto de trabalho'.</p> <p><b class='ponto'>&bull;</b> Beneficie do Serviço Nacional de Saúde de todos os cidadãos portugueses, cidadãos dos países membros da UE, sob a regra aplicável UE, cidadãos estrangeiros que vivem em Portugal, em condições de reciprocidade, e cidadãos apátridas que vivem em Portugal.</p> <p><b class='ponto'>&bull;</b> Cada município é uma área de saúde dividida em áreas menores, definidas geograficamente. No caso de Lisboa, a rede hospitalar - Lisboa Norte, Lisboa Central e Lisboa Sul é o resultado da fusão de vários hospitais.</p> </div> </div> </div> </li> </ul>"); //conteudo/texto
				});
				$("#publicos").on("click",function(){ /* <- troca */
					$("#lol-title").html("Serviços Públicos"); // titulo da seccao
					$("#lol-sub-title").html("Loja do Cidadão"); // sub titulo / altera sempre isto
					$("#lol-content").html("<div style= 'width:65vw;margin:auto;'> <p>Um conjunto de serviços reunidos no mesmo espaço pertencente a várias entidades públicas e privadas, a fim de facilitar o relacionamento entre os cidadãos e as empresas com o Serviço Público.</p> <br><br> <h2 class='cbp' id='lol-sub-title'>Esquadra Policial</h2> <p>A Polícia de Segurança Pública (PSP) é uma força de segurança Portuguesa com o objectivo de defender a legalidade democrática, de garantir a segurança do lar e de defender os direitos dos cidadãos. Os múltiplos Centros de Comando Territoriais da PSP são, geralmente, divididos em Divisões, que incluem várias esquadra. A Estação é a unidade básica da PSP, localizada no próprio prédio, onde todos os cidadãos, nacionais ou estrangeiros, registrados ou não em território nacional, têm o direito de fazer uma denúncia quando é vítima de um crime, iniciando o devido processo judicial. Nenhuma autoridade policial ou judiciária pode recusar-se a aceitar uma queixa baseada no argumento de que a vítima não possui um visto ou uma autorização de residência em Portugal.</p>  <br><br> <h2 class='cbp' id='lol-sub-title'> Transportes Públicos </h2> <div style= 'width:65vw;margin:auto;'> <p><b class='ponto'>&bull;</b> Lisboa é servida por uma ampla rede de transportes:<br> Metro, eléctrico, autocarros, ferries, comboios e táxis.</p> <p><b>Metro de Lisboa</b><br> O Metropolitano de Lisboa, normalmente referido como METRO, tem uma extensão de cerca de 43 km, sendo dividido por 4 rotas diferentes com 55 estações. Abre às 6:30 da manhã. O último metro sai de cada terminal às 01:00. <div><img src='images/metro.jpg' width = '1000px' height = '500px'/></div> <p><b>Aeroporto de Lisboa</b><br> O Aeroporto de Lisboa, também conhecido como Aeroporto da Portela, fica a 7 km do centro, na zona nordeste da cidade e é cortado por dois terminais: Terminal 1, para voos internacionais, e Terminal 2, para 2 voos domésticos e de baixo custo, incluindo para os Açores e a Madeira.</p> <p><b>Transporte Fluvial</b><br> Existe ainda uma rede de ferries, Transtejo e Soflusa, que ligam as duas margens do rio Tejo, com cais do Cais do Sodré, Belém, Terreiro do Paço e Parque das Nações, a norte da costa, e Cacilhas, Barreiro, Montijo , Trafaria, Porto Brandão e Seixal na costa sul.</p> <p><b>Elétricos e Elevadores</b><br> Com sua característica cor amarela, os elétricos são o meio de transporte tradicional no centro da cidade. Eles são operados pela Carris, assim como os elevadores que sobem as Colinas de Lisboa: Elevador da Bica, Elevador da Glória, Elevador da Lavra e Elevador de Santa Justa.</p> <p><b>Transporte Rodoviário</b><br> A operação pública de autocarros também está sob a responsabilidade da Carris. Existe um Terminal Rodoviário em Lisboa, de onde partem e chegam diariamente dezenas de autocarros com os destinos mais distintos, nacionais e internacionais. Os táxis também são muito comuns na cidade, sendo atualmente de cor creme, mas ainda matêm as cores dos táxis antigos: preto e verde.</p> <p><b>Transporte ferroviário</b><br> A CP, Ferrovia Portuguesa, é a empresa pública portuguesa dedicada ao serviço nacional de transporte ferroviário de passageiros e, também, na área de Lisboa: <br> <b class='ponto'>&rarr;</b> Linha Azambuja: opera entre Santa Apolónia / Alcântara Terra e Azambuja, utilizando a Linha Belt Rail e parte da Linha Ferroviária Norte. <br><b class='ponto'>&rarr;</b> Linha de Cascais: utiliza Linha Ferroviária de Cascais. <br><b class='ponto'>&rarr;</b> Linha de Sintra: opera entre Rossio / Alverca e Sintra / Mora-Sintra - Meleças, utilizando a linha de caminho-de-ferro de Sintra e partes da linha norte do caminho-de-ferro, Trilho de Correia e Linha Ferroviária Oeste. <br> <b class='ponto'>&rarr;</b> Linha Sado: opera entre o Barreiro e Praias Sado A, utilizando partes do Alentejo, Linha Ferroviária e Linha do Sul </p> <p style='text-align: Center;'><br><b> Bilhetes</h4> </b></p> <p><b>Cartão 7 Colinas</b><br> Assim, quem viaja na Linha Azul em direção a Santa Apolónia - Amadora-Este, ou vice-versa, tem que comprar uma passagem de 2 zonas se a viagem for além da Estação Pontinha. O mesmo acontece na Linha Amarela, no sentido Rato - Odivelas, ou vice - versa, se a viagem for além do Senhor Roubado. A rede de metropolitano de Lisboa tem um grande número de bilhetes de transporte que permitem diferentes opções de transporte do passageiro. Para os clientes que utilizam com frequência o Metro estão disponíveis o Cartão 7 Colinas ou o Viva Viagem. A partir de 1 de fevereiro de 2012, as ´'Coroas foram aplicadas apenas aos Passes Urbanos, não sendo mais aplicadas a bilhetes únicos, com a cobrança de valor único, não se aplicando se o usuário ultrapassar ou não a 'Coroa L'. <br> </p> <p><b>Cartão 7 Colinas / Viva Viagem</b><br> O 7 Cartão Colinas / Viva Viagem é um bilhete para as empresas aderentes de transporte. Para o seu uso, é necessário carregar o cartão com o ticket pretendido, em qualquer lugar do metro de Lisboa. Este cartão tem um custo de 0,50 cêntimos e pode ser usado para viajar com a Carris, o Metro de Lisboa, Fertagus, CP, Transtejo e Soflusa.Os bilhetes podem ser carregados neste cartão, tanto para intermodal (modo Zapping, carregando o cartão com dinheiro, em euros), ou seja, aqueles que incluem mais de uma empresa, ou exclusivamente, como um simples bilhete subterrâneo que pode ser carregado para este cartão. Este cartão tem validade de um ano após ser carregado pela primeira vez e não poderá ser usado até o final do período. Num entanto, o dinheiro / bilhetes cobrado no cartão pode ser usado durante essa data.<br> </p> <p><b>Lisboa Viva</b><br> O cartão Lisboa Viva é um cartão de suporte a bilhetes, que permite a cobrança de bilhetes mensais, que podem ser utilizados exclusivamente no subsolo de Lisboa ou podem ser articulados com outros, como a Carris ou a CP.<br> </p>  <br><br> <h2 class='cbp' id='lol-sub-title'>Escritórios de Registo</h2> <p><b class='ponto'>&bull;</b> Escritórios de Registo é o nome dos serviços públicos onde registos de diferentes tipos são feitos, tais como: Registo Civil, Registo de Imóveis, Registo de Veículos e Registo Comercial..</p> <p>Com o Registo Central fica o Registo Central especial de Nacionalidade e o respectivo litígio, o Registo Central para Estado Civil e o Registo Central de Ações e Testamentos. Nos livros para o registo da nacionalidade são registados todos os factos que determinarão a atribuição, aquisição e perda da nacionalidade portuguesa. Com o Conservador do Registo Central encontra-se o poder de emitir pareceres sobre questões relativas à nacionalidade, bem como para emitir, a pedido das partes interessadas, certificados de nacionalidade portuguesa. Estabelece também o poder de registar a aquisição da nacionalidade portuguesa, ou integrá-las, se for feito nos Consulados Portugueses. </p> </div> </div> </div> </li> </ul>"); //conteudo/texto
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