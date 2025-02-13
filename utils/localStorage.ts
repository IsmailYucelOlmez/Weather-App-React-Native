import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData=async()=>{

    try {
        const value=await AsyncStorage.getItem('city')
        const defaultValue='London'
        if(value===null){
            saveData(defaultValue)
            return defaultValue
        }
        return value 
    } catch (error) {
        console.log(error)
    }
}

export const saveData=async(value:string)=>{
    try {
        await AsyncStorage.setItem('city',value)
    } catch (error) {
        console.log(error)
    }
    
}