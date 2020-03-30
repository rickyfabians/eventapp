import React from 'react'
import { View, Image, Dimensions, ScrollView } from 'react-native'
import { Title, Button, Subheading, Badge } from 'react-native-paper'
import isEmpty from 'lodash/isEmpty'

// Redux
import { useDispatch } from 'react-redux'

const { width } = Dimensions.get('screen')
const EventDetails = ({ navigation, route }) => {
  const { item = {} } = route.params || {}
  const dispatch = useDispatch()
  const addTracker = () => {
    dispatch({ type: 'TRACKER_ADD', payload: item })
    navigation.openDrawer()
  }
  if (isEmpty(item)) return null
  return <View style={{ flex: 1 }}>
    <ScrollView>
      <Image source={{ uri: item.imageUrl }} style={{ width, height: width }} />
      <View style={{ padding: 10 }}>
        <Title>{item.name}</Title>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Subheading>{item.location}</Subheading>
          <Badge size={30}>{item.entryType}</Badge>
        </View>
      </View>
    </ScrollView>
    <Button mode={'contained'} onPress={() => addTracker()}>Tracking</Button>
  </View>
}

export default EventDetails
