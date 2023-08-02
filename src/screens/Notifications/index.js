import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomBackground from '../../components/CustomBackground'
import { Box, FlatList, Spinner } from 'native-base'
import CommonHeading from '../../components/CommonHeading'
import { useDispatch, useSelector } from 'react-redux'
import customAxios from '../../CustomeAxios'
import NotificationCard from './NotificationCard'
import { LOADING } from '../../Redux/constants/authConstants'
import reactotron from 'reactotron-react-native'
import NotificationContext from '../../context/Notification'


const Notifications = ({ navigation }) => {

    const { height, width } = useWindowDimensions()

    const dispatch = useDispatch()
    const Notification = useContext(NotificationContext)
    const [notifications, setNotifications] = useState([])

    const { user, loading } = useSelector(state => state.auth)




    useEffect(() => {
        getNotificationsList()
    }, [])

    const getNotificationsList = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })

        

        let data = {
            user_id : user?._id
        }

        await customAxios.post(`patient/notifications`, data)
            .then(async response => {
                setNotifications(response?.data?.data)
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
            .catch(async error => {
                
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }

    const updateNotificationStatus = async(id) => {
        let data = {
            id : id
        }
        await customAxios.post(`patient/update-notification`, data)
        .then(async response => {
            setNotifications((prev) => prev.map(no => {
                if(no._id === id){
                    return {
                        ...no,
                        status: 'read'
                    }
                }
                else{
                    return no
                }
            }))
            
        })
        .catch(async error => {
        })
    }


    useEffect(()=>{
        if(notifications){
            let noti = notifications.filter((res)=>res?.status === 'unread')
            Notification.setNotificationList(noti?.length)
        }
    },[notifications])

    const renderItems = ({item}) => (
        <NotificationCard 
            item={item}
            updateNotificationStatus={(id) => updateNotificationStatus(id)}
        />
    )
    

    return (
        <CustomBackground>
            <Box px={5} pt={5} >
                <CommonHeading label={'Notifications'}  goBack={()=>navigation.goBack()}/>
      
                    <FlatList 
                        data={notifications}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItems}
                        showsVerticalScrollIndicator={false}
                    />
            </Box>

        </CustomBackground>
    )
}

export default Notifications

const styles = StyleSheet.create({})