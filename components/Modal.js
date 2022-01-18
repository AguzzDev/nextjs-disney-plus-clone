import Modal from 'react-modal'
import axios from 'axios'
import { useState, useRef, useEffect } from 'react'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    border: '0px',
    borderRadius: '0px',
    width: '80vw',
    background: 'transparent'
  }
}

Modal.setAppElement('#__next')
export default function ModalVideo ({ videos }) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const ref = useRef()

  const handleChangeSeen = async (slug) => {
    await axios.post('/api/changeSeen', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: slug
    })
  }

  function openModal () {
    setIsOpen(true)
  }

  function closeModal () {
    setIsOpen(false)
  }
  useEffect(() => {
    if (ref.current === undefined) {
      return null
    } else {
      if (ref.current.currentTime === ref.current.duration) { handleChangeSeen(videos.slug) }
    }
  }, [ref])

  return (
    <div>
      <button className='rounded-xl bg-[#040714] py-3 px-5 font-bold' onClick={openModal}>Ver trailer</button>
      {videos.seen && <span className='font-bold ml-3'>VISTO</span>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName='bg-modal'
      >
        {!videos.mp4
          ? <div className='flex items-center justify-center p-5 bg-black h-[50vh]'>
            <h1 className='text-2xl'>No hay trailer para esta pelicula</h1>
          </div>
          : <video autoPlay controls ref={ref}>
            <source src={videos.mp4.url} />
          </video>}
      </Modal>
    </div>
  )
}
