import { setFilters } from '../Source/filters.js'
import { createNote, loadNotes } from '../Source/notes.js'
import { renderNotes } from './views.js'


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