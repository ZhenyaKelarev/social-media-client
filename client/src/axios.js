// import axios from "axios"

// export const makeRequest = axios.create({
//   baseURL: "http://localhost:8800/api/",
//   withCredentials: true,
// })

import axios from "axios"

export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
})

makeRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    // const refreshToken = localStorage.getItem("refreshToken")
    // if (token && config.url.includes("auth/refres")) {
    //   config.headers.Authorization = `Bearer ${refreshToken}`
    // }
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

makeRequest.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalRequest = error.config
    // if (
    //   error.response.status === 401 &&
    //   !originalRequest.url.includes("auth/refres")
    // ) {
    //   await authRoute.tokenization()
    //   return
    // }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        return makeRequest(originalRequest)
      } catch (err) {
        return Promise.reject(err)
        // console.log("err", err)
      }
    }

    // if (error.response.status === 409) {
    //   // return Promise.reject(error)
    //   try {
    //     console.log("true")
    //   } catch (err) {
    //     return Promise.reject(err)
    //   }
    // }
    if (error.response.status === 409 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        return makeRequest(originalRequest)
      } catch (err) {
        return Promise.reject(err)
        // console.log("err", err)
      }
    }
    return Promise.reject(error)
  }
)
