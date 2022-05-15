import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import axios from 'axios';

const Home = ({navigation}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setIsFetching(true);
    const result = await axios.get(
      'https://api.spacexdata.com/v3/launches?limit=100',
    );
    setData(result.data);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRenderItem = ({item}) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('Details', {item})}>
        <View style={styles.innerContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{uri: item.links.mission_patch}}
          />
          <View style={styles.rowCont}>
            <Text
              style={StyleSheet.flatten([
                styles.headerText,
                styles.colorText,
                styles.h1,
              ])}>
              {item.mission_name} #{item.flight_number}
            </Text>
          </View>

          <View style={{marginBottom: 5}}>
            <Text style={styles.headerText}>Mission Ids :</Text>
            <View style={styles.listItemContainer}>
              {item.mission_id.length === 0 ? (
                <Text style={styles.lightDarkText}> No Mission Id's</Text>
              ) : (
                item.mission_id.map((item, index) => (
                  <Text style={styles.lightDarkText} key={index}>
                    {'\u2B24'} {item}
                  </Text>
                ))
              )}
            </View>
          </View>
          <View style={styles.rowCont}>
            <Text style={styles.headerText}>Launch Year :</Text>
            <Text style={styles.lightDarkText}> {item.launch_year}</Text>
          </View>

          <View style={styles.rowCont}>
            <Text style={styles.headerText}>Successful Launch :</Text>
            <Text style={styles.lightDarkText}>
              {' '}
              {item.launch_success ? 'True' : 'False'}
            </Text>
          </View>

          <View style={styles.rowCont}>
            <Text style={styles.headerText}>Successful Landing :</Text>
            <Text style={styles.lightDarkText}> {'Unknown'}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const handleEmptyList = () => (
    <View style={styles.emptyListContainer}>
      {isFetching ? (
        <Text style={styles.lightDarkText}>Please Wait... </Text>
      ) : (
        <Text style={styles.lightDarkText}>No Records Found</Text>
      )}
    </View>
  );

  const handleRenderFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={StyleSheet.flatten([styles.headerText, styles.h1])}>
        Developed by
      </Text>
      <Text style={styles.lightDarkText}>Manish Chandra</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={fetchData} />
      }
      contentContainerStyle={styles.list}
      renderItem={handleRenderItem}
      ListEmptyComponent={handleEmptyList}
      ListFooterComponent={handleRenderFooter}
      keyExtractor={item => item.flight_number}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    paddingTop: 10,
    backgroundColor: '#F2F2F2',
  },
  card: {
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  innerContainer: {
    marginHorizontal: 20,
  },
  listItemContainer: {
    marginLeft: 20,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: hp('30%'),
    backgroundColor: '#F2F2F2',
    alignSelf: 'center',
    marginBottom: 10,
  },
  rowCont: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#000',
  },
  h1: {
    fontSize: 17,
  },
  lightDarkText: {
    color: '#333',
  },
  colorText: {
    color: '#535579',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
