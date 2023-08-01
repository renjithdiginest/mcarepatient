import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import React, {useEffect} from 'react'
import { Box, Text } from 'native-base';
import LottieView from 'lottie-react-native';

const ViewPdf = ({route, navigation}) => {
    const { path } = route.params;

    useEffect(() => {
        setTimeout(() => {
            navigation.goBack()
        }, 1000);
    }, [])
    
    return (
        <Box alignItems='center' mt={80}>
            {/* <LottieView
                source={require('../../../Lottie/download.json')}
                autoPlay
                style={{height:150, width:150}}
            /> */}
            {/* <Text fontWeight={300} letterSpacing={2} color='#000' mt={2}>Downloading..</Text> */}
            <WebView
                source={{
                    uri: path,
                }}
            />
        </Box>
    )
}

export default ViewPdf

const styles = StyleSheet.create({})