import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import {Card} from 'react-native-elements';
import axios from 'axios';

export default class StarDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            imagePath: "",
            url:  `http://localhost:5000/star?name=${this.props.navigation.getParam(
                "star_name" 
            )}`
        }
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails = () => {
        const {url} = this.state;
        axios.get(url)
        .then(response => {
            return this.setState({
                listData: response.data.data
            })
        }).catch(error => {
            Alert.alert(error.message);
        })
    }

    render(){
        const {details, imagePath} = this.state;
        if(details.specifications) {
            return(
                <View style={styles.container}>
                    <Card 
                        title={details.name}
                        image={imagePath}
                        imageProps={{resizeMode:"contain", width:"100%"}}
                    >
                        <View>
                            <Text style={styles.cardItem}>{`Star Name : ${details.Star_name}`}</Text>
                            <Text style={styles.cardItem}>{`Star Distance : ${details.Distance}`}</Text>
                            <Text style={styles.cardItem}>{`Star Mass : ${details.Mass}`}</Text>
                            <Text style={styles.cardItem}>{`Star Radius : ${details.Radius}`}</Text>
                            <Text style={styles.cardItem}>{`Star Gravity : ${details.Gravity}`}</Text>
                        </View>
                        <View style={[styles.cardItem, { flexDirection: "column" }]}>
                            <Text>{details.specifications ? `Specifications : ` : ""}</Text> 
                            {details.specifications.map((item, index) => ( 
                            <Text key={index.toString()} style={{ marginLeft: 50 }}> {item} </Text> ))} 
                        </View>
                    </Card>
                </View>
            );
        }
        return(
            <View>
                <Text>Details Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    }, 
    cardItem: { 
        marginBottom: 10 
    } 
});