import { ImageBackground, StyleSheet, Text, View } from "react-native";
const CustomBackground = ({children}) => {


  return (
    <ImageBackground source={require('../images/homebg.png')} style={styles.image}>
      {children}
    </ImageBackground>
  )
}

export default CustomBackground

const styles = StyleSheet.create({
 
  image: {
    flex: 1,
  }
})