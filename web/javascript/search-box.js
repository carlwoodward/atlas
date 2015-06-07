var SearchBox = React.createClass({
  getInitialState: function() {
    return { maps: fetchMaps() };
  },

  render: function() {
    return (
      <form className="search-box">
        <div className="entry">
          <input type="text" />
          <button type="submit">
            <img src="/images/icon-search.png" width="15" height="15" />
          </button>
        </div>
        <div className="results">
          {
            this.state.maps.map(function(map) {
              return <p><a href="#{map}">{map}</a></p>
            })
          }
        </div>
      </form>
    );
  }
});
