// Initialize edit page
// Wire up title input and body input with date
// Wire up remove button
// Set up syncing across web page

import { removeNote, updateNote } from "../Source/notes"
import { generateLastEdited, initializeEditPage } from "../Source/views"


const titleElement = document.querySelector( '#note-title' )
const bodyElement = document.querySelector( '#note-body' )
const dateElement = document.querySelector( '#last-edited' )
const removeElement = document.querySelector( '#remove-note' )
const noteId = location.hash.substring( 1 )


initializeEditPage( noteId )


// Wire up title input
titleElement.addEventListener( 'input', ( event ) => {
  const note = updateNote( noteId, {
    title: event.target.value
  } )

  dateElement.textContent = generateLastEdited( note.updatedAt )
} )


// Wire up body input
bodyElement.addEventListener( 'input', ( event ) => {
  const note = updateNote( noteId, {
    body: event.target.value
  } )

  dateElement.textContent = generateLastEdited( note.updatedAt )
} )


// Wire up remove button
removeElement.addEventListener( 'click', () => {
  removeNote( noteId )

  location.assign( '/index.html' )
} )


// Set up syncing across web page
window.addEventListener( 'storage', ( event ) => {
  if ( event.key === 'notes' ) {
    initializeEditPage( noteId )
  }
} )