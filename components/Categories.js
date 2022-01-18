import { Slider } from './Slider'

export default function Categories ({ genre, videos }) {
  return (
    <div className='w-full my-5'>
      {genre && <h1 className='text-3xl'>{genre}</h1>}

      <Slider videos={videos} />
    </div>
  )
}
