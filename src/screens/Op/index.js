import React, { useState, useEffect, useContext } from 'react'
import { ImageBackground, StyleSheet, useWindowDimensions, View, } from "react-native";
import { Box, Text, Image, ScrollView, Icon, FlatList, Pressable, HStack, VStack, Center } from 'native-base'
import CustomBackground from '../../components/CustomBackground';
import ImagesSlider from './ImageSlider';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BlogSlider from './BlogSlider';
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs, getDeptlist, getUpcomingAppointment } from '../../Redux/actions/homeActions';
import reactotron from '../../ReactotronConfig';
import UpcomingConsultCard from './UpcomingConsultCard';
import DepartmentsCard from './DepartmentsCard';
import moment from 'moment';
import DocterCard from '../Online/DocterCard'
import NotificationContext from '../../context/Notification';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';


const Op = ({ navigation }) => {

    const dispatch = useDispatch()

    const [currentTab, setCurrentTab] = useState(0)
    const { width, height } = useWindowDimensions()
    const { user, loading } = useSelector(state => state.auth);
    const { deptList, upcomAppointList, blogList } = useSelector(state => state.home);
    const [index, setIndex] = useState(0)
    const [upcoming, setUpcoming] = useState([])
    const progressValue = useSharedValue(0);
    const Notification = useContext(NotificationContext)





    // useFocusEffect(() => {
    //    
    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getDeptlist(user?._id))
        }, [])
    );
   


    useEffect(() => {
        if (deptList) {
            Notification.setNotificationList(deptList?.notification);
            let services = deptList?.upcomming?.service?.map(ser => {
                return {
                    ...ser,
                    type: 'service'
                }
            })

            let procedures = deptList?.upcomming?.procedure?.map(ser => {
                return {
                    ...ser,
                    type: 'procedure'
                }
            })

            let consultations = deptList?.upcomming?.consultation?.map(ser => {
                return {
                    ...ser,
                    type: 'consultation'
                }
            })

            let lists = [...services, ...procedures, ...consultations]

            let List = lists?.sort(function (a, b) {
                return moment(`${b.date}`, "DD-MM-YYYY") - moment(`${a.date}`, "DD-MM-YYYY");
            });
            setUpcoming(List)
        }
    }, [deptList])



    const renderItems = ({ item }) => {

        return (

            <DepartmentsCard item={item} />
        )
    }

    const renderUpcoming = ({ item }) => {

        return (

            <DocterCard item={item} />
        )
    }

    const renderBlogs = ({ item, index }) => {
        return (
            <BlogSlider item={item} />
        )
    }

    return (

        <CustomBackground>

            <ScrollView showsVerticalScrollIndicator={false}>

                <HStack alignItems={'center'} justifyContent='space-between' mx={5}>
                    <Box>
                        <Text
                            color={'#444444'} fontWeight={300} fontFamily="body" fontSize={22} mt={2}
                        >Welcome!</Text>
                        <Text
                            color={'#444444'} fontWeight={700} fontFamily="body" fontSize={25} mb={5} letterSpacing={1}
                        >{user?.name}</Text>
                    </Box>
                    <Image
                        source={{ uri: user?.image }}
                        borderRadius={20}
                        height={70}
                        width={70}
                        alt='name'
                    >
                    </Image>
                </HStack>
                <ImagesSlider images={deptList?.slide} />
                <Box >
                    {deptList?.department && <Text
                        m={5}
                        color={'#444444'} fontWeight={600} fontFamily="body" fontSize={23} mb={5}
                    >Our Departments</Text>}

                    <FlatList
                        data={deptList?.department}
                        keyExtractor={(item) => item?._id}
                        renderItem={renderItems}
                        numColumns={4}
                    />
                    {upcoming?.length > 0 && <Text px={5} py={3}
                        color={'#444444'} fontWeight={600} fontFamily="body" fontSize={23}
                    >Upcoming Appointment</Text>}


                    <FlatList
                        data={upcoming}
                        keyExtractor={(item) => item?._id}
                        // showsHorizontalScrollIndicator={false} 
                        mx={5}
                        renderItem={renderUpcoming}
                    />

                    {deptList?.blog?.length > 0 && <Text
                        m={5}
                        color={'#444444'} fontWeight={600} fontFamily="body" fontSize={23}
                    >Blogs</Text>}

                </Box>


                {/* <FlatList
                    data={deptList?.blog}
                    horizontal={true}
                    pagingEnabled
                    // showsHorizontalScrollIndicator={false} 
                    renderItem={renderBlogs}
                    mb={5}
                /> */}
                <Carousel
                    pagingEnabled={true}
                    snapEnabled={true}
                    vertical={false}
                    autoPlayInterval={1500}
                    onProgressChange={(_, absoluteProgress) =>
                        (progressValue.value = absoluteProgress)
                    }

                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    loop
                    width={width}
                    height={width / 1}
                    autoPlay={true}
                    data={deptList?.blog}

                    renderItem={renderBlogs}
                />

                <HStack justifyContent={"center"} pb={5} top={-10} >
                    {deptList?.blog.map((data, i) => {
                        return (

                            <PaginationItem
                                backgroundColor={'#000'}
                                animValue={progressValue}
                                index={i}
                                key={i}
                                isRotate={false}
                                length={deptList?.blog.length}
                            />

                        );
                    })}
                </HStack>
            </ScrollView>
        </CustomBackground>

    )
}

const PaginationItem = (props) => {
    const { animValue, index, length, backgroundColor, isRotate } = props;
    const width = 10;

    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP,
                    ),
                },
            ],
        };
    }, [animValue, index, length]);
    return (
        <View
            style={{
                backgroundColor: "white",
                width,
                height: width,
                borderRadius: 50,
                overflow: "hidden",
                transform: [
                    {
                        rotateZ: isRotate ? "90deg" : "0deg",
                    },
                ],
            }}
        >
            <Animated.View
                style={[
                    {
                        borderRadius: 50,
                        backgroundColor,
                        flex: 1,
                    },
                    animStyle,
                ]}
            />
        </View>
    );
};
export default Op

const styles = StyleSheet.create({

    image: {
        flex: 1,

    },
})