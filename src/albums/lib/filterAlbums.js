export const filterAlbumsWithNoPic = results => (
  results.data.results
    .filter(album => !album.cover_image.includes('spacer.gif'))
    .map(album => {
      const {id, title, cover_image} = album
      return { id, title, cover_image }
    })
)
