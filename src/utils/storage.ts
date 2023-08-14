/** sessionStorage get */
function getSessionStorage(key: string) {
  return sessionStorage.getItem(key);
}
/** sessionStorage set */
function setSessionStorage(key: string, value: any) {
  return sessionStorage.setItem(key, value);
}
/** sessionStorage del */
function delSessionStorage(key: string) {
  return sessionStorage.removeItem(key);
}
/** sessionStorage delAll */
function delAllSessionStorage() {
  return sessionStorage.clear();
}
/** localStorage get */
function getLocalStorage(key: string) {
  return localStorage.getItem(key);
}
/** localStorage set */
function setLocalStorage(key: string, value: any) {
  return localStorage.setItem(key, value);
}
/** localStorage del */
function delLocalStorage(key: string) {
  return localStorage.removeItem(key);
}
/** localStorage delAll */
function delAllLocalStorage() {
  return localStorage.clear();
}

const storageUtils = {
  getSessionStorage,
  setSessionStorage,
  delSessionStorage,
  delAllSessionStorage,
  getLocalStorage,
  setLocalStorage,
  delLocalStorage,
  delAllLocalStorage,
};

export default storageUtils;
