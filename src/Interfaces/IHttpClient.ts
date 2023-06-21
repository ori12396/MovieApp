export default interface IHttpClient {
  get<TResponse>(url: string, params?: any): Promise<TResponse>;
  post<TResponse>(url: string, data: any, params?: any): Promise<TResponse>;
  put<TResponse>(url: string, data: any, params?: any): Promise<TResponse>;
  patch<TResponse>(url: string, data: any, params?: any): Promise<TResponse>;
  delete<TResponse>(url: string, params?: any): Promise<TResponse>;
  }
  export {}
