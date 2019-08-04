import React from 'react';
import './imgList.scss';

class ImgList extends React.Component {
  render() {
    return (
      <div className="main">
        <ul>
          {this.props.photos.map((item, index) => (
            <li key={index} style={{ backgroundImage: 'url(' + item.media.m + ')'}}>
              <p>{item.title}</p>
              <a href={item.link}>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ImgList;