import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Platform, Text, View, TextInput, Touchable, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function HomeScreen() {

  const locations = [
    {
      id: 1,
      name: 'London',
      country: 'United Kingdom'
    },
    {
      id: 2,
      name: 'New York',
      country: 'United States'
    },
    {
      id: 3,
      name: 'Paris',
      country: 'France'
    },
    {
      id: 4,
      name: 'Tokyo',
      country: 'Japan'
    }
  ]
  
  const [City,setCity]=useState("");
  const [showInput, setShowInput] = useState(false);
  const [location, setLocation] = useState(locations);

  const toggleInput = () => {
    setShowInput((prev)=>!prev);
  }

  const searchCity = () => {
    
    ;
  }


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
              onChangeText={setCity} 
              placeholder='Search a City' 
              className=' flex-1 h-10 text-xs rounded-2xl px-2 focus:outline-none text-black  ' 
              textAlignVertical='center'                                     
              />
            )}
            <TouchableOpacity className='bg-white h-12 w-12 rounded-2xl flex justify-center items-center' onPress={() => toggleInput()}>
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          
          </View>

          {showInput && location.length>0 ? (

            <FlatList
              className='px-2'
              showsHorizontalScrollIndicator={false}
              data={location}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className='bg-white rounded-xl p-2 border-b border-black flex justify-between items-center flex-row'>
                  <View className='flex flex-row items-center gap-2'>
                    <FontAwesome name="map-marker" size={18} color="black" />
                    <Text className='text-lg'>{item.name}</Text>
                  </View>
                  
                  <Text className='text-sm'>{item.country}</Text>
                </View>
              )}/> 
          ) : (
            <View className='flex-1 flex justify-center items-center'>
              <Text className='text-white text-lg'>No City Found</Text>
            </View>            
          )}           
        
        </View>
      </SafeAreaView>
      
      
    </View>
  );
}

