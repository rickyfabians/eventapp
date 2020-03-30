
import * as React from 'react'
import { View, Text } from 'react-native'
import Home from '../screens/Home'
import EventDetails from '../screens/EventDetails'
import Tracker from '../components/Tracker'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition='right'
      drawerContent={props => <Tracker {...props} />}
      headerMode='none'
    >
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='EventDetails' component={EventDetails} />
    </Drawer.Navigator>
  )
}
function App () {
  return (
    <NavigationContainer>
      {DrawerNavigator()}
    </NavigationContainer>
  )
}

export default App
