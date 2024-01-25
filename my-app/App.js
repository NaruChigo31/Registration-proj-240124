import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from "react";

export default function App() {

  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const [errText, setErrText] = useState("")


  const changeLogin = (value) => {
    setLogin(value)
  }

  const changePassword = (value) => {
    setPassword(value)
  }

  const register = () => {
    const data = JSON.stringify({"username": login, "password": password})
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: data
    }).then((resp)=>{
      return resp.json()
    }).then((answer)=>{
      // console.log(answer["message"])
      setErrText(answer["message"])
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.registration}>Registration</Text>
        <TextInput style={styles.formInput} placeholder='Username' value={login} onChangeText={changeLogin} />
        <TextInput style={styles.formInput} placeholder='Password' value={password} onChangeText={changePassword} />
        <Text style={styles.errorText}>{errText}</Text>
        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BF3131',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 35
  },
  form:{
    display:"flex",
    height:424,
    paddingVertical:20,
    paddingHorizontal:40,
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor: "#EAD196",
    maxWidth: 370,
    width: "80%"
  },
  registration:{
    color: "#7D0A0A",
    fontFamily: "Inter",
    fontSize: 36,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  formInput:{
    backgroundColor: "#F3EDC8",
    display: "flex",
    padding: 10,
    wight:"90%",
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch",
    color: "#7D0A0A",
    fontFamily: "Inter",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal"
  },
  errorText:{
    color: "#BF3131",
    fontFamily: "Inter",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal"
  },
  button:{
    display: "flex",
    width: "80%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#7D0A0A",
  },
  buttonText:{
    color: "#EAD196",
    fontFamily: "Inter",
    fontSize: 36,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  }
});
