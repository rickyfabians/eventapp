import React from 'react'
import { View, FlatList } from 'react-native'
import { Title, Card, Button, Subheading, Badge } from 'react-native-paper'
import { View as ViewAnimated } from 'react-native-animatable'

// redux
import { useSelector, useDispatch } from 'react-redux'

const Tracker = props => {
  const { navigation } = props
  const { data } = useSelector(state => state.tracker)
  const dispatch = useDispatch()
  return <View style={{ padding: 10, flex: 1 }}>
    <Title>Tracker</Title>
    <FlatList
      data={data}
      renderItem={({ item }) =>
        <ViewAnimated useNativeDriver animation='fadeInUpBig' easing='ease-out-expo' style={{ flex: 1, margin: 5 }}>
          <Card onPress={() => navigation.navigate('EventDetails', { item })} >
            <Card.Cover source={{ uri: item.imageUrl }} />
            <Card.Content>
              <Subheading>{item.name}</Subheading>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Subheading>{item.location}</Subheading>
                {item.entryType === 'paid' && <Badge size={25}>{'$$$'}</Badge>}
              </View>
            </Card.Content>
          </Card>
          <Button mode='contained' style={{ marginVertical: 5 }} onPress={() => dispatch({ type: 'TRACKER_REMOVE', payload: item.name })}>Remove</Button>
        </ViewAnimated>}
      keyExtractor={(item, index) => `${index}${item}`}
    />
  </View>
}

export default Tracker
