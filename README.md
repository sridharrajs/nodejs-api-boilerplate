## Nodejs api boilerplate

This is a minimalistic Nodejs API boilerplate

## Uses

1. `Mongodb 3.6.3`
2. `Express 4.17.1`
3. `Nodejs v10.16.1`

## Development

Create a new `.env` file with necessary configuration. You can refer `.env.sample` for the reference

Install the dependencies
 
    npm i  
    
To start the server to serve API. 

    npm start
    
For development,

    npm run dev

## Deployment

You need to use [pm2](http://pm2.keymetrics.io/) for deploying nodejs application. Application configurations are in `pm2_configs/` folder

## Third part dependencies

The app uses `node-ses` for sending verification and reset password mail. Feel free to swap out it.

## License

Licensed under MIT license
