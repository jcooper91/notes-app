'strict mode'

const getSavedNotes = () => {
    let notesJSON = localStorage.getItem('notes')
    return notesJSON ? JSON.parse(notesJSON) : []
}

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const removeNote = (id) => {
    const findNote = notes.findIndex((note) => note.id === id)
    
    if(findNote > -1) {
        notes.splice(findNote, 1)
    }
}


// generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl   = document.createElement('a')
    const textEl   = document.createElement('p')
    const statusEl    = document.createElement('p')

    if(note.title.length > 0) {
        textEl.textContent = note.title;    
    } else {
        textEl.textContent = 'Unnamed title'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl);

    // setup link
    noteEl.setAttribute('href', `./edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // setup status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl;
}

// sort notes by the 3 options/dropdown
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if(sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    }  else if(sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    const notesEl = document.querySelector('#notes')
    
    notesEl.innerHTML = '';

    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const newEl = generateNoteDOM(note)
            document.querySelector('#notes').appendChild(newEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to display'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

}

// Generate last edited 
const generateLastEdited = (timestamp) => {
    return `Lasted Edited ${moment(timestamp).fromNow()}`;
}