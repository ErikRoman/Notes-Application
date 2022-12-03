// Render the notes
// Wire up searchText
// Wire up sortBy
// Wire up create note button
// Set up syncing across web page


import { setFilters } from "../Source/filters";
import { createNote, loadNotes } from "../Source/notes";
import { renderNotes } from "../Source/views";


renderNotes()


document.querySelector( '#search-text' ).addEventListener( 'input', ( event ) => {
  setFilters( {
    searchText: event.target.value
  } )

  renderNotes()
} )


document.querySelector( '#filter-by' ).addEventListener( 'change', ( event ) => {
  setFilters( {
    sortBy: event.target.value
  } )

  renderNotes()
} )


document.querySelector( '#create-note' ).addEventListener( 'click', () => {
  const id = createNote()

  location.assign( `/edit.html#${id}` )
} )


window.addEventListener( 'storage', ( event ) => {
  if ( event.key === 'notes' ) {
    loadNotes()
    renderNotes()
  }
} )