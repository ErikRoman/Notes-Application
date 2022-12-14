// Create generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage fucntions


import { getFilters } from "../Source/filters"
import { getNotes, sortNotes } from "../Source/notes"
import moment from 'moment'


// Generate DOM structure for one note
const generateNoteDOM = ( note ) => {
  const noteEl = document.createElement( 'a' )
  const textEl = document.createElement( 'p' )
  const statusEl = document.createElement( 'p' )

  // Set up link
  noteEl.setAttribute( 'href', `/edit.html#${note.id}` )
  noteEl.classList.add( 'list-item' )

  // Set up the text title to appear in noteEl
  if ( note.title.length > 0 ) {
    textEl.textContent = note.title
  } else {
    textEl.textContent = 'Unnamed note'
  }
  noteEl.appendChild( textEl )
  textEl.classList.add( 'list-item__title' )

  // Set up the status message
  statusEl.textContent = generateLastEdited( note.updatedAt )
  noteEl.appendChild( statusEl )
  statusEl.classList.add( 'list-item__subtitle' )

  return noteEl 
}


// Render notes to application
const renderNotes = () => {
  const notesEl = document.querySelector( '#notes' )
  const filters = getFilters()
  const notes = sortNotes( filters.sortBy )
  const filteredNotes = notes.filter( ( note ) => note.title.toLowerCase().includes( filters.searchText.toLowerCase() ) )

  notesEl.innerHTML = ''

  if ( filteredNotes.length > 0 ) {
    filteredNotes.forEach( ( note ) => {
      const noteEl = generateNoteDOM( note )
      notesEl.appendChild( noteEl )
    } )
  } else {
    const emptyMessage = document.createElement( 'p' )
    emptyMessage.textContent = 'No notes to show'
    notesEl.appendChild( emptyMessage )
    emptyMessage.classList.add( 'empty-message' )
  }
}


// Generate last edited message
const generateLastEdited = ( timestamp ) => `Last edit ${ moment( timestamp ).fromNow() }`


// Initialize the edit page
const initializeEditPage = ( noteId ) => {
  const titleElement = document.querySelector( '#note-title' )
  const bodyElement = document.querySelector( '#note-body' )
  const dateElement = document.querySelector( '#last-edited' )

  const notes = getNotes()
  const note = notes.find( ( note ) => note.id === noteId )

  if ( !note ) {
    location.assign( '/index.html' )
  }

  titleElement.value = note.title
  bodyElement.value = note.body
  dateElement.textContent = generateLastEdited( note.updatedAt )
}


export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage }