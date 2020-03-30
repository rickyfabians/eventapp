import React, { useState, useEffect } from 'react'
import { View, FlatList, TouchableOpacity, Modal } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { View as ViewAnimated } from 'react-native-animatable'
import { Title, Card, Avatar, Headline, Subheading, Badge, TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import data from '../models/events'

const Home = props => {
  const { navigation } = props
  const [numColumns, setNumColumns] = useState(1)
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const changeColumns = () => {
    if (numColumns === 1) setNumColumns(2)
    else setNumColumns(1)
  }

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('username', name)
    } catch (error) {
      // Error saving data
    }
  }

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('username')
      if (isEmpty(value)) setVisible(true)
      else setName(value)
    } catch (error) {
      // Error retrieving data
    }
  }

  const updateUserName = () => {
    if (!isEmpty(name)) {
      storeData()
      setVisible(false)
    }
  }

  useEffect(() => {
    retrieveData()
  }, [])

  return <View style={{ flex: 1 }}>
    <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 10 }}>
      <View>
        <Headline>{`Hallo, ${name}`}</Headline>
        <Subheading>{'World'}</Subheading>
      </View>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Avatar.Text size={40} label={name.charAt(0)} />
      </TouchableOpacity>
    </View>
    <FlatList
      data={data}
      numColumns={numColumns}
      key={numColumns}
      renderItem={({ item, index }) =>
        <ViewAnimated delay={index} useNativeDriver animation='fadeInUpBig' easing='ease-out-expo' style={{ flex: 1, margin: 5 }}>
          <Card onPress={() => navigation.navigate('EventDetails', { item })} >
            <Card.Cover source={{ uri: item.imageUrl }} />
            <Card.Title title={item.name} subtitle={item.location} />
            <Card.Content>
              {item.entryType === 'paid' && <Badge size={25}>{'$$$'}</Badge>}
            </Card.Content>
          </Card>
        </ViewAnimated>}
      keyExtractor={(item, index) => `${index}${item}`}
    />
    <TouchableOpacity
      onPress={changeColumns}
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 100
      }}
    >
      <Subheading>{numColumns === 2 ? 'List' : 'Grid'}</Subheading>
    </TouchableOpacity>
    <Modal visible={visible} animationType='slide'>
      <View style={{ padding: 10 }}>
        <Title>Hallo</Title>
        <TextInput
          maxLength={8}
          label='Name'
          placeHolder='Ex: ricky'
          mode={'Outlined'}
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => updateUserName()}
        />
      </View>
    </Modal>
  </View>
}

export default Home
