import firebase from 'firebase';

import {
  USER_MAIN_UPDATE,
  USER_PROFILE_UPDATE,
  USER_MAIN_SET_PROFILE,
  USER_CHECKINS_UPDATE,
  USER_REVIEWS_UPDATE,
  USER_PROMOS_UPDATE } from './types';
import { Actions } from 'react-native-router-flux';

export const userMainUpdate = ({ prop, value }) => {
  return {
    type: USER_MAIN_UPDATE,
    payload: { prop, value }
  };
};

export const getUserProfile = (uid) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${uid}`).on('value', snapshot => {
      const user = snapshot.val();
      dispatch({ type: USER_MAIN_UPDATE, payload: { prop: 'user', value: user }});
    });
  };
};

export const userProfileUpdate = ({ prop, value }) => {
  return {
    type: USER_PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const getCheckins = (uid) => {
  return (dispatch) => {
    //firebase.database().ref(`/Reviews`).orderByChild(`businessID`).equalTo(uid).on('value', snapshot => {
    console.log(uid);
    firebase.database().ref(`/Checkins`).orderByChild(`uid`).equalTo(uid).once('value', snapshot => {
      console.log(snapshot.val());
      let checkinList = [];
      let counter = 0;
      snapshot.forEach(child_node => {
        checkinList.push({...child_node.val(), id: counter});
        counter++;
      });
      dispatch({ type: USER_CHECKINS_UPDATE, payload: checkinList});
    });
  };
};

export const getMyReviews = (uid) => {
  return (dispatch) => {
    firebase.database().ref(`/Reviews`).orderByChild(`uid`).equalTo(uid).on('value', snapshot => {
      let reviewList = [];
      let counter = 0;
      snapshot.forEach(child_node => {
        reviewList.push({...child_node.val(), id: counter});
        counter++;
      });
      //console.log(reviewList)
      dispatch({ type: USER_REVIEWS_UPDATE, payload: reviewList});
    });
  };
};

export const userMainSetProfile = ({user, uid}) => {
  return {
    type: USER_MAIN_SET_PROFILE,
    payload: {user, uid}
  };
}

export const userSetExpired = (pid) => {
  return (dispatch) => {
    firebase.database().ref(`/Coupons/${pid}`).update({expired: true});
  };
};

export const userGetPromos = (uid) => {
  return (dispatch) => {
    let promoList = [];
    //firebase.database().ref(`/Reviews`).orderByChild(`businessID`).equalTo(uid).on('value', snapshot => {
    firebase.database().ref(`/posts`).on('value', snapshot => {
      let counter = 0;
      snapshot.forEach(child_node => {
        var child_key = child_node.key;
        promoList.splice(0,0,{ ...child_node.val(), id: counter , pid: child_key});
        counter++;
      });
      console.log(promoList)
    });
    firebase.database().ref(`/Coupons`).on('value', snapshot => {
      let counter = 0;
      snapshot.forEach(child_node => {
        var child_key_e = child_node.key;
        promoList.splice(0,0,{ ...child_node.val(), id: counter, isCoupon: true ,pid: child_key_e});
        counter++;
      });
      dispatch({ type: USER_PROMOS_UPDATE, payload: promoList});
  });
}
}

export const userLikeItem = (uid, pid, isCoupon) => {
  const like_obj = {[uid]: 1};
  if (isCoupon){
    return (dispatch) => {
      firebase.database().ref(`/Coupons/${pid}`).child('likedBy').update(like_obj).catch((error) => {
      Alert.alert('Could not process like at this time', 'Sorry', {text: 'OK'});
    });};
  } else {
  return (dispatch) => {
    firebase.database().ref(`/posts/${pid}`).child('likedBy').update(like_obj).catch((error) => {
    Alert.alert('Could not process like at this time', 'Sorry', {text: 'OK'});
  });};}

};

export const userUnlikeItem = (uid, pid, isCoupon) => {
  if(isCoupon){
    return (dispatch) => {
      firebase.database().ref(`/Coupons/${pid}`).child('likedBy').child(uid).remove().catch((error) => {
      Alert.alert('Could not process unlike at this time', 'Sorry', {text: 'OK'});
    });};
  }else {
  return (dispatch) => {
    firebase.database().ref(`/posts/${pid}`).child('likedBy').child(uid).remove().catch((error) => {
    Alert.alert('Could not process unlike at this time', 'Sorry', {text: 'OK'});
  });};}
};

function sortObj(list, key) {
  function compare(a, b) {
      a = a[key];
      b = b[key];
      var type = (typeof(a) === 'string' ||
                  typeof(b) === 'string') ? 'string' : 'number';
      var result;
      if (type === 'string') result = a.localeCompare(b);
      else result = a - b;
      return result;
  }
  return list.sort(compare);
}
