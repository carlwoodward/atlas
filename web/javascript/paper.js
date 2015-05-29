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

      if (this.paperX === undefined) this.paperX = -5000;
      if (this.paperY === undefined) this.paperY = -3000;

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

  render: function() {
    return (
      <div className="paper"
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMouseMove={this.mouseMove}>
        <h1>Hello</h1>
      </div>
    );
  }
});
