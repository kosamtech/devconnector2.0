import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/posts';

const CommentItem = ({ comment, user, deleteComment, postId }) => {
  return (
    <div className="comments">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${comment.user}`}>
            <img
              className="round-img"
              src={comment.avatar}
              alt="Avatar"
            />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {comment.text}
          </p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
          </p>
          {comment.user === user._id && (
            <button onClick={() => deleteComment(postId, comment._id)} className="btn btn-danger"><i className="fas fa-times"></i></button>
          )}
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
