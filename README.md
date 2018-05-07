## Nodejs api boilerplate

This is a minimalistic Nodejs API boilerplate

## Uses

1. `Mongodb 3.6.3`
2. `Express 4.13.3`
3. `Nodejs v8.9.4`

## Development

1. Create a new `.env` file with necessary configuration. You can refer `.env.sample` for the reference

2. Install the dependencies using `npm install`  

## Deployment

You need to use [pm2](http://pm2.keymetrics.io/) for deploying nodejs application. Application configurations are in `pm2_configs/` folder

## Third part dependencies

The app uses `node-ses` for sending verification and reset password mail. Feel free to swap out it.

## License

Licensed under MIT license
