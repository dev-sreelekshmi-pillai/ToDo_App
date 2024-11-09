import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';

export const httpHeadersInterceptor: HttpInterceptorFn = (req, next) => {

  const userToken = 'MY_TOKEN'; 
  const modifiedReq = req.clone({
        //  headers: req.headers.set('Authorization', `Bearer ${userToken}`),
        });
    
        return next(modifiedReq);
};
