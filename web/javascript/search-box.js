var SearchBox = React.createClass({
  componentDidMount: function() {
    EventBus.addListener('reload', this.clear);
  },

  clear: function() {
    this.setState({ maps: [], query: '' });
    React.findDOMNode(this.refs.query).value = '';
  },

  getInitialState: function() {
    return { maps: [], query: '' };
  },

  fetchQuery: function() {
    if (React.findDOMNode(this.refs.query)) {
      var query = React.findDOMNode(this.refs.query)
        .value
        .replace(/\s|\W/g, '-');;
      return query;
    } else {
      return '';
    }
  },

  submit: function(event) {
    event.preventDefault();
    var query = this.fetchQuery();
    if (query.trim() === '') {
      this.setState({ maps: [], query: query });
    } else {
      var maps = fetchMaps().filter(function(map) {
        return map.toLowerCase().trim().indexOf(
            query.toLowerCase().trim()) === 0;
      });
      this.setState({ maps: maps, query: query });
    }
  },

  render: function() {
    var addButton;
    if (this.state.query.length > 0) {
      addButton = <p>
        <a href={'#' + this.fetchQuery()}>Create {this.fetchQuery()}</a>
      </p>;
    }

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
          {addButton}
        </div>
      </form>
    );
  }
});
