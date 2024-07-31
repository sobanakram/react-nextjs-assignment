import {
    authorizedPatchCall,
    postCall
} from './APIsService';

export const isLoggedIn = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return false;
    }
    return true;
};

export const login = async (email, password) => {
    return new Promise((resolve, reject) => {
        postCall('/auth/log_in', { email, password })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const logout = async () => {
    return new Promise((resolve, reject) => {
        authorizedPatchCall('/auth/sign_out')
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
