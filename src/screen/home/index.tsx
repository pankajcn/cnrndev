/* eslint-disable prettier/prettier */
/*
 * React Native App
 * Developed and maintained by capital numbers
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {AppHeader} from '../../navigation';
import styles from './style';

const Home = (props: any) => {
  let numbers = new Array(1000);

  const [record, setRecord] = useState<string[]>([]);

  useEffect(() => {
    AppHeader({
      ...props,
      isMenu: true,
      title: 'Home',
      leftClick: () => {},
      rightClick: () => {},
    });

    for (let i = 0; i <= 1000; i++) {
      numbers[i] = {key: i, value: i};
      // numbers.push({key: i, value: i});
    }

    numbers.map((item: any): any => {
      if (
        item.value % 5 === 0 &&
        item.value % 20 !== 0 &&
        item.value % 100 !== 0
      ) {
        item.value = 'beep';
      }
      if (item.value % 20 === 0 && item.value % 100 !== 0) {
        item.value = 'boop';
      }
      if (item.value % 100 === 0) {
        item.value = 'beep boop';
      }
    });
    setRecord(numbers);
    return () => {};
  }, []);

  //UI Rendering
  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => console.log('onpress')}
        style={[styles.backView]}>
        <Text numberOfLines={2} style={styles.txt}>
          {item.item.value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        numColumns={1}
        extraData={record}
        data={record}
        bounces={false}
        showsHorizontalScrollIndicator={true}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('UserList')}
        style={[styles.bottomView]}>
        <Text numberOfLines={2} style={styles.bottomTxt}>
          {'Display'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
