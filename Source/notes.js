// create loadNotes, saveNotes, getNotes, createNote, removeNote, sortNotes, updateNote function
// loadNotes at the end to read the existing note from local storage


import uuidv4 from 'uuid/v4'
import moment from 'moment'


let notes = []


// Read existing notes from local storage
const loadNotes = () => {
  const notesJSON = location.getItem( 'notes' )

  try {
    notes = notesJSON ? JSON.parse( notesJSON ) : []
  } catch ( e ) {
    notes = []
  }
}


// Save notes to local storage
const saveNotes = () => {
  location.setItem( 'notes', JSON.stringify( notes ) )
}


// Expose notes from module
const getNotes = () => notes

const createNote = () => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  notes.push( {
    id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp
  } )

  saveNotes()

  return id
}


// Remove a note
const removeNote = ( id ) => {
  const noteIndex = notes.findIndex( ( note ) => note.id === id )

  if ( noteIndex > -1 ) {
    notes.splice( noteIndex, 1 )
    saveNotes()
  }
}


// Sort notes by 1 of 3 ways
const sortNotes = ( sortBy ) => {
  if ( sortBy === 'byEdited' ) {
    return notes.sort ( (a, b) => {
      if ( a.updatedAt > b.updatedAt ) {
        return -1
      } else if ( a.updatedAt < b.updatedAt ) {
        return 1
      } else {
        return 0
      }
    } )
  } else if ( sortBy === 'byCreated' ) {
    return notes.sort ( (a, b) => {
      if ( a.createdAt > b.createdAt ) {
        return -1
      } else if ( a.createdAt < b.createdAt ) {
        return 1
      } else {
        return 0
      }
    } )
  } else if ( sortBy = 'alphabetical' ) {
    return notes.sort ( (a, b) => {
      if ( a.title.toLowerCase() < b.title.toLowerCase() ) {
        return -1
      } else if ( a.title.toLowerCase() > b.title.toLowerCase() ) {
        return 1
      } else {
        return 0
      }
    } )
  } else {
    return notes
  }
}


// Update note title
const updateNote = ( id, updates ) => {
  const note = notes.find( ( note ) => note.id === id )

  if ( !note ) {
    return
  }

  if ( typeof updates.title === 'string' ) {
    note.title = updates.title
    note.updatedAt = moment().valueOf()
  }

  if ( typeof updates.body === 'string' ) {
    note.body = updates.body
    note.updatedAt = moment().valueOf()
  }

  saveNotes()

  return note
}


loadNotes()


export { loadNotes, getNotes, createNote, removeNote, sortNotes, updateNote }