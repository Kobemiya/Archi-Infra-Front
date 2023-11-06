import axios, { AxiosInstance } from "axios";
import { useRef } from "react";

const useClient = (): AxiosInstance => {
  const instance = useRef(axios.create({
    baseURL: 'http://localhost/api'
  }))

  return instance.current
}

export default useClient
