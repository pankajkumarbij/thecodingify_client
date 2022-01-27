var t = "no token";
if(localStorage.getItem('token')){
    t = localStorage.getItem('token');
}

export const token = t;