import { Helper } from "../utils";
import { API_FAILED, INTERNET_FAILED, JSON_HEADER, BASE_URL, kPost, kUserToken, USER_TYPE, kErrorCode, kGet, kDel } from "./commonValue";
import { isNetworkAvailable } from './network'

export const post = async ({ url, data, header = JSON_HEADER }) => {
    const isConnected = await isNetworkAvailable()
    if (isConnected == false) {
        return INTERNET_FAILED
    }
    let params = {
        method: kPost,
        headers: { ...header, ...(global.userToken && { 'Authorization': 'Bearer ' + global.userToken, 'user_type': USER_TYPE }) },
        body: data
    }

    console.log('Api url----------------------', BASE_URL + url);
    console.log('Api params----------------------', params);

    try {
        let status = 200;

        const response = await fetch(BASE_URL + url, params);
        console.log('Api response----------------------', response);
        status = response.status;
        const json = await response.json();
        json.status = json.errorcode != 0 ? kErrorCode : status
        // console.log('Api response----------------------', json);

        // if (json.status == 404) {
        //     Helper.logout(true)
        //     return json
        // }
        return json
    } catch (error) {
        console.log('Api Failed----------------------', error , '------------' + url);
        return API_FAILED
    } finally {
        // console.log('Api finally----------------------');
    }
}
const objToQueryString = (obj) => {
    if (obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            if(obj[key]){
                keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }
        }
        return keyValuePairs.length > 0 ? ('?' + keyValuePairs.join('&')) : ''
    }
    return ''
}
export const get = async ({ url, data }) => {
    let params = {
        method: kGet,
        headers: { ...JSON_HEADER, ...(global.userToken && { 'Authorization': 'Bearer ' + global.userToken, 'user_type': USER_TYPE }) },
    }
    let apiUrl = BASE_URL + url + objToQueryString(data)
    console.log('Api url----------------------', apiUrl);
    console.log('Api params----------------------', params);

    try {
        let status = 200;
        const response = await fetch(apiUrl, params);
        status = response.status;
        const json = await response.json();
        json.status = json.errorcode != 0 ? kErrorCode : status
        // console.log('Api response----------------------', json);

        // if (json.status == 404) {
        //     Helper.logout(true)
        //     return json
        // }
        return json
    } catch (error) {
        console.log('Api Failed----------------------', error);
        return API_FAILED
    } finally {
        // console.log('Api finally----------------------');
    }
}

export const del = async ({ url, data }) => {

    let params = {
        method: kDel,
        headers: { ...JSON_HEADER, ...(global.userToken && { 'Authorization': 'Bearer ' + global.userToken, 'user_type': USER_TYPE }) },
    }
    let apiUrl = BASE_URL + url + objToQueryString(data)
    console.log('Api url----------------------', apiUrl);
    console.log('Api params----------------------', params);

    try {
        let status = 200;
        const response = await fetch(apiUrl, params);
        status = response.status;
        const json = await response.json();
        json.status = json.errorcode != 0 ? kErrorCode : status
        console.log('Api response----------------------', json);

        // if (json.status == 404) {
        //     Helper.logout(true)
        //     return json
        // }
        return json
    } catch (error) {
        console.log('Api Failed----------------------', error , '------------' + url);
        return API_FAILED
    } finally {
        //console.log('Api finally----------------------');
    }
}
