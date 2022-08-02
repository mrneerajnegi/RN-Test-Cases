/**
 * @format
 */

import 'react-native';
import axios from 'axios';

// Note: test renderer must be required after react-native.
import {fetchApi, getData, login} from '../services/api';

//Async Cases
describe('checking async functions', () => {
  it('Resolved state', () => {
    return getData(true).then(value => {
      expect(value).toMatchObject({status: true});
    });
  });
  it('Rejected state', () => {
    return getData(false).catch(err => {
      expect(err).toMatchObject({status: false});
    });
  });
});

//validation cases
describe('checking login', () => {
  it('check email empty case', () => {
    output = login('', 'password');
    expect(output).toBeFalsy();
  });
  it('check password empty case', () => {
    output = login('mail', '');
    expect(output).toBeFalsy();
  });
  it('check mail password  case', () => {
    output = login('mail', 'pawword');
    expect(output).toBeTruthy();
  });
});

//Mock asynchronous Cases
jest.mock('axios');

describe('axios mock implementation', () => {
  it('Resolved ', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({data: {status: true}}),
    );
    output = await fetchApi();
    return expect(output).toMatchObject({data: {status: true}});
  });

  it('Failed ', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    return fetchApi().catch(value => {
      expect(value).toMatchObject(errorMessage);
    });
  });
});



