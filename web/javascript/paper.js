var Paper = React.createClass({
  mouseDown: function(event) {
    this.isDragging = true;
    this.clickX = event.pageX;
    this.clickY = event.pageY;
    console.log('down');
  },

  mouseUp: function(event) {
    this.isDragging = false;
  },

  mouseMove: function(event) {
    if (this.isDragging) {
      var dx = this.clickX - event.pageX;
      var dy = this.clickY - event.pageY;
      this.paperX = (this.paperX || 0) - dx;
      this.paperY = (this.paperY || 0) - dy;
      var matrix = 'matrix(1, 0, 0, 1, ' + this.paperX.toFixed() + ', ' +
          this.paperY.toFixed()  + ')';
      document.querySelector('.paper').style.webkitTransform = matrix;
      this.clickX = event.pageX;
      this.clickY = event.pageY;
    }
  },

  render: function() {
    return (
      <div className="paper" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove}>
        <h1>Hello</h1>
      </div>
    );
  }
});
