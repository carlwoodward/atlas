var Note = React.createClass({
  componentDidMount: function() {
    this.attrs = this.props;
  },

  getInitialState: function() {
    return {
      cssClass: 'note'
    };
  },

  setAttrs: function(updatedAttrs) {
    Object.keys(updatedAttrs).forEach(function(key) {
      this.attrs[key] = updatedAttrs[key];
    }.bind(this));
  },

  mouseDown: function(event) {
    event.stopPropagation();
    this.isDragging = true;
    this.hasDragged = false;
    this.clickX = event.pageX;
    this.clickY = event.pageY;
    this.updateCssState();
  },

  mouseUp: function(event) {
    event.stopPropagation();
    this.isDragging = false;
    this.updateCssState();
    if (!this.hasDragged) {
      this.setAttrs({ isEditing: true });
      EventBus.emitEvent('update-note', [this.attrs]);
      this.change();
    }
  },

  mouseMove: function(event) {
    event.stopPropagation();
    if (this.isDragging) {
      this.hasDragged = true;

      var dx = this.clickX - event.pageX;
      var dy = this.clickY - event.pageY;

      this.setAttrs({ x: this.props.x - dx, y: this.props.y - dy });

      this.updateMatrixState();

      this.clickX = event.pageX;
      this.clickY = event.pageY;
      this.updateCssState();
    }
  },

  updateCssState: function() {
    if (this.isDragging) {
      this.setState({ cssClass: 'note dragging' });
    } else {
      this.setState({ cssClass: 'note' });
    }
  },

  updateMatrixState: function() {
    var matrix = 'translate(' +
        this.attrs.x.toFixed() + 'px, ' +
        this.attrs.y.toFixed()  + 'px)';
    this.setAttrs({ matrix: matrix });
    EventBus.emitEvent('update-note', [this.attrs]);
  },

  blur: function() {
    var content = this.getDOMNode().value;
    if (content === '') {
      EventBus.emitEvent('delete-note', [this.props.id]);
    } else {
      var attrs = { isEditing: false, content: content };
      this.setAttrs(attrs);
      EventBus.emitEvent('update-note', [this.attrs]);
    }
  },

  change: function() {
    var node = this.getDOMNode();
    node.style.height = 'auto';
    node.style.height = node.scrollHeight + 'px';
  },

  keyUp: function(event) {
    if (event.keyCode === 27) {
      this.blur();
    }
  },

  render: function() {
    if (this.props.isEditing) {
      return (
        <textarea className="note"
          style={{transform: this.props.matrix, '-webkit-transform': this.props.matrix}}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onBlur={this.blur}
          onChange={this.change}
          onKeyUp={this.keyUp}>
          {this.props.content}
        </textarea>
      );
    } else {
      var val = this.props.content;
      return (
        <div className={this.state.cssClass}
          style={{transform: this.props.matrix, '-webkit-transform': this.props.matrix}}
          onMouseDown={this.mouseDown}
          onMouseMove={this.mouseMove}
          onMouseUp={this.mouseUp}
          dangerouslySetInnerHTML={{__html: marked(val, { sanitize: true })}}>
        </div>
      );
    }
  }
});
