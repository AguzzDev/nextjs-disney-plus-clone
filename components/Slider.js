import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  Navigation
} from 'swiper'
import Link from 'next/link'

SwiperCore.use([Navigation])

export function Slider ({ videos }) {
  return (
    <>
      <Swiper
        breakpoints={{
          300: {
            slidesPerView: 2,
            slidesPerGroup: 2
          },
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5
          }
        }}
        navigation
        spaceBetween={30}
      >
        {videos.map(({ id, slug, thumbnail }) => (
          <SwiperSlide key={id} className='mt-5'>
            <Link href={slug}>
              <div className='cursor-pointer h-[200px]'>
                <img src={thumbnail.url} className='w-full h-full bg-cover rounded-xl' />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export function SliderCompanies ({ videos }) {
  return (
    <>
      <Swiper
        breakpoints={{
          300: {
            slidesPerView: 2,
            slidesPerGroup: 2
          },
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5
          }
        }}
        spaceBetween={30}
      >
        {videos.map(({ id, slug, thumbnail }) => (
          <SwiperSlide key={id} className='mt-5'>
            <Link href={`producers/${slug}`}>
              <div className='cursor-pointer h-[200px] bg-gradient-to-t to-[#323542] from-[#040818] rounded-xl border-2 border-gray-800'>
                <img src={thumbnail.url} className='mx-auto w-40 h-52 object-contain rounded-xl' />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
