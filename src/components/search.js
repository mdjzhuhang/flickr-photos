import React from 'react';
import axios from 'axios';
import './search.scss';
import ImgList from './imgList.js';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false, // button throttled
      msg: '', // axios response error message
      photos: [], // photo list
      text: '' // search tags
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
        <p className="msg">{}</p>
        <ImgList photos={this.state.photos}/>
      </div>
    );
  }

  componentDidMount() {
    this.qryImg(); // request images on page loaded
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
   * get photos from https://www.flickr.com/services/feeds/photos_public.gne
   * @param tags {Array} (Optional) A comma delimited list of tags to filter the feed by.
   * @param tagmode {String} (Optional) Control whether items must have ALL the tags (tagmode=all), or ANY (tagmode=any) of the tags. Default is ALL.
   * @param format {String} (Optional) The format of the feed. use json
   * @param nojsoncallback. 1: raw JSON, with no function wrapper
   * @param lang {String} (Optional) The display language for the feed. See the feeds page for feed language information. Default is US English (en-us).
   */
  qryImg(tags) {
    let url = 'https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';
    if (tags) {
      url = url + '&tags=' + tags;
    }
    axios.post(url)
      .then((response) => {
        if (response.data.stat === 'fail') {
          this.setState({ msg: response.data.message });
        } else {
          this.setState({ photos: [].concat(response.data.items) });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ msg: 'Sorry, there are something wrong. Please try again.' });
      });
  }
}

export default Search;