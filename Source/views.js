import { getFilters } from './filters.js'
import { getNotes, sortNotes } from './notes.js'
import moment from 'moment'


// Generate the DOM structure for a note
const generateNoteDom = ( note ) => {
  const noteEl = document.createElement( 'a' )
  const textEl = document.createElement( 'p' )
  const statusEl = document.createElement( 'p' )

  // Set up the text title
  if ( note.title.length > 0 ) {
    textEl.textContent = note.title
  } else {
    textEl.textContent = 'Unnamed note'
  }
  noteEl.appendChild( textEl )

  // Set up the link
  noteEl.setAttribute( 'href', `/edit.html${note.id}` )

  // Set up the status message
  statusEl.textContent = generateLastEdited( note.updatedAt )
  noteEl.appendChild( statusEl )

  return noteEl
}


// Render application notes
const renderNotes = () => {
  const notesEl = document.querySelector( '#notes' )
  const filters = getFilters()
  const notes = sortNotes( filters.sortBy )

  const filteredNotes = notes.filter( ( note ) => note.title.toLowerCase().include( filters.searchText.toLowerCase() ) )

  notesEl.innerHTML = ''

  if ( filteredNotes.length > 0 ) {
    filteredNotes.forEach( ( note ) => {
      const noteEl = generateNoteDom( note )
      notesEl.appendChild( noteEl )
    } )
  } else {
    const emptyMessage = document.createElement( 'p' )
    emptyMessage.textContent = 'No notes to show'
    notesEl.appendChild( emptyMessage )
  }
}


// Generate the last edited message
const generateLastEdited = ( timestamp ) => `Last edited ${moment( timestamp ).fromNow()}`


//initializingEditPage
const initializeEditPage = ( noteId ) => {
  const titleEl = document.querySelector( '#note-title' )
  const bodyEl = document.querySelector( '#note-body')
  const dateEl = document.querySelector( '#last edited' )

  const notes = getNotes()
  const note = notes.find( ( note ) => note.id === noteId )

  if ( !note ) (
    location.assign( '/index.html' )
  )

  titleEl.textContent = note.title
  bodyEl.textContent = note.body
  dateEl.textContent = generateLastEdited( note.updatedAt )
}
