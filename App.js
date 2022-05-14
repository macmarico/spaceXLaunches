import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import axios from 'axios';

const App = () => {
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
      <View style={styles.card}>
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
                <Text> No Mission Id's</Text>
              ) : (
                item.mission_id.map(item => (
                  <Text>
                    {'\u2B24'} {item}
                  </Text>
                ))
              )}
            </View>
          </View>
          <View style={styles.rowCont}>
            <Text style={styles.headerText}>Launch Year :</Text>
            <Text> {item.launch_year}</Text>
          </View>

          <View style={styles.rowCont}>
            <Text style={styles.headerText}>Successful Launch :</Text>
            <Text> {item.launch_success ? 'True' : 'False'}</Text>
          </View>

          <View style={styles.rowCont}>
            <Text style={styles.headerText}>Successful Landing :</Text>
            <Text> {'Unknown'}</Text>
          </View>
        </View>
      </View>
    );
  };

  const handleRenderFooter = () => <View style={styles.footerContainer}>
    <Text style={StyleSheet.flatten([styles.headerText, styles.h1])}>Developed by</Text>
    <Text>Manish Chandra</Text>
  </View>;

  return (
    <View>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={fetchData} />
        }
        contentContainerStyle={styles.list}
        renderItem={handleRenderItem}
        ListFooterComponent={handleRenderFooter}
        keyExtractor={item => item.flight_number}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop:10,
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
  colorText: {
    color: '#535579',
  },
  footerContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10
  }
});
