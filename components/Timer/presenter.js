import React, {Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Button from "../Button";

function formatTime(time){
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    if (min < 10){min = `0`+ min}
    if (sec < 10){sec = `0`+ sec}
    return `${min}:${sec}`
}

class Timer extends Component {
    componentWillReceiveProps(nextProps){
        const currentProps = this.props;
        if(!currentProps.isPlaying && nextProps.isPlaying){
            const timerInterval = setInterval(() => {
                currentProps.addSecond();
            },1000);
            this.setState({
                timerInterval
            });
        } else if (currentProps.isPlaying && !nextProps.isPlaying){
            clearInterval(this.state.timerInterval);
        }
    }

    render(){
        console.log(this.props);
        const {isPlaying, elapsedTime, timerDuration, startTimer, restartTimer, addSecond} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar barStyle={"light-content"} />
                <View style={styles.upper}>
                    <Text style={styles.time}>{formatTime(timerDuration - elapsedTime)}</Text>
                </View>
                <View style={styles.lower}>
                    {
                        !isPlaying && (
                            <Button iconName="play-circle" onPress={startTimer} />
                        )
                    }
                    {
                        isPlaying && (
                            <Button iconName="stop-circle" onPress={restartTimer}/>
                        )
                    }
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#CE0B24"
    },
    upper: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    lower: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    time: {
        color: "white",
        fontSize: 120,
        fontWeight: "100"
    }
});

export default Timer;