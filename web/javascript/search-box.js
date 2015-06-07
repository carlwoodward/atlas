var SearchBox = React.createClass({
  render: function() {
    return (
      <form className="search-box">
        <input type="text" />
        <button type="submit">
          <img src="/images/icon-search.png" width="15" height="15" />
        </button>
      </form>
    );
  }
});
