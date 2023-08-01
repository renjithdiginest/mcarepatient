import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomBackground from '../../../components/CustomBackground'
import CommonHeading from '../../../components/CommonHeading'
import { Box } from 'native-base'
import ConsultationStatus from './ConsultationStatus'
import reactotron from '../../../ReactotronConfig'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { LeaveFilter } from '../../../Redux/actions/profileActions'

const Consultaions = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.auth);
  const { leaveList, error } = useSelector(state => state.profile);

  reactotron.log(leaveList,'leaveList')


  useEffect(() => {
    if (user) {
      let val = {
        date: moment(new Date()).format("YYYY-MM-DD"),
        doctor_id: user?._id

      }
      dispatch(LeaveFilter(val))
    }

  }, [])

 


  return (
    <CustomBackground>
      <Box px={6} pt={5}>
        <CommonHeading label={'Consultations'} goBack={() => navigation.goBack()} />
        <Box mt={8}>
          <ConsultationStatus label={'OP Consultation'}
            available={leaveList?.[0]?.type?.includes('Op')}
            leave={leaveList}
          />
          <ConsultationStatus label={'Online Consultation'}
            available={leaveList?.[0]?.type?.includes('Online')}
            leave={leaveList}
          />
          <ConsultationStatus label={'Report Review'}
            available={leaveList?.[0]?.type?.includes('Report')}
            leave={leaveList}
          />
        </Box>
      </Box>
    </CustomBackground>
  )
}

export default Consultaions

const styles = StyleSheet.create({})