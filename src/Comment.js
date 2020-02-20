import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import { Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  username:{
    color:"teal",
    marginRight:"1ex",
    display:"inline-block"
  },
  upvotes:{
    marginRight:"1ex",
    display:"inline-block"
  },
  selftext: {
    fontSize: 14,
    whiteSpace:"pre-line"
  },
  nestedList: {
    borderLeft:"1px lightgrey solid",
    paddingLeft: "2em",
    marginLeft: "1em"
  },
  removeIcon: {
    float:'right',
    cursor:'pointer',
    fontSize:'0.75em',
  }

});

function voteCount(votes) {
  if(votes > 1000) {
    return Math.floor(votes/100)/10+"k";
  }
  return votes;
}

function Comment(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ListItem alignItems="flex-start" component="div">
        <ListItemText
          primary={
            <React.Fragment>
              <Typography component="span" variant="body1" className={classes.username}>
                {props.data.author}
              </Typography>
              <Typography component="span" variant="body1" className={classes.upvotes}>
                {voteCount(props.data.ups)} points
              </Typography>
              <Typography component="span" variant="body1">
                {moment(props.data.created_utc*1000).fromNow()}
              </Typography>
              <DeleteIcon className={classes.removeIcon} onClick={() => props.deleteComment(props.data.id)}/>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography variant="body1"  component="span" className={classes.selftext}>
                {props.data.body}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      {props.data.comments && props.data.comments.length > 0 &&
        <List component="div" className={classes.nestedList}>
          {props.data.comments.map((comment, ind) => (<Comment data={comment} deleteComment={props.deleteComment} key={ind}/>))}
        </List>
      }
    </React.Fragment>
  );
}

export default Comment;
