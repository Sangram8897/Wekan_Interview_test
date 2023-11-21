import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Container:React.FC<ContainerProps> = props => {
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        animated={true}
        showHideTransition={'none'}
        barStyle={'dark-content'}
      />
      <View {...props} style={styles.sub_container}>
        {props.children}
      </View>

      {(props.isLoading ) && (
        <View style={styles.fullScreen}>
          <ActivityIndicator size="large" color={'blue'} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = {
  fullScreen: {
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    zIndex: 9,
  },
  container: {
    flex: 1,
    //backgroundColor: '#F4F5FA'//Colors.COLOR_WHITE
  },
  sub_container: {
    flex: 1,
  },
  zIndex: {
    flex: 1,
    zIndex: 0,
  },
};
export default Container;
