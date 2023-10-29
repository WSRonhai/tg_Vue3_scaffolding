import axios, { type AxiosRequestConfig } from 'axios'

class Axios {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }
  public async request<T, D = ResponseResult<T>>(
    config: AxiosRequestConfig,
  ): Promise<D> {
    try {
      const response = await this.instance.request<D>(config)
      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }
  private interceptorsRequest() {
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么
        return config
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
      },
    )
  }
  private interceptorsResponse() {
    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }
}

export default Axios
