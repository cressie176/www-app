import React from 'react';
import { Link, } from 'react-router-dom';

const ArticleList = ({ articles, }) => (
  <div className='article-list'>
    {
      articles.map(article => {
        return (
          <div key={article.id} className='article-list__article'>
            <div className='row'>
              <div className='col-md-offset-1 col-md-3 no-min-height'>
                <img className='article-list__article__thumbnail' src={article.images.thumbnail.url} alt={article.title} />
              </div>
              <div className='col-md-5 no-min-height'>
                <h2 className='article-list__article__title'><Link to={article.url}>{article.title}</Link></h2>
                <div dangerouslySetInnerHTML={{__html: article.summary,}} />
              </div>
            </div>
          </div>
        );
      })
    }
  </div>
);

export default ArticleList;
