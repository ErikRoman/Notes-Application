// Initialize edit page
// Wire up title input and body input with date
// Wire up remove button
// Set up syncing across web page

import { updateNote, removeNote } from "../Source/notes"
import { generateLastEdited, initializeEditPage } from "../Source/views"


const noteTitle = document.querySelector( '#note-title' )
const noteBody = document.querySelector( '#note-body' )
const removeEl = document.querySelector( '#remove-note' )
const dateElement = document.querySelector( '#last-edited' )
const noteId = location.hash.substring( 1 )


initializeEditPage( noteId )


// Wire up title input
noteTitle.addEventListener( 'input', ( event ) => {
  const note = updateNote( noteId, {
    title: event.target.value
  } )
  dateElement.textContent = generateLastEdited( note.updatedAt )
} )


// Wire up body input
noteBody.addEventListener( 'input', ( event ) => {
  const note = updateNote( noteId, {
    body: event.target.value
  } )
  dateElement.textContent = generateLastEdited( note.updatedAt )
} )


// Wire up remove button
removeEl.addEventListener( 'click', () => {
  removeNote( noteId )
  location.assign( '/index.html' )
} )


// Set up syncing across web page
window.addEventListener( 'storage', ( event ) => {
  if ( event.key === 'notes' ) {
    initializeEditPage( noteId )
  }
} )