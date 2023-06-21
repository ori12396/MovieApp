import axios, { AxiosInstance, AxiosResponse } from 'axios';
import IHttpClient from '../Interfaces/IHttpClient';


export default class AxiosHttpClient implements IHttpClient {
  private instance: AxiosInstance | null = null;

  private get axiosClient(): AxiosInstance {
    return this.instance ?? this.initAxiosClient();
  }

  private initAxiosClient() {
    this.instance = axios.create();
    return this.instance;
  }

  async get<TResponse>(url: string, params?: any): Promise<TResponse> {
    try {
      const response: AxiosResponse<TResponse> = await this.axiosClient.get<TResponse>(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<TResponse>(url: string, data: any, params?: any): Promise<TResponse> {
    try {
      const response: AxiosResponse<TResponse> = await this.axiosClient.post<TResponse>(url, data, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put<TResponse>(url: string, data: any, params?: any): Promise<TResponse> {
    try {
      const response: AxiosResponse<TResponse> = await this.axiosClient.put<TResponse>(url, data, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async patch<TResponse>(url: string, data: any, params?: any): Promise<TResponse> {
    try {
      const response: AxiosResponse<TResponse> = await this.axiosClient.patch<TResponse>(url, data, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<TResponse>(url: string, params?: any): Promise<TResponse> {
    try {
      const response: AxiosResponse<TResponse> = await this.axiosClient.delete<TResponse>(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

