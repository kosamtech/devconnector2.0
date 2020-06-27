import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { getPosts } from '../../actions/posts';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, posts, loading }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? <div className="mx-center"><Loader type="Bars" color="#424242" height={80} width={80} /></div> : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome To The Community
      </p>
      <PostForm />
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </Fragment>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loading: state.posts.loading
});

export default connect(mapStateToProps, { getPosts })(Posts);