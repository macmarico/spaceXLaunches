import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Details = ({route}) => {
  const {item} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.card}>
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
              <Text>No Mission Id's</Text>
            ) : (
              item.mission_id.map((item, index) => (
                <Text key={index}>
                  {'\u2B24'} {item}
                </Text>
              ))
            )}
          </View>
        </View>
        <View style={styles.rowCont}>
          <Text style={styles.headerText}>Launch Year :</Text>
          <Text>{item.launch_year}</Text>
        </View>
        <View style={styles.rowCont}>
          <Text style={styles.headerText}>Successful Launch :</Text>
          <Text>{item.launch_success ? 'True' : 'False'}</Text>
        </View>
        <View style={styles.rowCont}>
          <Text style={styles.headerText}>Details :</Text>
          <Text style={styles.detailsText}>{item.details}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  innerContainer: {
    marginHorizontal: 20,
    paddingBottom:20
  },
  listItemContainer: {
    marginLeft: 20,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: hp('50%'),
    backgroundColor: '#F2F2F2',
    alignSelf: 'center',
    marginBottom: 20,
  },
  rowCont: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  colorText: {
    color: '#535579',
  },
  h1: {
    fontSize: 20,
    marginBottom: 10,
  },
  detailsText: {
    flex: 1,
  },
});
