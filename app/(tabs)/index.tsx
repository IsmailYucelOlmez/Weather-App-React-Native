import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useGetForecast, useGetLocations, useGetWeather } from '@/api/weather';
import debounce from "lodash/debounce"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, saveData } from '@/utils/localStorage';


export default function HomeScreen() {
  
  const [City,setCity]=useState("");
  const [showInput, setShowInput] = useState(false);
  const [locations, setLocations] = useState([]);

  const toggleInput = () => {
    setShowInput((prev)=>!prev);
  }

  const searchCity = (city:string) => {
    setCity(city);
    saveData(city);
  }

  const changeText=(value:string)=>{

    if(value.length>2){
      const {data,isLoading,isError}=useGetLocations(value);
      setLocations(data);
    }
  }

  const getLocalValue=async()=>{
    const localValue = await getData();   
    if(localValue){
      setCity(localValue)
    }
  }

  const {data,isLoading,isError}=useGetWeather(City);
  const {forecastData,forecastLoading,forecastError}=useGetForecast(City);
  const textBounce=useCallback(debounce(changeText,1000),[])

  useEffect(()=>{
    getLocalValue();
  },[])


  return (
    <View className='flex-1 relative'>
      <StatusBar style='light' />

      <Image source={require('../../assets/images/bg.png')} className='w-full h-full absolute' />

      <SafeAreaView className='flex'>
        <View>
          <View className={`m-2 ${showInput ? 'bg-white ':''} rounded-2xl flex flex-row justify-end items-center`}>
            {showInput && (
              <TextInput 
              value={City} 
              onChangeText={textBounce} 
              placeholder='Search a City' 
              className=' flex-1 h-10 text-xs rounded-2xl px-2 focus:outline-none text-black  ' 
              textAlignVertical='center'                                     
              />
            )}
            <TouchableOpacity className='bg-white h-12 w-12 rounded-2xl flex justify-center items-center' onPress={() => toggleInput()}>
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          
          </View>

          {showInput && locations.length>0 ? (

            <FlatList
              className='px-2'
              showsHorizontalScrollIndicator={false}
              data={locations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>searchCity(item.name)} className='bg-white rounded-xl p-2 border-b border-black flex justify-between items-center flex-row'>
                  <View className='flex flex-row items-center gap-2'>
                    <FontAwesome name="map-marker" size={18} color="black" />
                    <Text className='text-lg'>{item.name}</Text>
                  </View>
                  
                  <Text className='text-sm'>{item.country}</Text>
                </TouchableOpacity>
              )}/> 
          ) : (
            <View className='flex-1 flex justify-center items-center'>
              <Text className='text-white text-lg'>No City Found</Text>
            </View>            
          )}           
        
        </View>

        <View>
          <Text className='text-white text-center'>{data?.name}, <Text className='text-sm text-white'>{data?.country}</Text></Text>

          <View className='flex justify-center items-center'>
            <Image source={require('../../assets/images/cloud.png')} className='w-40 h-40' />
            <Text className='text-white text-center text-lg'>{data?.temp_c}</Text>
            <Text className='text-white text-center text-sm'>Cloudy</Text> 
          </View>
        </View>

        <View className='flex flex-row justify-around items-center'>
          
          <View className='flex flex-col items-center'>
            <Image source={require('../../assets/icons/drop.png')} className='w-10 h-10' />
            <Text className='text-white text-lg'>%23</Text>  
          </View>

          <View className='flex flex-col items-center'>
            <Image source={require('../../assets/icons/wind.png')} className='w-10 h-10' />
            <Text className='text-white text-lg'>23 Km</Text>
          </View>

          <View className='flex flex-col items-center'>
            <Image source={require('../../assets/icons/sun.png')} className='w-10 h-10' />
            <Text className='text-white text-lg'>25°C</Text>
          </View>

        </View>  

        <View>
          <View>

          </View>

          <View className='flex-1'>
            <View>
              <Text className='text-white text-lg'>Today Forecast</Text>
            </View>
            

            { !forecastLoading ? (

            <FlatList
              className='px-2'
              showsHorizontalScrollIndicator={false}
              data={locations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className='bg-white rounded-xl p-2 border-b border-black flex justify-between items-center flex-row'>
                  <View className='flex flex-row items-center gap-2'>
                    <Image source={require('../../assets/icons/drop.png')} className='w-10 h-10' />
                    <Text className='text-white text-lg'>23 C</Text>  
                  </View>
                  
                  <Text className='text-sm'>Pazartesi</Text>
                </View>
              )}/> 
          ) : (
            <View className='flex-1 flex justify-center items-center'>
              <Text className='text-white text-lg'>Loading</Text>
            </View>            
          )}    
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

