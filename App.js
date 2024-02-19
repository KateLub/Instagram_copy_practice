import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, TextInput, ImageBackground, TouchableHighlight, Alert, Dimensions, ScrollView, FlatList} from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <Image source={{uri:item.image}}  style={{width:deviceWidth/3, height:deviceWidth/3}} />
    </View>
  );
}

export default class App extends Component {
    
    state = {
        homePage: 'none',
        profilePage: 'block',
        postPage: 'block',
        placement: '',
        postCount: 0,
        image: 'https://freepikpsd.com/media/2019/10/placeholder-image-png-5-Transparent-Images.png',
        userName: 'username',
        profilePic: 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
        posts: [],
    }
     homePagePress = () => this.setState(state => ({
        homePage: 'block',
        profilePage: 'none',
        postPage: 'none',
        
    }));

    profilePagePress = () => 
      this.setState(state => ({
        homePage: 'none',
        profilePage: 'block',
        postPage: 'none',
    }));

    postPagePress = () => this.setState(state => ({
        homePage: 'none',
        profilePage: 'none',
        postPage: 'block',
    }));

    changeImage(placement) {
        this.setState({ 
            placement: placement,
        })
        this.postPagePress();
    }  

    finalizeChangeImage = () => {
        if (this.state.placement == 'Profile') {
            this.setState({ 
                profilePic: this.state.image,
            })
         } else if (this.state.placement == 'Post') {
            this.state.posts.splice(0, 0, {
                image: this.state.image,
                like: 0,
            },)
            this.setState({ 
                postCount: this.state.postCount + 1,
            })
        } 
        this.profilePagePress();
    } 

