import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types'
import { getPost } from '../../actions/posts';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, match, post, loading }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id]);

  return loading || post === null ? <div className="mx-center"><Loader type="Bars" color="#424242" height={80} width={80} /></div> : (
    <Fragment>
      <Link to="/posts" className="btn">Back To Posts</Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      {post.comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  post: state.posts.post,
  loading: state.posts.loading
});

export default connect(mapStateToProps, { getPost })(Post);