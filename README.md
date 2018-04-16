# React burger app

React 16 app with Webpack 4, axios and firebase taught by **[Maximilian Schwarzmüller](https://www.udemy.com/react-the-complete-guide-incl-redux/)**

---
## Install dependencies

```
cd path-to-your-project
npm install
```

### Additional install

```
npm i -g ntl
```

- By running **ntl** you can choose which script to run. For example **start**, **build**, **build:prod** and **watch** will be some of the choices. All of these scripts are in the `package.json` file in the scripts object.
- Command to start **ntl** and choose an option
```
ntl
```

### Set baseURL for axios

- Inside `src/axios-orders.js` set the baseURL to your firebase app. You should already have the ingredients set on the firebase app.

```
const instance = axios.create({
  // Set your firebase app url
  baseURL: ''
})
```

### Without ntl

If you don't want to use ntl you can use the `npm run` command with the chosen script, examples:
- For development bundle
```
npm run build
```
- For production ready bundle
```
npm run build:prod
```
- For development server
```
npm start
```
- For Webpack watch
```
npm run watch
```
- For testing with jest
```
npm run test
```
---
License
---

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
