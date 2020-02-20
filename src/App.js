import React, { useState } from 'react';
import Post from './Post'
import { CssBaseline, Container } from '@material-ui/core';

function collapseComments(comments) {
  comments = comments.map(comment => {
    comment.comments = [];
    return comment;
  })
  comments.forEach(child_comment => {
    if(child_comment.parent_id) {
      let ind = comments.findIndex(parent_comment => parent_comment.id == child_comment.parent_id);
      if(ind >= 0) {
        comments[ind].comments.push(child_comment);
      }
    }
  });
  comments = comments.reduce((commentArr, comment) => {
    if(!comment.parent_id) {
      commentArr.push(comment);
    }
    return commentArr;
  }, []);

  return comments;
}

let fetched = false;

function App() {
  const [post, setPost] = useState({});

  function deleteChild(comments, id) {
    comments = comments.filter(comment => comment.id !== id);
    let children = comments.filter(comment => comment.parent_id === id);
    if(children.length > 0) {
      children.forEach(child => {
        comments = deleteChild(comments, child.id);
      })
    }
    return comments;
  }

  function deleteComment(id) {
      let updatedPost = {...post};
      updatedPost.comments = post.comments.filter(comment => comment.id !== id);

      let children = post.comments.filter(comment => comment.parent_id === id);
      children.forEach(child => {
        updatedPost.comments = deleteChild(updatedPost.comments, child.id);
      })

      updatedPost.collapsedComments = collapseComments(updatedPost.comments);
      setPost(updatedPost);
  }

  if(!fetched) {
    fetch("http://gist.githubusercontent.com/mkg0/6a4dca9067ad7a296204e7c9ecd977b0/raw/0b1ec16580ea1e970a73f5c85563c22631be7ad7/unpopularopinion-dataset.json")
    .then(response => response.json())
    .then(json => {
      json.collapsedComments = collapseComments(json.comments);
      setPost(json);
    });
    fetched = true;
  }

  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="md">
        <Post data={post} deleteComment={deleteComment}/>
      </Container>
    </React.Fragment>
  );
}

export default App;
