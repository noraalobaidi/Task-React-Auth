# Signup

1- Create a new store that will be responsible for authentication. Let's call it `authStore.js`.

```javascript
import { observable, makeAutoObservable } from 'mobx';
import instance from './instance';

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const authStore = new AuthStore();

export default authStore;
```

2- In your `AuthStore` class, create a method called `signup`. This method takes the `userData` as an argument and sends a request to the `/signup` endpoint and passes `userData` in the `body` of the request.

```javascript
signup = async (userData) => {
  try {
    await instance.post('/signup', userData);
  } catch (error) {
    console.log('AuthStore -> signup -> error', error);
  }
};
```

3- Back to `SignupModal`. Create a `handleSubmit` method that calls `authStore.signup` and pass it `user` as an argument.

```javascript
const handleSubmit = (event) => {
  event.preventDefault();
  authStore.signup(user);
  closeModal();
};
```

4- Pass `handleSubmit` to the `form`'s `onSubmit` event.

```javascript
<form onSubmit={handleSubmit}>
```

# Signin

1- In your `authStore` class, create a method called `signin`. This method takes the `userData` as an argument and sends a request to the `/signin` endpoint and passes `userData` in the body of the request. When logging in, we expect the token as a response. Let's console log it for now.

```javascript
signin = async (userData) => {
  try {
    const res = await instance.post('/signin', userData);
    console.log('authStore -> signin -> res.data', res.data);
  } catch (error) {
    console.log('AuthStore -> signin -> error', error);
  }
};
```

2- Back to `SigninModal`. Change the `handleSubmit` method to call `authStore.signin` and pass it `user` as an argument.

```javascript
const handleSubmit = (event) => {
  event.preventDefault();
  authStore.signin(user);
  closeModal();
};
```

3- Try logging in and check your console.

4- Install `jwt-decode` which is a library that can decode tokens.

```javascript
$ npm install jwt-decode
```

5- Import `decode` from `jwt-decode` which is a function that takes a token as an argument and returns the decoded object.

```javascript
import decode from 'jwt-decode';
```

6- Pass the token in `res.data` to `jwt-decode` and let's console log it.

```javascript
try {
  const res = await instance.post("/signin", userData);
  console.log(decode(res.data.token));
}
```

7- create a new property in our store called `user`. `user`'s initial value is `null`, which basically mean that no user is logged in.

```javascript
class AuthStore {
  user = null;
```

8- In `signin`, we will save the decoded token in `this.user`.

```javascript
try {
  const res = await instance.post("/signin", userData);
  this.user = decode(res.data.token);
}
```

# Signin After Signup

1- In `authStore`'s `signup` method, save the response, and pass the token the `decode` method, and save the return value in `this.user`.

```javascript
try {
  const res = await instance.post("/signup", userData);
  this.user = decode(res.data.token);
}
```

# Pass The Token

1- In `authStore`'s `signin` method, after receiving the token in the response, we will save it in our `axios`'s instance.

```javascript
try {
  const res = await instance.post("/signin", userData);
  instance.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
  this.user = decode(res.data.token);
}
```

2- Do the same thing in `signup`.

3- The code is becoming very repeated, create a function called `setUser` in `AuthStore` that takes a `token` as an argument, saves it in the headers, decodes it and saves the decoded object in `this.user`.

```javascript
setUser = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  this.user = decode(token);
};
```

4- Call this method in `signin` and `signup` methods and pass it the token.

```javascript
try {
  const res = await instance.post("/signin", userData);
  this.setUser(res.data.token);
}
```

```javascript
try {
  const res = await instance.post("/signup", userData);
  this.setUser(res.data.token);
}
```

# Logout

1- You have a component called `SignoutButton.js` , render it under the `NavBar` so that it will only show if the user is logged in.

```javascript
{
  authStore.user ? <SignoutButton /> : null;
}
```

2- In `authStore`, create a `signout` method. But how can you logout the user? By setting `this.user` to `null` and deleting the token from the `instance` headers.

```javascript
signout = () => {
  delete instance.defaults.headers.common.Authorization;
  this.user = null;
};
```

3- In the button's `onClick` event, call the `signout` method.

```javascript
<Button variant="outline-light mx-3" onClick={authStore.signout}>
  Signout
</Button>
```

# Persistent Login

1- In your `setUser` method save your token in the `localStorage` using the `setItem` method.

```javascript
setUser = (token) => {
  localStorage.setItem('myToken', token);
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  this.user = decode(token);
};
```

2- Create a method called `checkForToken` in `authStore`, where you will fetch the token from the local storage.

```javascript
checkForToken = () => {
  const token = localStorage.getItem('myToken');
  console.log('checkForToken -> token', token);
};
```

3- Call this function right after creating your store.

```javascript
const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
```

4- Back to the `checkForToken` method, check if the token exists, if it does, make sure it's not expired. If it's not,pass the token to `this.setUser` else, call `this.signout`.

```javascript
checkForToken = () => {
  const token = localStorage.getItem('myToken');
  if (token) {
    const currentTime = Date.now();
    const user = decode(token);
    if (user.exp >= currentTime) {
      this.setUser(token);
    } else {
      this.signout();
    }
  }
};
```

5- If the token is expired you must delete it from our local storage. In `signout`, remove the token from the local storage.

```javascript
signout = () => {
  delete axios.defaults.headers.common.Authorization;
  localStorage.removeItem('myToken');
  this.user = null;
};
```
