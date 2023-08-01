import { ImageBackground, StyleSheet } from "react-native";
import React from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import backgroundImage from "../../images/maskgroup.png"
import CustomLogo from "../../components/CustomLogo";
import CustomInput from "../../components/CustomInput";
import mail from "../../images/email.png"
import { useForm } from "react-hook-form";


// import { yupResolver } from 'react-hook-form-resolvers';
import * as yup from "yup";
const Forget = ({navigation}) => {
    const schema = yup.object({

    }).required({navigation});

    const { control, handleSubmit, formState: { errors } } = useForm({
        // resolver : yupResolver(schema)
    });
    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box alignItems={'center'} px={5} pt={10}>
                    <CustomLogo size={140} />
                    <HStack justifyContent={'space-between'}>
                        <Text color={'#444444'} fontFamily='body' fontWeight={700} letterSpacing={1} fontSize={25} mt={5}>Forgot Password</Text>
                    </HStack>
                    <Text color={'#444444'} fontFamily='body' textAlign={'center'} px={6} letterSpacing={1} fontSize={16} mt={5}>Please enter your registered email address</Text>
                    <CustomInput
                        control={control}
                        error={errors.email}
                        fieldName="email"
                        paddingLeft={20}
                        placeholder='EMAIL ADDRESS'
                        leftIconName={mail}
                        topRadius={50}
                    />
                    <Box w={60} alignItems={'center'} pt={8}>
                        <Button  onPress={()=>navigation.navigate('login')}>
                            <Image source={require('../../images/login-svgrepo-com.png')}
                                alt="image" resizeMode='contain' alignSelf='center' />
                        </Button>
                    </Box>
                </Box>
            </ScrollView>
        </ImageBackground>
    )
}

export default Forget

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    box: {
        flex: 1,
        justifyContent: "center"
    }
})