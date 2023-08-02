import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import DrawerContent from './DrawerContent';
import TabNavigator from './TabNavigator';
import BlogSingleView from '../screens/Op/BlogView';
import PatientMapping from '../screens/Drawer/PatientMapping';
import ServiceBooking from '../screens/Drawer/ServiceBooking';
import LoadingModal from '../components/LoadingModal';
import DoctorDetails from '../screens/Drawer/ReportReview/Departments/DoctorDetails';
import BookAppointmentReport from '../screens/Drawer/ReportReview/Departments/BookAppointment';
import ReportView from '../screens/Drawer/ReportReview/ReportView';



const Drawer = createDrawerNavigator();

const Menu = () => {


  const { loading } = useSelector(state => state.auth)
  const [showModal, setShowModal] = useState(false)

    useEffect(()=>{

        if(loading){
            setShowModal(true)
        }else{
            setShowModal(false)
        }

    }, [loading])


  return (

    <>

      <Drawer.Navigator
        initialRouteName='tab'
        // swipeEnabled={true}
        // swipeEdgeWidth={true}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          // swipeEdgeWidth: 2
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >

        <Drawer.Screen name="tab" component={TabNavigator} />
        <Drawer.Screen name="blogsView" component={BlogSingleView} />
        <Drawer.Screen name="DoctorDetails" component={DoctorDetails} />
        <Drawer.Screen name="BookAppointmentReport" component={BookAppointmentReport} />
        <Drawer.Screen name="ReportView" component={ReportView} />

        {/* <Drawer.Screen name="ServiceBooking" component={ServiceBooking}/> */}


            
        </Drawer.Navigator>
        <LoadingModal isVisible={showModal}/>
        
    </>



  )
}

export default Menu

const styles = StyleSheet.create({})