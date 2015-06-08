var Note = React.createClass({
  componentDidMount: function() {
    EventBus.addListener('stop-editing-note', this.stopEditing);
    EventBus.addListener('edit-note', this.stopEditingUnlessSelf);
  },

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
    EventBus.emitEvent('edit-note', [this.state.id]);
    setTimeout(function() { this.getDOMNode().focus(); }.bind(this), 100);
  },

  mouseUp: function(event) {
    event.stopPropagation();
  },

  stopEditing: function() {
    if (this.state.isEditing === true) {
      this.blur();
    }
  },

  stopEditingUnlessSelf: function(id) {
    if (this.state.id !== id) {
      this.stopEditing();
    }
  },

  blur: function() {
    var content = this.getDOMNode().value;
    if (content === '') {
      EventBus.emitEvent('delete-note', [this.state.id]);
    } else {
      var attrs = { isEditing: false, content: content };
      this.setState(attrs);
      var currentState = this.state;
      for (var key in attrs) { currentState[key] = attrs[key]; }
      EventBus.emitEvent('update-note', [currentState]);
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
    if (this.state.isEditing) {
      return (
        <textarea className="note"
          style={{transform: this.props.matrix}}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onBlur={this.blur}
          onChange={this.change}
          onKeyUp={this.keyUp}>
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
