// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {
	// Мини всплывающие окна
	$('.mini-modal__btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.mini-modal__modal').removeClass('_active')

			if ( $(window).width() < 1024 ) $('body').css('cursor', 'default')
		} else {
			$('.mini-modal__btn').removeClass('_active')
			$(this).addClass('_active')

			$('.mini-modal__modal').removeClass('_active')
			parent.find('.mini-modal__modal').addClass('_active')

			if ( $(window).width() < 1024 ) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.mini-modal') ) {
			$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')

			if ( $(window).width() < 1024 ) $('body').css('cursor', 'default')
		}
	})


	//
	if ($('.creators__slider').length) {
		new Swiper('.creators__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 12,
			slidesPerView: 2,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 12,
					slidesPerView: 2,
				},
				'480': {
					spaceBetween: 12,
					slidesPerView: 2,
				},
				'768': {
					spaceBetween: 12,
					slidesPerView: 4,
				},
				'1025': {
					spaceBetween: 30,
					slidesPerView: 4,
				},
				'1290': {
					spaceBetween: 30,
					slidesPerView: 5,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}


	//
	if ($('.page-category__slider').length) {
		new Swiper('.page-category__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 22,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			on: {
				lock: function (swiper) {
					$(swiper.el).addClass('_lock')
				},
				unlock: function (swiper) {
					$(swiper.el).removeClass('_lock')
				},
				reachBeginning: function (swiper) {
					$(swiper.el).addClass('_lock-left')
				},
				reachEnd: function (swiper) {
					$(swiper.el).addClass('_lock-right')
				},
				progress: function (swiper, progress) {
					console.log(progress)
					if (progress != 0) {
						$(swiper.el).removeClass('_lock-left')
					} else if (progress == 0){
						$(swiper.el).addClass('_lock-left')
					}
					
					if (progress != 1) {
						$(swiper.el).removeClass('_lock-right')
					} else if (progress == 1){
						$(swiper.el).addClass('_lock-right')
					}
				}
			}
		})
	}
})


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})