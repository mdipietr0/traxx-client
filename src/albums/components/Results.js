import React from 'react'
import Album from './Album'
import Loading from './Loading'
import '../styles/AlbumsIndex.scss'

const Results = (props) => {
  let { results } = props
  const { flash, isLoading } = props
  results = (!isLoading && results) && results.data.results
    .map(({ id, title, cover_image }) => (
      <Album
        flash={props.flash}
        isResults={true}
        key={id}
        user={props.user}
        id={id}
        title={title}
        cover_image={cover_image}
        className='album-thumb mb-auto m-1 display-box shadow'
      />
    ))

  return (
    <div className="container-fluid mt-5">
      <div className="d-flex flex-wrap justify-content-center">
        {(!isLoading) ? results : <Loading />}
      </div>
    </div>
  )
}

export default Results
