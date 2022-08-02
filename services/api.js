import axios from "axios";

export async function getApiData() {
  const data = await fetch('https://api.github.com/users/xiaotian/repos');
  console.log(data);
}

export const fetchApi=async()=>{
  try {
    const response = await axios.get('https://api.github.com/users/xiaotian/repos');
    return response
  } catch (error) {
    console.error(error);
  }
}


export function getData(isResolve) {
  return new Promise((resolve, reject) => {
    if (isResolve) {
      resolve({status: true});
    } else {
      reject({status: false});
    }
  });
}

export function login(email, password) {
  if (email.length === 0) {
    return false;
  } else if (password.length === 0) {
    return false;
  } else {
    return true;
  }
}

export async function getApiDataAndPass() {
  const data = await getData(true);
  if (data.status) {
    showData({name: 'Neeraj', lastName: 'Singh'});
  } else {
    errorMethod({msg: 'No Data found'});
  }
}
export function showData(data) {
  console.log(data);
  return data;
}
export function errorMethod(data) {
  console.log(data);
  return data;
}
