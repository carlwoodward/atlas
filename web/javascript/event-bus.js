(function() {
  window.EventBus = new EventEmitter();

  var mapsKey = 'maps';

  window.fetchMaps = function() {
    return JSON.parse(localStorage.getItem(mapsKey) || '[]').sort();
  };

  var storeMap = function(name) {
    var maps = fetchMaps();
    if (maps.indexOf(name) === -1) {
      maps.push(name);
      localStorage.setItem(mapsKey, JSON.stringify(maps));
    }
  };

  var map = (window.location.hash || 'blank').replace('#', '');
  var notesKey = map + '-notes';
  storeMap(map);

  window.onhashchange = function(event) {
    event.preventDefault();
    map = (window.location.hash || 'blank').replace('#', '');
    notesKey = map + '-notes';
    storeMap(map);
    EventBus.emitEvent('reload');
  };

  window.fetchNotes = function() {
    var notes = JSON.parse(localStorage.getItem(notesKey)) || [];
    if (notes.length === 0 && notesKey === 'blank-notes') {
      return [{
        "matrix":"translate(5487px, 3211px)",
        "id":0,
        "key":0,
        "isEditing":false,
        "x":5487,
        "y":3211,
        "content":"# Atlas - Evernote + Google Maps\n\n- Please use in Chrome\n- Click anywhere to add a new note\n- Click on a note to edit it\n- Enter __markdown__ text into a note\n- Click away or tab out to finish editing\n- Drag a note to move it\n- Create new boards using search\n- To remove a note delete its content",
        "className":"note"
      }];
    } else {
      return notes;
    }
  };

  EventBus.addListener('create-note', function(note) {
    var notes = fetchNotes();
    notes.push(note);
    localStorage.setItem(notesKey, JSON.stringify(notes));
    EventBus.emitEvent('reload-notes');
  });

  EventBus.addListener('update-note', function(changedNote) {
    var notes = fetchNotes();
    notes.forEach(function(note, index) {
      if (note.id === changedNote.id) {
        Object.keys(changedNote).forEach(function(key) {
          note[key] = changedNote[key];
        });
      }
    });
    localStorage.setItem(notesKey, JSON.stringify(notes));
    EventBus.emitEvent('reload-notes');
  });

  EventBus.addListener('delete-note', function(id) {
    var notes = fetchNotes().filter(function(note) {
      return note.id !== id;
    });
    localStorage.setItem(notesKey, JSON.stringify(notes));
    EventBus.emitEvent('reload-notes');
  });

  EventBus.addListener('stop-editing-note', function(id) {
    var notes = fetchNotes().map(function(note) {
      note.isEditing = false;
      return note;
    });
    localStorage.setItem(notesKey, JSON.stringify(notes));
    EventBus.emitEvent('reload-notes');
  });
})();
