var Paper = React.createClass({
  componentDidMount: function() {
    this.paperX = -5000;
    this.paperY = -3000;
    this.zoom = 1;
  },

  getInitialState: function() {
    this.paperX = -5000;
    this.paperY = -3000;
    this.zoom = 1;

    var matrix = 'matrix(' + this.zoom + ', 0, 0, ' + this.zoom + ', ' + this.paperX.toFixed() + ', ' +
          this.paperY.toFixed()  + ')';
    return { notes: [], matrix: matrix };
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
      this.insertNote(event.pageX - this.paperX, event.pageY - this.paperY);
    }
  },

  mouseMove: function(event) {
    if (this.isDragging) {
      this.hasDragged = true;
      var dx = this.clickX - event.pageX;
      var dy = this.clickY - event.pageY;

      this.paperX = Math.abs((this.paperX) - dx);
      this.paperX = Math.min(10000 - document.body.offsetWidth,
          Math.max(0, this.paperX)) * -1;
      this.paperY = Math.abs((this.paperY) - dy);
      this.paperY = Math.min(6000 - document.body.offsetHeight,
          Math.max(0, this.paperY)) * -1;

      var matrix = 'matrix(' + this.zoom + ', 0, 0, ' + this.zoom + ', ' + this.paperX.toFixed() + ', ' +
          this.paperY.toFixed()  + ')';
      this.setState({ matrix: matrix });

      this.clickX = event.pageX;
      this.clickY = event.pageY;
    }
  },

  insertNote: function(x, y) {
    var matrix = 'matrix(' + this.zoom + ', 0, 0, ' + this.zoom + ', ' + x + ', ' + y + ')';
    var notesCount = this.state.notes.length;
    var attrs = { matrix: matrix, key: notesCount };
    this.setState({ notes: this.state.notes.concat([attrs]) });
  },

  zoomUp: function() {
    this.zoom += 0.25
    var matrix = 'matrix(' + this.zoom + ', 0, 0, ' + this.zoom + ', ' + this.paperX.toFixed() + ', ' + this.paperY.toFixed()  + ')';
    this.setState({ matrix: matrix });
  },

  zoomDown: function() {
    this.zoom -= 0.25
    var matrix = 'matrix(' + this.zoom + ', 0, 0, ' + this.zoom + ', ' + this.paperX.toFixed() + ', ' + this.paperY.toFixed()  + ')';
    this.setState({ matrix: matrix });
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
                matrix={note.matrix}>Hello</Note>
            })
          }
        </div>
        <div className="zoom-control">
          <a onClick={this.zoomUp}>Zoom Up</a>
          <br/>
          <a onClick={this.zoomDown}>Zoom Down</a>
        </div>
      </div>
    );
  }
});
