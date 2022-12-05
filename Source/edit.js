// Initialize edit page
// Wire up title input and body input with date
// Wire up remove button
// Set up syncing across web page

import { removeNote, updateNote } from "../Source/notes";
import { generateLastEdited, initializeEditPage } from "../Source/views";


const noteText = document.querySelector( '#note-title' )
const bodyText = document.querySelector( '#note-body' )
const removeButton = document.querySelector( '#remove-note' )
const dateElement = document.querySelector( '#last-edited' )
const noteId = location.hash.substring( 1 )


initializeEditPage( noteId )


noteText.addEventListener( 'input', ( event ) => {
  const note = updateNote( noteId, {
    title: event.target.value
  } )
  dateElement.textContent = generateLastEdited( note.updatedAt )
} )


bodyText.addEventListener( 'input', ( event ) => {
  const note = updateNote( noteId, {
    body: event.target.value
  } )
  dateElement.textContent = generateLastEdited( note.updatedAt )
} )


removeButton.addEventListener( 'click', ( event ) => {
  removeNote( noteId )
  location.assign( '/index.html' )
} )


window.addEventListener( 'storage', ( event ) => {
  if ( event.key === 'notes' ) {
    initializeEditPage( noteId )
  }
} )