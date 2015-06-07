var SearchBox = React.createClass({
  componentDidMount: function() {
    EventBus.addListener('reload', this.clear);
  },

  clear: function() {
    this.setState({ maps: [] });
    React.findDOMNode(this.refs.query).value = '';
  },

  getInitialState: function() {
    return { maps: [] };
  },

  submit: function(event) {
    event.preventDefault();
    var query = React.findDOMNode(this.refs.query).value;
    if (query.trim() === '') {
      this.setState({ maps: [] });
    } else {
      var maps = fetchMaps().filter(function(map) {
        return map.toLowerCase().trim().indexOf(
            query.toLowerCase().trim()) === 0;
      });
      this.setState({ maps: maps });
    }
  },

  render: function() {
    return (
      <form className="search-box" onSubmit={this.submit}>
        <div className="entry">
          <input type="text" ref="query" onChange={this.submit} />
          <button type="submit">
            <img src="/images/icon-search.png" width="15" height="15" />
          </button>
        </div>
        <div className="results">
          {
            this.state.maps.map(function(map) {
              return <p><a href={'#' + map}>{map}</a></p>
            })
          }
        </div>
      </form>
    );
  }
});
