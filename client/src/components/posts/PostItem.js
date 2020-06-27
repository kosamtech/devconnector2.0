import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/posts';


const PostItem = ({ post, user, addLike, removeLike,deletePost, showActions }) => {
  return (
    <div className="posts">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img
              className="round-img"
              src={post.avatar}
              alt=""
            />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {post.text}
          </p>
            <p className="post-date">
              Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
          </p>

          {showActions && (
            <Fragment>
              <button onClick={() => addLike(post._id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>{' '}
              <span>{post.likes.length > 0 && post.likes.length}</span>
              </button>
              <button onClick={() => removeLike(post._id)} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/posts/${post._id}`} className="btn btn-primary">
                Discussion {post.comments.length > 0 && (<span className='comment-count'>{post.comments.length}</span>)}
              </Link>
              {post.user === user._id && (
                <button      
                type="button"
                onClick={() => deletePost(post._id)}
                className="btn btn-danger">
                <i className="fas fa-times"></i>
              </button>
              )}
            </Fragment>
          )}
          
        </div>
      </div>
    </div>
  );
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);