    changeLikes = (index) => {
        const newArray = [...this.state.posts];
          newArray[index].like = newArray[index].like + 1;
          this.setState({ posts: newArray });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ display: this.state.homePage}}>
                    {/*header*/}
                    <View style={[{backgroundColor: '#1c1e1d',},styles.bar]}>
                        <Image
                            source={{ uri: 'https://codehs.com/uploads/d49b9131410f66e3f1bbcd9156e5bc3f' }}
                            style={{ height: deviceHeight/13, width: deviceWidth/10, marginRight:deviceWidth/3.5,}}
                        ></Image>
                        <Image
                            source={{ uri: 'https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png' }}
                            style={{ height: deviceHeight/23, width: deviceWidth/4.5}}
                        ></Image>
                        
                        <Image
                            source={{ uri: 'https://codehs.com/uploads/9b0602f1b7b25ccb76f53506c93e8938' }}
                            style={{ height: deviceHeight/13, width: deviceWidth/12, marginLeft: deviceWidth/3.5}}
                        ></Image>
                    </View>
                    {/*story*/}
                    <View style={styles.storyContainer}>
                        <View style = {{alignItems:'center', width: deviceWidth/5}}>
                          <Image
                              source={{ uri: this.state.profilePic }}
                              style={{ height: deviceHeight/10, width: deviceHeight/10, marginBottom: 3, borderRadius: deviceHeight/20}}
                          ></Image>
                          <Text style={styles.storyText}>
                              Your Story
                          </Text>
                        </View>
                    </View>
                    {/* content container*/}
                    <View style={styles.contentContainer}>
                        <ScrollView> 
                            {/*bar above picture*/}
                            {this.state.posts.map((posts, index) => (
                                <View>
                                    <View style={styles.imageSurroundContainer}>
                                        <Image
                                            source={{ uri: this.state.profilePic  }}
                                            style={{ height: deviceHeight/20, width: deviceHeight/20, marginRight: 10, marginLeft:20, borderRadius: deviceHeight/40}}
                                        ></Image>
                                        <Text style={styles.storyText}>
                                            {this.state.userName}
                                        </Text>
                                        <Image
                                            source={{ uri: 'https://codehs.com/uploads/1c423c1ecb8a7524cf656c25a87cd54f' }}
                                            style={{height: deviceHeight/15, width: deviceWidth/10, marginLeft: 185}}
                                        ></Image>
                                    </View>
                                    {/*picture*/}    
                                    <View style={{alignItems:'center'}}>
                                        <Image
                                            source={{ uri: posts.image }}
                                            style={{height: deviceHeight/2, width: deviceWidth/1.15}}
                                        ></Image>
                                    </View>
                                    {/*bar below picture*/}    
                                    <View style={styles.imageSurroundContainer}>
                                        <View style = {{width: deviceWidth/3, flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
                                            <Text style={[{marginLeft: 20},styles.storyText]}>
                                                {posts.like}
                                            </Text>
                                            <TouchableHighlight onPress = {() => this.changeLikes(index)}>
                                                <Image
                                                    source={{ uri: 'http://assets.stickpng.com/thumbs/584a78d67ec3445d9da286a9.png' }}
                                                    style={{ height: deviceHeight/25, width: deviceHeight/25}}
                                                ></Image>
                                            </TouchableHighlight>
                                            <Image
                                                source={{ uri: 'https://codehs.com/uploads/24b8b862fb3cece1ebbba5b1030dd62e' }}
                                                style={{height: deviceHeight/15, width: deviceWidth/10, marginLeft: 10,}}
                                            ></Image>
                                            <Image
                                                source={{ uri: 'https://codehs.com/uploads/352e0242eb3fe8431008f8db227fe7d9' }}
                                                style={{ height: deviceHeight/15, width: deviceWidth/10, marginLeft: 5}}
                                            ></Image>
                                        </View>
                                        
                                        <Image
                                            source={{ uri: 'https://www.materialui.co/materialIcons/action/bookmark_border_white_192x192.png' }}
                                            style={{ height: deviceHeight/25, width: deviceWidth/15, marginLeft: 165}}
                                        ></Image>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
        {/*profile page*/}
                <View style={{ display: this.state.profilePage}}>
                    {/*header*/}
                    <View style={[{backgroundColor: '#07080a', justifyContent:'center'},styles.bar]}>
                        <View style = {{width: deviceWidth/3, flexDirection: 'row', alignItems:'center', marginRight: deviceWidth/2,}}>
                           <Text style={[{marginLeft:deviceWidth/3},styles.profileText]}>
                                {this.state.userName}
                            </Text>
                            <Image
                                source={{ uri: 'https://codehs.com/uploads/1c423c1ecb8a7524cf656c25a87cd54f' }}
                                style={{height: deviceHeight/15, width: deviceWidth/10}}
                            ></Image>
                        </View>
                        <TouchableHighlight onPress={() => this.changeImage('Post')}>
                          <Image
                              source={{ uri: 'https://freepikpsd.com/media/2019/10/white-plus-sign-png-3-Transparent-Images.png' }}
                              style={{height: deviceHeight/15, width: deviceWidth/10}}
                          ></Image>
                        </TouchableHighlight>
                    </View>
                    {/*profile*/}
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                       <TouchableHighlight onPress={() => this.changeImage('Profile')}>
                          <Image
                            source={{ uri: this.state.profilePic }}
                            style={{ height: deviceHeight/7, width: deviceHeight/7, borderRadius: deviceHeight/14, marginLeft: 10}}
                          ></Image>
                      </TouchableHighlight>
                    
                        <View style = {styles.columnContainer}>
                            <Text style={styles.profileText}>
                                {this.state.postCount}
                            </Text>
                            <Text style={styles.profileSubText}>
                                Posts
                            </Text>
                        </View>
                        <View style = {styles.columnContainer}>
                            <Text style={styles.profileText}>
                                0
                            </Text>
                            <Text style={styles.profileSubText}>
                                Followers
                            </Text>
                        </View>
                        <View style = {styles.columnContainer}>
                            <Text style={styles.profileText}>
                                0
                            </Text>
                            <Text style={styles.profileSubText}>
                                Following
                            </Text>
                        </View>
                    </View>
                    <View style ={{marginLeft: 10, width: deviceWidth/2}}>
                      <TextInput 
                        onChangeText={(userName) => this.setState({userName})}
                        value={this.state.userName}
                        style={styles.profileText}
                      />
                    </View>
                    {/* content container*/}
                    <View style={[{marginTop: 15},styles.contentContainer]}>
                        <ScrollView> 
                            <FlatList
                                style = {{borderTopWidth: 1, borderTopColor:'white'}}
                                data={this.state.posts}
                                renderItem={({ item }) => <Image source={{uri:item.image}}  style={{width:deviceWidth/3, height:deviceWidth/3, borderWidth:1}} />}
                                keyExtractor={item => item.image}
                                numColumns={3}
                            />
                        </ScrollView>
                    </View>
                </View>
              {/*post a picture*/}
              <View style={{ display: this.state.postPage}}>
                    <View style={styles.postContainer}>
                      <View style = {{flexDirection: 'row', height: deviceHeight/10, justifyContent:'center', alignItems:'center'}}>
                      <TouchableHighlight onPress={this.profilePagePress}>
                          <Text style={[{margin: deviceWidth/15},styles.profileSubText]}>
                            Cancel
                          </Text> 
                        </TouchableHighlight>
                        <Text style={[{margin: deviceWidth/15},styles.profileText]}>
                           {this.state.placement}
                        </Text>
                        <TouchableHighlight onPress={() => this.finalizeChangeImage()}>
                          <Text style={[{margin: deviceWidth/15},styles.profileSubText]}>
                            Next
                          </Text> 
                        </TouchableHighlight>
                      </View>
                      <View style = {styles.inputContainer}>
                        <TextInput 
                          onChangeText={(image) => this.setState({image})}
                          value={this.state.image}
                          style={{fontSize: deviceHeight/40, color: 'grey', textAlign:'center'}}
                        />
                      </View>
                      <Image
                          source={{ uri: this.state.image }}
                          style={{ height: deviceWidth/1.2, width: deviceWidth/1.2, borderWidth:2, borderColor: 'white'}}
                      ></Image>
                    </View>
              </View>
                
                {/* navbar*/}
                 <View style={[{backgroundColor: '#1c1e1d',justifyContent:'center',},styles.bar]}>
                    <TouchableHighlight onPress ={this.homePagePress}>
                        <Image
                            source={{ uri: 'https://codehs.com/uploads/862c3ff99fd8e1808e2b90609de8ccbd' }}
                            style={{ height:deviceHeight/13, width: deviceWidth/10, marginRight: deviceWidth/10, marginLeft: deviceWidth/15}}
                        ></Image>
                    </TouchableHighlight>
                    <Image
                        source={{ uri: 'https://codehs.com/uploads/47354933377f16ba35fcc69b6752e228' }}
                        style={{ height: deviceHeight/13, width: deviceWidth/10,marginRight: deviceWidth/10 }}
                    ></Image>
                    
                    <Image
                        source={{ uri: 'https://codehs.com/uploads/95de1dbe13c3fba16cacdb9357605f88' }}
                        style={{ height: deviceHeight/13, width: deviceWidth/10,marginRight: deviceWidth/10 }}
                    ></Image>
                    <Image
                        source={{ uri: 'https://codehs.com/uploads/800ade0087b93269546ded7df20a3842' }}
                        style={{ height: deviceHeight/13, width: deviceWidth/10,marginRight: deviceWidth/10 }}
                    ></Image>
                    <TouchableHighlight onPress ={this.profilePagePress}>
                        <Image
                            source={{ uri: this.state.profilePic }}
                            style={{ height: deviceHeight/20, width: deviceHeight/20, borderRadius: deviceHeight/40,marginRight: deviceWidth/10}}
                        ></Image>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: '#07080a',
    },
    
    bar: {
        height: deviceHeight/13,
        width: deviceWidth,
        alignItems:'center',
        flexDirection:'row',
    },
    
    storyContainer:{
        height: deviceHeight/6.5,
        width: deviceWidth,
        borderBottomColor: '#1c1e1d',
        borderBottomWidth: 1,
        justifyContent:'center',
        flexDirection:'column',
        paddingLeft: 15,
    },
    
    storyText:{
        color:'#e9ebec',
        fontSize:10,
    },
    
    profileSubText:{
        color:'#e9ebec',
        fontSize:13,
    },
    
    profileText:{
        color:'#e9ebec',
        fontSize:20,
        fontWeight:'bold',
    },

    contentContainer:{
        height: deviceHeight/1.45,
        width: deviceWidth,
        flexDirection:'column',
        justifyContent:'center',
    },
    
    imageSurroundContainer:{
        height: deviceHeight/13,
        width: deviceWidth,
        alignItems:'center',
        flexDirection:'row',
    },
    
    columnContainer:{
        height: deviceHeight/7,
        width: deviceWidth/4.5,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'center',
    },

    postContainer:{
        height: deviceHeight/1.1,
        width: deviceWidth,
        backgroundColor: '#354346',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'flex-start',
    },

    inputContainer:{
        height: deviceHeight/10,
        width: deviceWidth/1.2,
        alignItems: 'center',
        justifyContent:'center',
        borderWidth:2,
        marginBottom:deviceHeight/10,
    },
});