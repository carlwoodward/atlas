var Paper = React.createClass({
  width: 10000,
  height: 6000,

  componentDidMount: function() {
    var reload = function() {
      this.setState({ notes: [] });
      this.setState({ notes: fetchNotes() });
    }.bind(this);
    EventBus.addListener('reload', reload);
  },

  getInitialState: function() {
    this.paperX = this.width / -2;
    this.paperY = this.height / -2;
    this.zoom = 1;
    this.zoomAmount = 0.1;

    var matrix = 'scale(' + this.zoom + ') translate(' +
        this.paperX.toFixed() + 'px, ' + this.paperY.toFixed()  + 'px)';

    var notes = fetchNotes();
    return { notes: notes, matrix: matrix };
  },

  mouseDown: function(event) {
    this.isDragging = true;
    this.hasDragged = false;
    this.clickX = event.pageX;
    this.clickY = event.pageY;
  },

  mouseUp: function(event) {
    this.isDragging = false;
    if (this.hasDragged !== true) { // click rather then drag
      var differenceToOne = Math.abs(1 - this.zoom);
      this.insertNote((event.clientX / this.zoom) + Math.abs(this.paperX),
                      (event.clientY / this.zoom) + Math.abs(this.paperY));
    }
  },

  mouseMove: function(event) {
    if (this.isDragging) {
      this.hasDragged = true;
      var dx = this.clickX - event.pageX;
      var dy = this.clickY - event.pageY;

      this.paperX = Math.abs((this.paperX) - dx);
      this.paperX = Math.min(this.width - document.body.offsetWidth,
          Math.max(0, this.paperX)) * -1;
      this.paperY = Math.abs((this.paperY) - dy);
      this.paperY = Math.min(this.height - document.body.offsetHeight,
          Math.max(0, this.paperY)) * -1;

      this.updateMatrixState();

      this.clickX = event.pageX;
      this.clickY = event.pageY;
    }
  },

  updateMatrixState: function() {
    var matrix = 'scale(' + this.zoom + ') translate(' +
        this.paperX.toFixed() + 'px, ' +
        this.paperY.toFixed()  + 'px)';
    this.setState({ matrix: matrix });
  },

  insertNote: function(x, y) {
    var matrix = 'translate(' + x + 'px, ' + y + 'px)';
    var notesCount = this.state.notes.length;
    var attrs = {
      matrix: matrix,
      id: notesCount,
      key: notesCount,
      isEditing: true,
      content: ''
    };
    this.setState({ notes: this.state.notes.concat([attrs]) });
    EventBus.emitEvent('create-note', [attrs]);
  },

  zoomUp: function() {
    this.zoom += this.zoomAmount;
    this.updateMatrixState();
  },

  zoomDown: function() {
    this.zoom -= this.zoomAmount;
    this.updateMatrixState();
  },

  render: function() {
    return (
      <div>
        <div className="paper"
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onMouseMove={this.mouseMove}
          style={{transform: this.state.matrix}}>
          {
            this.state.notes.map(function(note) {
              return <Note className="note"
                key={note.key}
                id={note.id}
                isEditing={note.isEditing}
                matrix={note.matrix}
                content={note.content}></Note>
            })
          }
        </div>
        <div className="zoom-control">
          <a onClick={this.zoomUp}>+</a>
          <hr />
          <a onClick={this.zoomDown}>&ndash;</a>
        </div>
      </div>
    );
  }
});
