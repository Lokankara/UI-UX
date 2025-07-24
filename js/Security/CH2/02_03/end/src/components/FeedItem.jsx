import React from 'react';

const FeedItem = (item) => {
  return (
    <div className="row marketing">
      <div className="col-lg-12">
          <a href={item.feed.link}>
            <h4>{item.feed.title}</h4>
          </a>
          <p>{item.feed.description}</p>
      </div>
    </div>
  );
}

export default FeedItem; 
