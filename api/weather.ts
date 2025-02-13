import { useQuery } from 'react-query';
//import { API_KEY } from '@env';
import { API_KEY } from "react-native-dotenv"

export const useGetWeather=(city:string)=>{

    const getWeatherRequest=async()=>{
        const response=await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
        console.log(process.env.API_KEY)
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
         
        return response.json()
    }

    const {data,isLoading,isError}=useQuery('weather',getWeatherRequest)

    return {data,isLoading,isError}
}

export const useGetLocations=(cityText:string)=>{

    const getLocationsRequest=async()=>{
        const response=await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${cityText}`)
       
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
         
        return response.json()
    }

    const {data,isLoading,isError}=useQuery('locations',getLocationsRequest)

    return {data,isLoading,isError}
}

export const useGetForecast=(city:string)=>{

    const getForecastRequest=async()=>{
        const response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`)
       console.log(process.env.API_KEY)
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
         
        return response.json()
    }

    const {data:forecastData,isLoading:forecastLoading,isError:forecastError}=useQuery('forecast',getForecastRequest)

    return {forecastData,forecastLoading,forecastError}
}