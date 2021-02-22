
import axios from 'axios'
import { environment } from '../../environments'
import router from '../../router'
import store from '../../store'
import Vue from "vue";


axios.defaults.showLoader = true;
axios.defaults.timeout = 10000
axios.defaults.baseURL = environment.API_ENDPOINT


axios.interceptors.request.use(config => {
    if (config.showLoader) {
        store.dispatch('loader/pending');
    }
    if (store.getters.getAuthenticationToken) {
        config.headers = { 
            'Authorization': `Bearer ${store.getters.getAuthenticationToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
    }
    return config
}, err => {
    if (err.config.showLoader) {
        store.dispatch('loader/done');
    }
    return Promise.reject(err)
})

axios.interceptors.response.use(response => {
    if (response.config.showLoader) {
        store.dispatch('loader/done');
    }
    return response
}, err => {
    let response = err.response;

    if (response && response.config && response.config.showLoader) {
        store.dispatch('loader/done');
    }
    if (response) {
        switch (response.status) {
            case 401:
                store.commit('LOGOUT')
                router.replace({ path: '/', query: { redirect: router.currentRoute.fullPath } })
                break
            case 403:
                store.commit('LOGOUT')
                router.replace({ path: '/', query: { redirect: router.currentRoute.fullPath } })
                break
        }
    }
    const errorMessage = response && response.data && response.data.error && response.data.error.message;
    Vue.notify({
        group: "notification",
        title: "Notification",
        type: "error",
        text: errorMessage
    });
    return Promise.reject(errorMessage)
})

/**
 * @param  {string} url
 * @param  {object} params={}
 */
const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            resolve(res.data.data)
        }).catch(err => {
            reject(err)
        })
    })
}
/**
 * @param  {string} url
 * @param  {object} data={}
 */
const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res.data.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * @param  {string} url
 * @param  {object} data={}
 */
const put = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(res => {
            resolve(res.data.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * @param  {string} url
 * @param  {object} data={}
 */
const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(res => {
            resolve(res.data.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * @param  {string} url
 * @param  {object} params={}
 */
const del = (url) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, {}).then(res => {
            resolve(res.data.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export { axios, get, post, put, patch, del }