import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import styles from './Swiper.module.scss'
import { bannerSlides } from './content'

export default function MySwiper() {
	return (
		<div className={styles['swiper-container']}>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={10}
				slidesPerView={1}
				pagination={{
					clickable: true,
					el: 'custom-pagination',
				}}
				onSwiper={swiper => console.log(swiper)}
				onSlideChange={() => console.log('slide change')}
			>
				{bannerSlides.map(slide => (
					<SwiperSlide key={slide.id}>
						<div className={styles['swipe-img']}>
							<img src={slide.src} alt={slide.alt} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className='custom-pagination'></div>
		</div>
	)
}
