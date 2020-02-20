import React from 'react';
import Comment from './Comment'
import { Card, CardContent, Typography, CardActions, Button, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Comment as CommentIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  rootCard: {
    minWidth: 275
  },
  selftextCard: {
    backgroundColor:'whitesmoke'
  },
  selftext: {
    fontSize: 14,
    whiteSpace:"pre-line"
  },
  subreddit: {
    fontSize: 14,
  },
  voteCount: {
    fontSize: 18
  },
  title: {
    fontSize: 20,
    marginLeft:"1ex",
    display:"inline-block",
    fontWeight:"bold"
  },
  commentIcon: {
    marginRight:"1ex"
  }
});

function voteCount(votes) {
  if(votes > 1000) {
    return Math.floor(votes/100)/10+"k";
  }
  return votes;
}

function Post(props) {
  const classes = useStyles();
  if(!props.data.subreddit) {
    return null;
  }
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.subreddit} color="secondary">
            {props.data.subreddit_name_prefixed}
          </Typography>
          <Typography className={classes.voteCount} variant="h5" component="div">
            {voteCount(props.data.score)}
            <Typography className={classes.title} variant="h4" component="span">
              {props.data.title}
            </Typography>
          </Typography>
          <Card className={classes.selftextCard}>
            <CardContent>
              <Typography className={classes.selftext}>
                {props.data.selftext}
              </Typography>
            </CardContent>
            <CardActions>
              <Button><CommentIcon className={classes.commentIcon}/> {props.data.comments.length} comments</Button>
            </CardActions>
          </Card>
        </CardContent>
      </Card>
      <List component="div">
        {props.data.collapsedComments && props.data.collapsedComments.length > 0 && props.data.collapsedComments.map((comment, ind) => (
          <Comment data={comment} deleteComment={props.deleteComment} key={ind}/>
        ))}
      </List>
    </React.Fragment>
  );
}

export default Post;
