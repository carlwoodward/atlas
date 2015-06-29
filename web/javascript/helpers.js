var Helpers = {
  merge: function(original, next) {
    var combined = {};
    Object.keys(original).forEach(function(key) {
      combined[key] = original[key];
    });
    Object.keys(next).forEach(function(key) {
      combined[key] = next[key];
    });
    return combined;
  },

  stopEditing: function(notes) {
    notes.forEach(function(note) {
      note.isEditing = false;
    });
  }
};
