import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    //SafeAreaView,
    StatusBar,
    TextInput,
    Image,
} from 'react-native';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Icon, Container, Header, Left, Body, Right, Content } from 'native-base';


export default class DeliveryHistoryHome extends Component {

    render() {
        return (
            <Container style={{backgroundColor:''}}>
            <Header style={{backgroundColor:'#8E0438'}}>
            <StatusBar backgroundColor='#8E0438' barStyle="light-content" />
            <Left>
                  <Icon name='menu' style={{color:'white'}} onPress={()=>this.props.navigation.toggleDrawer()}/>
              </Left>
              <Body>
                <Text style={{fontSize:20, color:'white'}}>Order History</Text>
              </Body>
              <Right/>
            </Header>
            <Content>
                <FlatList
                    data={[1, 2, 4, 5,6,7]}
                    renderItem={(item) => 
                        <TouchableOpacity 
                        activeOpacity={.6}
                        onPress={() => this.props.navigation.navigate('History')}
                        >
                        <ListItem
                            title={'Order #23232'}
                            subtitle={'Delivered'}
                            rightTitle={'RS 2432'}
                            rightSubtitle={'1 hours ago'}
                            titleStyle={Styles.leftTitleStyles}
                            subtitleStyle={Styles.leftSubtitleStyles}
                            rightTitleStyle={Styles.rightTitleStyle}
                            rightSubtitleStyle={Styles.rightSubtitleStyle}
                            
                            // checkmark
                            
                            underlayColor={'white'}
                            chevron={<Icon
                                name='ios-arrow-forward'
                                style={{ marginLeft: responsiveWidth(3), color:'gray' }} />}
                            containerStyle={Styles.listContainer}
                        />
                        </TouchableOpacity>
                    }
                />
            </Content>
            </Container>
        );}
    }
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Header: {
        height: responsiveHeight(18),
        width: '100%',
        backgroundColor: 'white',
    },
    ArrowView: {
        height: responsiveHeight(10),
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
    HeaderTextView: {
        paddingTop: responsiveHeight(1),
        width: '90%',
        alignSelf: 'center',
    },
    HeaderLargeText: {
        color: '#8E0438',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(4),
        letterSpacing: 1,
    },
    HeaderSmallText: {
        color: '#8E0438',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2.2),
        letterSpacing: 1,
    },
    headerImageStyle: {
        width: responsiveWidth(8),
        height: responsiveHeight(5),
        resizeMode: 'contain'
    },
    leftTitleStyles: {
        // color: blue,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
        // letterSpacing: 1,
    },
    listContainer: {
        padding: 5,
        height: responsiveHeight(12),
        width: responsiveWidth(85),
        alignSelf: 'center',
    },
    leftSubtitleStyles: {
        color: 'rgb(66, 69, 150)',
        fontWeight: '900',
        fontSize: responsiveFontSize(1.8),
        // letterSpacing: 1,
    },
    rightSubtitleStyle: {
        // color: blue,
        fontWeight: '900',
        fontSize: responsiveFontSize(1.6),
        // letterSpacing: 1
    },
    rightTitleStyle: {
        color: '#8E0438',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
        // letterSpacing: 1
    }

});
