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

  var map = (window.location.hash || 'carlwoodward').replace('#', '');
  var notesKey = map + '-notes';
  storeMap(map);

  window.onhashchange = function(event) {
    event.preventDefault();
    map = (window.location.hash || 'carlwoodward').replace('#', '');
    notesKey = map + '-notes';
    storeMap(map);
    EventBus.emitEvent('reload');
  };

  window.fetchNotes = function() {
    return JSON.parse(localStorage.getItem(notesKey)) || [];
  };

  EventBus.addListener('create-note', function(note) {
    var notes = fetchNotes();
    notes.push(note);
    localStorage.setItem(notesKey, JSON.stringify(notes));
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
  });

  EventBus.addListener('delete-note', function(id) {
    var notes = fetchNotes().filter(function(note) {
      return note.id !== id;
    });
    localStorage.setItem(notesKey, JSON.stringify(notes));
  });
})();
