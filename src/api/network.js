import NetInfo from '@react-native-community/netinfo';
  export const isNetworkAvailable = async () => {
    // return await (await (await NetInfo.fetch()).isConnected);
    // return response.isConnected && response.isInternetReachable;
    return await NetInfo.fetch().then(state => {
      //console.log('NetInfo-------------',state.isConnected)
      return state.isConnected
    }).catch(error => {
      return false
    });
  }
