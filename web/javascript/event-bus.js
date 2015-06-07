(function() {
  window.EventBus = new EventEmitter();

  var notesKey = 'notes';
  var fetchNotes = function() {
    return JSON.parse(localStorage.getItem(notesKey)) || [];
  };

  EventBus.addListener('create-note', function(note) {
    var notes = fetchNotes();
    notes.push(note);
    localStorage.setItem(notesKey, JSON.stringify(notes));
    return true;
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
    return true;
  });
})();
