import _ from 'lodash';
import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { userGetPromos, userPrimaryFilterUpdate, userSecondaryFilterUpdate } from '../actions';
import UserPromoItem from './UserPromoItem'
import { Card, CardSection } from './common/';

class UserPromoList extends Component {
  componentWillMount() {
    console.log(this.props.uid)
    console.log(this.props.userPrimaryFilterState.primaryFilterSelected)
    console.log(this.props.userSecondaryFilterState.secondaryFilterSelected)
    this.props.userGetPromos(
      this.props.uid,
      this.props.userPrimaryFilterState.primaryFilterSelected,
      this.props.userSecondaryFilterState.secondaryFilterSelected
    );
  }

  renderFilterCarousel() {
    const { userPrimaryFilterState, userSecondaryFilterState } = this.props;
    return (
      <Card>
        <View style={{ flexDirection: 'row'}}>
        <View>
          <CardSection>
            <Icon.Button
              name='bullhorn'
              onPress={() => 
                {
                this.props.userPrimaryFilterUpdate({prop:'primaryFilterSelected', value: 'Promos'});
                this.props.userGetPromos(
                  this.props.uid,
                  this.props.userPrimaryFilterState.primaryFilterSelected,
                  this.props.userSecondaryFilterState.secondaryFilterSelected);
                }
              }
            >
            </Icon.Button>

            <Icon.Button
              name='list-alt'
              onPress={() => 
                {
                this.props.userPrimaryFilterUpdate({prop:'primaryFilterSelected', value: 'Coupons'})
                this.props.userGetPromos(
                  this.props.uid,
                  this.props.userPrimaryFilterState.primaryFilterSelected,
                  this.props.userSecondaryFilterState.secondaryFilterSelected);
                }
              }
            >
            </Icon.Button>
          </CardSection>
        </View>

        <View>
          <CardSection>
            <ScrollView horizontal showVerticalScrollIndicator={false} contentContainerstyle={styles.carouselStyle}>
              <Icon.Button
              name='th-large'
              onPress={() =>
                {
                this.props.userSecondaryFilterUpdate({prop:'secondaryFilterSelected', value: 'All'});
                this.props.userGetPromos(
                  this.props.uid,
                  this.props.userPrimaryFilterState.primaryFilterSelected,
                  this.props.userSecondaryFilterState.secondaryFilterSelected);
                }
              }
              >
              </Icon.Button>

              <Icon.Button
              name='star'
              onPress={() =>
                {
                  this.props.userSecondaryFilterUpdate({prop:'secondaryFilterSelected', value: 'Favorites'});
                  this.props.userGetPromos(
                    this.props.uid,
                    this.props.userPrimaryFilterState.primaryFilterSelected,
                    this.props.userSecondaryFilterState.secondaryFilterSelected);
                  }
                }
              >
              </Icon.Button>

              <Icon.Button
              name='road'
              onPress={() => 
                {
                  this.props.userSecondaryFilterUpdate({prop:'secondaryFilterSelected', value: 'Location'});
                  this.props.userGetPromos(
                    this.props.uid,
                    this.props.userPrimaryFilterState.primaryFilterSelected,
                    this.props.userSecondaryFilterState.secondaryFilterSelected);
                  }
                }
              >
              </Icon.Button>

              <Icon.Button
              name='coffee'
              onPress={() => 
                {
                  this.props.userSecondaryFilterUpdate({prop:'secondaryFilterSelected', value: 'Cafe'});
                  this.props.userGetPromos(
                    this.props.uid,
                    this.props.userPrimaryFilterState.primaryFilterSelected,
                    this.props.userSecondaryFilterState.secondaryFilterSelected);
                  }
                }
              >
              </Icon.Button>

              <Icon.Button
              name='beer'
              onPress={() => 
                {
                  this.props.userSecondaryFilterUpdate({prop:'secondaryFilterSelected', value: 'Bar'});
                  this.props.userGetPromos(
                    this.props.uid,
                    this.props.userPrimaryFilterState.primaryFilterSelected,
                    this.props.userSecondaryFilterState.secondaryFilterSelected);
                  }
                }
              >
              </Icon.Button>

              <Icon.Button
              name='cutlery'
              onPress={() => 
                {
                  this.props.userSecondaryFilterUpdate({prop:'secondaryFilterSelected', value: 'Restaurant'});
                  this.props.userGetPromos(
                    this.props.uid,
                    this.props.userPrimaryFilterState.primaryFilterSelected,
                    this.props.userSecondaryFilterState.secondaryFilterSelected);
                  }
                }
              >
              </Icon.Button>
            </ScrollView>
          </CardSection>
        </View>
        </View>
  </Card>
    )
  }

  renderContent() {
    return (
      <FlatList
        data={this.props.promos}
        extraData={this.props.userPrimaryFilterState}
        renderItem={({item}) => <UserPromoItem item={item} />}
      />
    );
  }

  render() {
    console.log(this.props.userPrimaryFilterState)
    console.log(this.props.userSecondaryFilterState)
    console.log(this.props.promos);
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent:'space-around' }}>
        {this.renderFilterCarousel()}
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
      flexDirection: 'row',
      backgroundColor: '#00b0f0',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 30,
  },
  lineSeparatorStyle: {
      backgroundColor: 'white',
      height: 2,
      shadowColor: 'white',
  },
  carouselStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 50,
      backgroundColor: '#00b0f0',
      alignItems: 'center',
      shadowColor: 'white',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative',
  },
  textStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
  },
  filterButtonStyle: {
      height: 40,
      width: 40,
      backgroundColor: 'white',
      borderRadius: 50,
  }
};

const mapStateToProps = state => {
  var { uid, userPrimaryFilterState, userSecondaryFilterState } = state.userMain;
  console.log(state.userMain)
  const promos = _.map(state.userMain.promos, (val, key) => {
    return {...val, key};
  });
  return { uid, promos, userPrimaryFilterState, userSecondaryFilterState };
}



export default connect(mapStateToProps, { userGetPromos, userPrimaryFilterUpdate, userSecondaryFilterUpdate })(UserPromoList);
