var Note = React.createClass({
  getInitialState: function() {
    return { isEditing: true, content: '' };
  },

  mouseDown: function(event) {
    event.stopPropagation();
    this.setState({ isEditing: true });
  },

  mouseUp: function(event) {
    event.stopPropagation();
  },

  blur: function(event) {
    var content = this.getDOMNode().value;
    this.setState({ isEditing: false, content: content });
  },

  render: function() {
    if (this.state.isEditing) {
      return (
        <textarea className="note"
          style={{transform: this.props.matrix}}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onBlur={this.blur}>
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
