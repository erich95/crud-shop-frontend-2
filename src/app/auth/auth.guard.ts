import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const token = localStorage.getItem('token');
  if (token != null) {
    return true
  } else {
    return false; 
  }
};
