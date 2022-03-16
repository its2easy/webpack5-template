# Webpack 5 Template

Simple webpack 5 boilerplate using Babel, Sass and PostCSS. 

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

### Production build

```bash
npm run build
```

## Features

- js (@babel/preset-env)
- scss
- postcss (autoprefixer, cssnano)
- webpack-dev-server

## Assets

Files from the ```src/static``` folder will be copied, without webpack processing. 
Files from the ```src/assets``` folder must be explicitly required in code. 

### To use a file from ```src/assets``` folder:

**scss**:
- ```background-image: url("#{$assetsPath}/img/example2.jpg");``` 
- or ```background-image: url("../img/example2.jpg");``` (path relative to 
  scss entry point - src/scss/app.scss)
  
**js**:
- ```import imgFile from '@/assets/img/example2.jpg';``` (_@_ is an alias for ```src/```)
- or ```import imgFile from '../assets/img/example2.jpg';``` (path relative to js file)

**html**:
- ``` <img src="./assets/img/example2.jpg">```

### To use a file from ```src/static``` folder:

**scss**:
- ```background-image: url("/static/example1.jpg");``` (server relative path)
  
**html**:
- ``` <img src="/static/example1.jpg">``` (root relative)
- or ``` <img src="static/example1.jpg">``` (path relative to html file)


## <a name="license"></a>License
AnimateImages is provided under the [MIT License](https://opensource.org/licenses/MIT)



