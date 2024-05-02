import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'

import { BouncyCheckboxHandle } from 'react-native-bouncy-checkbox'



//Form validation
import*as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PasswordShema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'should be min of 4 character')
  .max(16, 'should be ma of 16 character')
  .required('length is required')
})


export default function App() {

const [password, setPassword] = useState('')
const [isPassGenerated, setIsPassGenerated] =
useState(false)

const [lowerCase,setLowerCase] = useState (true)
const [upperCase, setUpperCase] = useState(false)
const [numbers, setNumbers] =useState(false)
const [symbols, setSymbols] = useState(false)



const generatePasswordString = (passwordLength:number) => {
  
let characterList ='';

const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseChars='abcdefghijklmnopqrstuvwxyz';
const digitChars = '0123456789';
const specialChars = ' !@#$%^&*()_+';


if (upperCase) {
  characterList += upperCaseChars
}

if (lowerCase) {
  characterList += lowerCaseChars
}

if (numbers){
  characterList += digitChars
}

if (symbols){
  characterList += specialChars
}

const passwordResult = createPassword(characterList,passwordLength)

setPassword(passwordResult)
setIsPassGenerated(true)

}

const createPassword = (characters:string, passwordLength: number) =>{


  let result = ''
  for (let i = 0; i < passwordLength; i++) {
    const characterIndex = Math.round(Math.random()*characters.length)
    result += characters.charAt(characterIndex)
    
  }
return result

}

const resetPasswordState = ()=>{


  setPassword ('')
  setIsPassGenerated(false)
  setLowerCase(true)
  setUpperCase(false)
  setNumbers(false)
  setSymbols(false)
}

  return (
    <ScrollView keyboardShouldPersistTaps ="handled">
      <SafeAreaView style ={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>

          <Formik
       initialValues={{ passwordLength:'' }}
      validationSchema={PasswordShema}

       onSubmit={values => {

        console.log(values);
        
        
        generatePasswordString (+ values.passwordLength) 


       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style ={styles.inputWrapper}>
          <View style ={styles.inputColumn}>

            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength &&(
              <Text style={styles.errorText}>
                (errors.passwordLength)
              </Text>
            )}

            </View>
                     <TextInput 
            style ={styles.inputStyle}
            value ={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex.8"
            keyboardType='numeric'
            />

         </View>
         <View style ={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox 
          
          
          isChecked={lowerCase}
          onPress={()=>setLowerCase(!lowerCase)}
          fillColor="#29AB87"


          />
          
         </View>
         <View style ={styles.inputWrapper}>
          <Text style={styles.heading}>Include UpperCase</Text>
          <BouncyCheckbox 
          
          
          isChecked={upperCase}
          onPress={()=>setUpperCase(!upperCase)}
          fillColor="#29AB87"


          />
          
         </View>
    
         <View style ={styles.inputWrapper}>
          <Text style={styles.heading}>Include Numbers</Text>
          <BouncyCheckbox 
          
          
          isChecked={numbers}
          onPress={()=>setNumbers(!numbers)}
          fillColor="#29AB87"


          />
          
         </View>

         <View style ={styles.inputWrapper}>
          <Text style={styles.heading}>Include Symbols</Text>
          <BouncyCheckbox 
          
          
          isChecked={symbols}
          onPress={()=>setSymbols(!symbols)}
          fillColor="#29AB87"


          />
          
         </View>


         <View style ={styles.inputWrapper}></View>
         <View style ={styles.inputWrapper}></View>
         <View style ={styles.inputWrapper}></View>

         <View style={styles.formActions}>

          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          /* onPress={handleSubmit} */
          
          >
            <Text  style={styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>

          <TouchableOpacity
           style={styles.secondaryBtn}
           onPress={()=>{
            handleReset();
            resetPasswordState()


           }}
          >
            <Text style={styles.secondaryBtnTxt}> Reset</Text></TouchableOpacity>


         </View>
         </>


       )}
     </Formik>

        </View>

      {isPassGenerated ? (

        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.subTitle}>Result:</Text>
          <Text style={styles.description}>Long Press to copy</Text>
          <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          

      
        </View>


      ):null}


      </SafeAreaView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  appContainer: {
    flex:1,
  },

formContainer:{
  margin: 8,
  padding: 8,
},

  title: {
    fontSize:32,
    fontWeight:'600',
    marginBottom:15,
  },
  subTitle: {
    fontSize:26,
    fontWeight:'600',
    marginBottom:2,

  },
  description:{
    backgroundColor:'skyblue',
    color:'#758283',
    marginBottom:8,

  },

  heading:{
    fontSize:15,

  },
  primaryBtnTxt:{
    color:"white",

    
  },
  secondaryBtnTxt:{
    color:"black",
    
  },
  secondaryBtn:{
    backgroundColor:'gold',
   borderRadius:3
  },

  primaryBtn:{
    backgroundColor:'darkgreen',
    borderRadius:3
  },

  formActions:{
    
      padding:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-evenly'
  
  },
  
  inputWrapper:{
    padding:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  inputStyle:{
    color:'white',
    fontStyle:"italic",
    fontWeight:'600',
    

  },
  inputColumn:{},
  errorText:{
    color:'red'
  },

  cardElevated:{
    backgroundColor:'white',
    elevation: 3,
    shadowOffset:{
        width:1,
        height:1,},
    shadowColor:'#333',
  },
  generatedPassword:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    marginBottom:3,
    backgroundColor:'#8D3DAF',
    padding:4,
    borderRadius:10,

},
card:{
  borderRadius:3,
  backgroundColor:'white'
},


  
})