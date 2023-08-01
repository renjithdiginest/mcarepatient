import React,{useState, useEffect} from 'react'
import { ImageBackground, StyleSheet,useWindowDimensions } from "react-native";
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import CustomButton from '../../components/CustomButton';
import CustomBackground from '../../components/CustomBackground';
import CommonHeading from '../../components/CommonHeading';
import Today from './Today';
import Upcoming from './Upcoming';
import Completed from './Completed';

const Reportview = () => {
    
    const [currentTab, setCurrentTab] = useState(0)


    const { width, height } = useWindowDimensions()
  return (
    
    <CustomBackground>
        <Box px={5} mt={5} >

            <CommonHeading label={'Report Review'}/>
          
                <HStack justifyContent={'center'} borderRadius={15}  alignSelf='center' bg='#fff' mt={4}>
                    <CustomButton 
                        label={"Today"}
                        onPress={()=>setCurrentTab(0)}
                        selected={currentTab === 0 ? true : false}
                    />
                    <CustomButton 
                        label={"Upcoming"}
                        onPress={()=>setCurrentTab(1)}
                        selected={currentTab === 1 ? true : false}
                    />
                    <CustomButton 
                    label={"Old"}
                        onPress={()=>setCurrentTab(2)}
                        selected={currentTab === 2 ? true : false}
                    />
                </HStack>
                {currentTab === 0 && <Today type={"Report"}/>} 
                {currentTab === 1 && <Upcoming type={"Report"}/>} 
                {currentTab === 2 && <Completed type={"Report"}/>} 


        {/* 
            <Box 
                height={20} width={20} 
                bg={{
                    linearGradient: {
                    colors: ['#0E9DAB', '#047AC3'],
                    start: [0, 0],
                    end: [1, 0]
                    }
                }}
            >

            </Box>
        */}
        </Box>
     

    </CustomBackground>

  )
}

export default Reportview

const styles = StyleSheet.create({
  
    image: {
        flex: 1,
       
    },
})