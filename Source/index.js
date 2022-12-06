// Render the notes
// Wire up searchText
// Wire up sortBy
// Wire up create note button
// Set up syncing across web page

import { setFilters } from "../Source/filters";
import { createNote, loadNotes } from "../Source/notes";
import { renderNotes } from "../Source/views";


renderNotes()


// Wire up searchText
document.querySelector( '#search-text' ).addEventListener( 'input', ( event ) => {
  setFilters( {
    searchText: event.target.value
  } )
  renderNotes()
} )


// Wire up sortBy
document.querySelector( '#filter-by' ).addEventListener( 'change', ( event ) => {
  setFilters( {
    sortBy: event.target.value
  } )
  renderNotes()
} )


// Wire up create note button
document.querySelector( '#create-note' ).addEventListener( 'click', ( event ) => {
  const id = createNote()
  location.assign( `/edit.html#${id}` )
} )


// Set up syncing across web page
window.addEventListener( 'storage', ( event ) => {
  if ( event.key === 'notes' ) {
    loadNotes()
    renderNotes()
  }
} )