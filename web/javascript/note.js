var Note = React.createClass({
  getInitialState: function() {
    return {
      isEditing: this.props.isEditing,
      content: this.props.content,
      matrix: this.props.matrix,
      id: this.props.id
    };
  },

  mouseDown: function(event) {
    event.stopPropagation();
    this.setState({ isEditing: true });
    this.change();
  },

  mouseUp: function(event) {
    event.stopPropagation();
  },

  blur: function(event) {
    var content = this.getDOMNode().value;
    var attrs = { isEditing: false, content: content };
    this.setState(attrs);
    var currentState = this.state;
    for (var key in attrs) { currentState[key] = attrs[key]; }
    EventBus.emitEvent('update-note', [currentState]);
  },

  change: function() {
    var node = this.getDOMNode();
    node.style.height = 'auto';
    node.style.height = node.scrollHeight + 'px';
  },

  render: function() {
    if (this.state.isEditing) {
      return (
        <textarea className="note"
          style={{transform: this.props.matrix}}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onBlur={this.blur}
          onChange={this.change}>
          {this.state.content}
        </textarea>
      );
    } else {
      var val = this.state.content;
      return (
        <div className="note"
          style={{transform: this.props.matrix}}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          dangerouslySetInnerHTML={{__html: marked(val, { sanitize: true })}}>
        </div>
      );
    }
  }
});
