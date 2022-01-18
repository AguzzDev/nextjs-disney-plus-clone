const randomVideo = (videos) => {
  return videos[Math.floor(Math.random() * videos.length)]
}

const filterVideos = (videos, genre) => {
  return videos.filter((video) => video.tags.includes(genre))
}

const unSeenVideos = (videos) => {
  return videos.filter(video => video.seen == false || video.seen == null)
}

const dateFormat = (date) => {
  return date.split('-').splice(0, 1).join('')
}

const tagsFormat = (tags) => {
  return tags.filter(t => !t.includes('All')).join(', ')
}

const formatTitle = (videos) => {
  return videos[0]?.producers[0]?.split('-').join(' ').split('').join('').charAt(0).toUpperCase() + videos[0]?.producers[0]?.split('-').join('').split('').slice(1).join('')
}
export { randomVideo, filterVideos, unSeenVideos, dateFormat, tagsFormat, formatTitle }
