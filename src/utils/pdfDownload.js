import {
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
import { showToast } from './helper';


export function historyDownload(pdf_url) {
  //Function to check the platform
  //If iOS the start downloading
  //If Android then ask for runtime permission
  if (Platform.OS === 'ios') {
    downloadHistory(pdf_url);
  } else {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'storage title',
          message: 'storage_permission',
        },
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //Once user grant the permission start downloading
          //console.log('Storage Permission Granted.');
          downloadHistory(pdf_url);
        } else {
          //If permission denied then show alert 'Storage Permission 
          Alert.alert('Gallery permission not granted');
        }
      });
    } catch (err) {
      //To handle permission related issue
      //console.log('error', err);
    }
  }
}

export async function downloadHistory(pdf_url) {
  showToast('Pdf download start...', 'info');

  const { config, fs } = RNFetchBlob;
  let PictureDir = Platform.OS == 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
  let date = new Date();
  const iosConfig = {
    fileCache: true,
    appendExt: 'pdf',
    path:
      PictureDir +
      '/Transaction' +
      Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf',
    title: 'Accident Report PDF',
    useDownloadManager: true,
  };
  const androidConfig = {
    fileCache: true,
    addAndroidDownloads: {
      //Related to the Android only
      useDownloadManager: true,
      notification: true,
      mime: 'application/pdf',
      path:
        PictureDir +
        '/Transaction' +
        Math.floor(date.getTime() + date.getSeconds() / 2)+ '.pdf',
      description: 'Accident Report PDF',
    },
  }

  const configOptions = Platform.select({
    ios: iosConfig,
    android: androidConfig,
  });

  config(configOptions)
    .fetch('GET', pdf_url)
    .then((res) => {
      //Showing alert after successful downloading
      //console.log('res -> ', JSON.stringify(res));
    
      if (Platform.OS === "ios") {
        // RNFetchBlob.ios.openDocument(res.data);.
        // console.log('res -> ', JSON.stringify(res), pdf_url);
        // RNFetchBlob.fs.writeFile(iosConfig.path, res.data, 'base64');
        // RNFetchBlob.ios.previewDocument(iosConfig.path);
      }
      else{
        alert('Accident Report PDF Downloaded Successfully.');

      }
    });
}