## Mean boilerplate

This is a minimalistic MEAN boiler plate application inspired by [mean.io](http://mean.io/).

## Uses

1. `Mongodb 2.4.10`
2. `Express 4.13.3`
3. `AngularJS 1.4.8`
4. `Nodejs v4.4.5`

## Deployment

1. Set the environment variable  
 `MY_SECRET`

2. Install the dependencies using  
     `npm install`  
     `bower install`
	 
3. Build the front end and serve the  application  
	 `gulp install`

Note: `gulp` needs to be installed globally for this task to run.

## Developer Installation

Running a local instances involves two phase.

1. **Setting the environment**  
	Set the server API endpoint in `client/app/components/environment.js`

2. **Building the client**  
   The entire client side is written using ES6, we need to transcompile it to ES5 for the browsers that don't support ES6 yet.  
   `gulp serve`
   
This will watch for the changes in the `client/` folder and will transpile them and serve the application from `dist/`.

## License

Licensed under MIT license
