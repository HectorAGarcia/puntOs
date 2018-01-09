import React, { Component } from 'react';
import { ListView, FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import { getMyReviews } from '../actions';
import _ from 'lodash';
import firebase from 'firebase';
import { connect } from 'react-redux';

class UserReviewList extends Component {
  componentWillMount() {
    currentUser = firebase.auth().currentUser.uid;
    this.props.getMyReviews(currentUser);
  }

  render() {
    return (
      <FlatList
        data={this.props.reviews}
        renderItem={({item}) => <ReviewItem review={item} />}
      />
    );
  }
}
const mapStateToProps = state => {
  var { uid } = state.userMain;
  const reviews = _.map(state.userMain.reviews, (val, key) => {
    return {...val, key};
  });
  return { uid, reviews };
}

export default connect(mapStateToProps, { getMyReviews })(UserReviewList);
