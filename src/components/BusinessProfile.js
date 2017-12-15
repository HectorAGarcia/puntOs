import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation, TouchableWithoutFeedback, Tabbar } from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import { businessProfileUpdate } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ReviewList from './ReviewList';
import CouponsList from './CouponsList';
import PostList from './PostList';

class BusinessProfile extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  renderContent(){
    const { businessProfileState } = this.props;
    if (businessProfileState.tab_selected === 'Promos'){
      return (<View style= {{ flex: 8, flexDirection: 'column' }}>
    <PostList />
    </View>);
    } else if( businessProfileState.tab_selected === 'Coupons'){
      return (
      <View style= {{ flex: 8, flexDirection: 'column' }}>
      <CouponsList />
      </View>);
    } else if(businessProfileState.tab_selected === 'Reviews'){
        return (<View style= {{ flex: 8, flexDirection: 'column' }}>
      <ReviewList />
      </View>);
    }
  }

  renderIcon(image) {
          if (image) {
              return (
                <Image
                style={styles.thumbnailStyle}
                source={{uri: image }}
                />
              );
          }
          else {
            return(<Image
            style={styles.thumbnailStyle}
            source={require('../assets/no-user-image.gif')}
            />);
          }
      }

  renderTabs() {
    const { businessProfileState } = this.props;
    var selectedStyle = { alignSelf: 'center', fontWeight: 'bold', color: '#fff', fontSize: 18 };
    var notSelectedStyle = { alignSelf: 'center', color: '#fff', fontSize: 15 };
    var promo_tab = null;
    var coupon_tab = null;
    var review_tab = null;
    if (businessProfileState.tab_selected === 'Promos'){
      promo_tab = selectedStyle;
      coupon_tab = notSelectedStyle;
      review_tab = notSelectedStyle;
    } else if( businessProfileState.tab_selected === 'Coupons'){
      promo_tab = notSelectedStyle;
      coupon_tab = selectedStyle;
      review_tab = notSelectedStyle;
    } else if(businessProfileState.tab_selected === 'Reviews'){
      promo_tab = notSelectedStyle;
      coupon_tab = notSelectedStyle;
      review_tab = selectedStyle;
    }
    return(
    <View style={{ flex:1, flexDirection: 'row', borderColor: '#000', borderBottomWidth: 0.5, backgroundColor: '#299cc5' }}>
    <View style={{ flex: 1, justifyContent: 'center'}}>
    <Text onPress={()=> this.props.businessProfileUpdate({prop:'tab_selected', value: 'Coupons'})} style={coupon_tab} >Coupons</Text>
    </View>
    <View style={{ flex: 1, justifyContent: 'center'}}>
    <Text onPress={()=> this.props.businessProfileUpdate({prop:'tab_selected', value: 'Promos'})} style={promo_tab} >Promos</Text>
    </View>
    <View style={{ flex: 1, justifyContent: 'center'}}>
    <Text onPress={()=> this.props.businessProfileUpdate({prop:'tab_selected', value: 'Reviews'})} style={review_tab} >Reviews</Text>
    </View>
    </View>
  );
  }
  render() {
    const { user, coupon_count, checkin_count, scene, businessProfileState } = this.props;
    return (
      <View style={styles.backgroundStyle}>
        <View style={{ flex:4, borderBottomWidth: 0.5, borderColor: '#000', backgroundColor:'#fff' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20 }}>
            <View style={{ flex: 1, justifyContent: 'center'}} >
            <Icon name='ios-arrow-back' size= {30} color='#299cc5' onPress={()=> Actions.pop()} style={{ alignSelf: 'flex-start', paddingLeft: 5 }} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center'}}>
            <Icon name='ios-settings' size= {20} color='#299cc5' style={{ alignSelf: 'flex-end', paddingRight: 5 }} />
            </View>
            </View>
            <View style={{ flex: 5, flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{ alignSelf: 'center', fontSize: 30 }}>{coupon_count}</Text>
              <Text style={{ alignSelf: 'center' }}>coupons</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center'}}>
              {this.renderIcon(user.image)}
              </View>
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
              <Text style={{ alignSelf: 'center', fontSize: 30 }}>{checkin_count}</Text>
              <Text style={{ alignSelf: 'center'}}>visits</Text>
              </View>
            </View>
            <View style={{ flex: 3 , flexDirection: 'column', justifyContent: 'center', marginBottom: 10, marginTop: 5 }}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>{user.businessName}</Text>
            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
            <StarRating
            disabled={true}
            maxStars={5}
            rating={parseFloat(user.rating)}
            starSize={25}
            starColor={'#f2d733'}
            />
            <Text style={{ fontSize: 20, paddingLeft: 5 }}>{user.rating}</Text>
            </View>
            </View>
          </View>
        </View>
          {this.renderTabs()}
          {this.renderContent()}
      </View>
    );
  }
}

const styles ={
backgroundStyle: {
  flex: 1,
  backgroundColor: '#e3e3e3'
},
tileStyle:{
  alignSelf: 'stretch',
  flex:1,
  borderColor:'#000',
  borderRadius: 5,
  borderWidth:1,
  marginTop: 2,
  marginLeft: 2,
  marginBottom: 2,
  marginRight: 2,
  paddingTop: 6,
  paddingLeft: 6,
  paddingRight: 4,
  paddingBottom: 4,
  backgroundColor:'#299cc5',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2
},
textStyle:{
  fontSize: 25,
  color: '#fff'
},
thumbnailStyle: {
height: 100,
width: 100,
borderRadius: 5,
borderWidth: 1,
borderColor: 'black',
alignSelf: 'center',
resizeMode: 'contain'
}
}
const mapStateToProps = state => {
  const { user, uid, metrics, scene, coupon_count, checkin_count, businessProfileState } = state.businessMain;
  return { user, uid, metrics, scene, coupon_count, checkin_count, businessProfileState };
};
export default connect(mapStateToProps,{ businessProfileUpdate })(BusinessProfile);
