import { removeNote, updateNote } from '../Source/notes.js'
import { generateLastEdited, initializeEditPage } from './views.js'




const titleElement = document.querySelector( '#note-title' )
const bodyElement = document.querySelector( '#note-body' )
const removeElement = document.querySelector( '#remove-note' )
const dateElement = document.querySelector( '#last-edited' )
const noteId = location.hash.substring( 1 )


initializeEditPage( noteId )


titleElement.addEventListener( 'input', ( event ) => {
  const note = updateNote( noteId, {
    title: event.target.value
  } )
  dateElement.textContent = generateLastEdited( note.updatedAt )
} )

bodyElement.addEventListener( 'input', ( event ) => {
  const note = updateNote( noteId, {
    body: event.target,value
  } )
  dateElement.textContent = generateLastEdited( note.updatedAt )
} )

removeElement.addEventListener( 'click', ( event ) => {
  removeNote( noteId )
  location.assign( '/index.html' )
} )

window.addEventListener( 'storage', ( event ) => {
  if ( event.key === 'notes' ) {
    initializeEditPage( noteId )
  }
} )