import Link from 'next/link'

export default function FrontPage ({ videos }) {
  const { id, slug, frontImage } = videos

  return (
    <Link key={id} href={slug}>
      <div className='cursor-pointer border-2 border-gray-800'>
        <img src={frontImage.url} className='w-full h-[280px]' />
      </div>
    </Link>
  )
}
