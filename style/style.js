import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flex: {
    flexDirection: "row"
  },
  //Footer nappien tyylit
  footerFlex: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  footerButton: {
    marginBottom: 15,
    marginTop: 10,
    marginRight: 60,
    padding: 12,
    borderWidth: 1,
    borderColor: "#1252BA",
    borderRadius: 25,
    color: "#1252BA",
    width: 50,
  },
  cameraTitle: {
    marginTop: 10,
    fontSize: 24,
    marginBottom: 10,
    marginLeft: 10,
    color: '#061a3b',
    fontFamily: 'Esteban_400Regular',
  },
  cameraHeader: {
    marginLeft: 10,
    flexDirection: "row",
    marginBottom: 5,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  cameraInfo: {
    marginLeft: 10,
    flexDirection: "row",
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  weatherData: {
    marginLeft: 90,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  weatherTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#061a3b',
    fontFamily: 'Esteban_400Regular',
  },
  weatherText: {
    marginBottom: 5,
    fontSize: 15,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  weatherAirText: {
    paddingTop: 5,
    fontSize: 15,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  weatherFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  //favorites listan tyylit
  favContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  rowText: {
    fontSize: 20,
    marginLeft: 5,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  rowHeader: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  tinyLogo: {
    width: 102,
    height: 50,
  },
  logo: {
    width: 222,
    height: 80,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  loadingText: {
    fontSize: 20,
    color: '#061a3b',
    padding: 5,
  },
  plainView: {
    width: 250,
    padding: 5,
  },
  navButton: {
    marginRight: 5,
    fontSize: 24,
    padding: 4,
    color: '#1252BA',
  },
  deleteButton: {
    marginLeft: 15,
    fontSize: 24,
    padding: 4,
    color: '#1252BA',
  },
  //dropdown-tyylit
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  icon: {
    marginRight: 5,
    color: '#1252BA',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#061a3b',
    fontFamily: 'Montserrat_400Regular',
  },
  hrLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    width: "95%",
  },
});