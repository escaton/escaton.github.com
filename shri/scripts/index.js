$('HTML').addClass('JS');

$(document).ready(function() {
	
		
	
	$('.tabs_form .tab')
		.mouseenter(function() {
				if (!$(this).hasClass('tab_active')) $(this).animate({"margin-top":0}, 100);
			})
		.mouseleave(function() {
				if (!$(this).hasClass('tab_active')) $(this).animate({"margin-top":3}, 100);
			})
		.click(function() {
			if (!$(this).hasClass('tab_active')) {
				
				$('.form_active')
					.fadeOut(200)
					.removeClass('form_active');
				$($(this).find('a').attr('href'))
					.next()
					.fadeIn(200)
					.addClass('form_active');
				
				if ($(this).next().length == 0) {
					$('.next', $('.overlay')).addClass('disabled');
				} else {
					$('.next', $('.overlay')).removeClass('disabled');
				}
				
				if ($(this).prev().length == 0) {
					$('.prev', $('.overlay')).addClass('disabled');
				} else {
					$('.prev', $('.overlay')).removeClass('disabled');
				}
				
				$('.tabs_form .tab_active')
					.animate({"margin-top":0}, 200)
					.animate({"margin-right":0}, 200)
					.animate({"margin-right":-20}, 200)
					.animate({"margin-top":3}, 200);
					
				$(this)
					.animate({"margin-top":0}, 200)
					.animate({"margin-right":0}, 200, function() {
							$('.tabs_form .tab_active').removeClass('tab_active');
							$('a[href='+$(this).find('a').attr('href')+']').parent().addClass('tab_active');
						})
					.animate({"margin-right":-20}, 200)
					.animate({"margin-top":3}, 200);
			}
			return false;
			});
			
	$('.tabs_code .tab')
		.click(function() {
			if (!$(this).hasClass('tab_active')) {
				$(this)
					.parent()
					.find('.tab_active')
					.removeClass('tab_active');
					
				var i = $(this).parent().children().index(this);
				$(this)
					.addClass('tab_active')
					.parent()
					.nextAll('.code_active')
					.removeClass('code_active')
					.end()
					.nextAll('.code')
					.eq(i)
					.addClass('code_active');
					
			}
			})
			
	$('.form_code')
		.each(function() {
			$(this).find('.tab').each(function() {
				
				var i = $(this).parent().children().index($(this));
				$(this)
					.parent()
					.nextAll('.code')
					.eq(i)
					.children('pre')
					.children('code')
					.load($(this).children('a').attr("href"), function(data) {
						$(this)
							.text(data.replace("<","<").replace(">",">"))
							// ужас, но единственное, что помогает правильно раскрасить код в IE7-8
							.animate({}, function() {
									hljs.highlightBlock($(this).get(0), null, false);
								});
					});
			})
		});
	
	var form_container_offsetTop = $('.form_container').offset().top;
	
	$(window).scroll(function() {
			if ($(window).scrollTop() > form_container_offsetTop) {
				$('.overlay:hidden').fadeIn(200);
			} else {
				$('.overlay:visible').fadeOut(200);
			}
		});
	
	$('.next', $('.overlay'))
		.click(function() {
				$('.overlay:visible').fadeOut(200, function() {
					$('.tabs_form')
						.eq(0)
						.children('.tab_active')
						.next()
						.click();
					$(window).scrollTop(0);
				});
				return false;
			});
			
	$('.prev', $('.overlay'))
		.click(function() {
				$('.overlay:visible').fadeOut(200, function() {
					$('.tabs_form')
						.eq(0)
						.children('.tab_active')
						.prev()
						.click();
					$(window).scrollTop(0);
				});
				return false;
			})
		
	$('.nav_tab')
		.mouseenter(function() {
			if ($(this).hasClass('prev')) {
				$(this).stop().animate({"left":-60}, 100);
			} else {
				$(this).stop().animate({"right":-60}, 100);				
			}			
		})
		.mouseleave(function() {
			if ($(this).hasClass('prev')) {
				$(this).stop().animate({"left":-50}, 100);
			} else {
				$(this).stop().animate({"right":-50}, 100);				
			}	
		});
		
	
});
