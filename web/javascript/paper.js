var Paper = React.createClass({
  componentDidMount: function() {
    this.paperX = -5000;
    this.paperY = -3000;
  },

  getInitialState: function() {
    return { notes: [] };
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

      var paper = document.querySelector('.paper');
      var matrix = 'matrix(1, 0, 0, 1, ' + this.paperX.toFixed() + ', ' +
          this.paperY.toFixed()  + ')';
      paper.style.webkitTransform = matrix;

      this.clickX = event.pageX;
      this.clickY = event.pageY;
    }
  },

  insertNote: function(x, y) {
    var matrix = 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')';
    this.setState({ notes: this.state.notes.concat([{ matrix: matrix }]) });
  },

  render: function() {
    return (
      <div className="paper"
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMouseMove={this.mouseMove}>
        {
          this.state.notes.map(function(note) {
            return <div className="note" style={{transform: note.matrix}}>Hello</div>;
          })
        }
      </div>
    );
  }
});
