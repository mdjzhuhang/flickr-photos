import React from 'react';
import axios from 'axios';
import './search.scss';
import ImgList from './imgList.js';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      photos: [],
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="nav">
            <h1>Photos</h1>
            <div className="form">
              <input
                type="text"
                name="search"
                placeholder="bird, sky, tree"
                onChange={this.handleChange}
                value={this.state.text}
              />
              <span className="button" onClick={this.handleSearch}>
                Search
              </span>
            </div>
          </div>
        </div>
        <ImgList photos={this.state.photos}/>
      </div>
    );
  }

  componentDidMount() {
    this.qryImg();
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    if (this.state.disabled) { return }
    this.setState({ disabled: true });
    this.qryImg(this.state.text);
    setTimeout(() => { this.setState({ disabled: false }) }, 2000);
  }

  /**
   * query flickr photos
   * @param id {String} (Optional) A single user ID. This specifies a user to fetch for.
   * @param ids {Array} (Optional) A comma delimited list of user IDs. This specifies a list of users to fetch for.
   * @param tags {Array} (Optional) A comma delimited list of tags to filter the feed by.
   * @param tagmode {String} (Optional) Control whether items must have ALL the tags (tagmode=all), or ANY (tagmode=any) of the tags. Default is ALL.
   * @param format {String} (Optional) The format of the feed. See the feeds page for feed format information. Default is Atom 1.0.
   * @param lang {String} (Optional) The display language for the feed. See the feeds page for feed language information. Default is US English (en-us).
   */
  qryImg(tags) {
    let url = 'https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';
    if (tags) {
      url = url + '&tags=' + tags;
    }
    axios.post(url)
      .then((response) => {
        this.setState({ photos: [].concat(response.data.items) });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default Search;