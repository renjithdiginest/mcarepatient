import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Op from '../screens/Op';
import Department from '../screens/Op/Department';
import IndividualDoctor from '../screens/Op/Department/IndividualDoctor';
import BookAppointment from '../screens/Op/Department/IndividualDoctor/BookAppointment';
import AppointmentPay from '../screens/Op/Department/IndividualDoctor/BookAppointment/AppointmentPay';
import BookedAppointMent from '../screens/Op/Department/IndividualDoctor/BookAppointment/AppointmentPay/BookedAppointMent';
import PatientMapping from '../screens/Drawer/PatientMapping';
import AddPatient from '../screens/Drawer/PatientMapping/AddPatient';
import Otp from '../screens/Drawer/PatientMapping/Otp';
import ServiceBooking from '../screens/Drawer/ServiceBooking';
import BookingPayment from '../screens/Drawer/ServiceBooking/BookingPayment';
import BookedService from '../screens/Drawer/ServiceBooking/BookedService';
import Blog from '../screens/Drawer/Blog';
import ReportReview from '../screens/Drawer/ReportReview';
import DepartmentList from '../screens/Drawer/ReportReview/DepartmentList';
import ProcedureBooking from '../screens/Drawer/ProcedureBooking';
import BookedProcedure from '../screens/Drawer/ProcedureBooking/BookedProcedure';
import ProcedureBookingPayment from '../screens/Drawer/ProcedureBooking/ProcedureBookingPayment';
import DepartmentReport from '../screens/Drawer/ReportReview/Departments';
import Booking from '../screens/Online/Booking';


const Stack = createNativeStackNavigator();

const OpNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Op'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Op" component={Op}/>
            <Stack.Screen name="Department" component={Department}/>
            <Stack.Screen name="IndividualDoctor" component={IndividualDoctor}/>
            <Stack.Screen name="BookAppointment" component={BookAppointment}/>
            <Stack.Screen name="AppointmentPay" component={AppointmentPay}/>
            <Stack.Screen name="BookedAppointMent" component={BookedAppointMent}/>
            <Stack.Screen name="PatientMapping" component={PatientMapping}/>
            <Stack.Screen name="AddPatient" component={AddPatient}/>
            <Stack.Screen name="OtpPatient" component={Otp}/>
            <Stack.Screen name="Blog" component={Blog}/>
            <Stack.Screen name="ServiceBooking" component={ServiceBooking}/>
            <Stack.Screen name="BookedService" component={BookedService}/>
            <Stack.Screen name="ReportReview" component={ReportReview}/>
            <Stack.Screen name="BookingPayment" component={BookingPayment}/>
            <Stack.Screen name="DepartmentList" component={DepartmentList}/>
            <Stack.Screen name="ProcedureBooking" component={ProcedureBooking}/>
            <Stack.Screen name="BookedProcedure" component={BookedProcedure}/>
            <Stack.Screen name="DepartmentReport" component={DepartmentReport}/>
            <Stack.Screen name="ProcedureBookingPayment" component={ProcedureBookingPayment}/>
            <Stack.Screen name="Booking" component={Booking}/>
        </Stack.Navigator>
    )
}

export default OpNavigation

const styles = StyleSheet.create({})