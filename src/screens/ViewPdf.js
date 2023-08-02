import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PDFView from 'react-native-view-pdf';
import reactotron from 'reactotron-react-native';
import CustomBackground from '../components/CustomBackground';
import CommonHeading from '../components/CommonHeading';
import { Box } from 'native-base';

const ViewPdf = ({route, navigation}) => {

    const { url } = route.params
    console.log({url})

    const resourceType = 'url';

    return (
        <CustomBackground>
            <Box  pt={5} flex={1}>
            <CommonHeading label={'View Report'} goBack={()=>navigation.goBack()}/>

            {/* Some Controls to change PDF resource */}
            {url && <PDFView
                fadeInDuration={250.0}
                style={{ flex: 1, paddingTop: 5 }}
                resource={url}
                resourceType={resourceType}
                onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                onError={(error) => console.log('Cannot render PDF', error)}
            />}
        </Box>
        </CustomBackground>
    )
}

export default ViewPdf

const styles = StyleSheet.create({})