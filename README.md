# mplusmuseum-stories

Front-end app for M+ Stories website. Single page application with server-side rendering.

## How this Fits

This repository contains the source code for the M+ Stories website. It is largely an early-stage work in progress at the moment.

### Prerequisites

You will need node and npm installed to run the app. Due to the use of server-side rendering, the app will not initialize without being properly configured to make requests from the M+ Stories API.

### Installation

First create a new .env file in the project root directory based on the .env.example file and define your API endpoint.

To install the project dependencies use the following commands:
``` bash
npm install
```

## Using the Tools


Serve the app in development mode at localhost:8080.
``` bash
npm run dev 
```

Run build processes for production.
``` bash
npm run build
```

Start the production application.
``` bash
npm start
```

In production, the use of [pm2](http://pm2.keymetrics.io/) to run the application is recommended.
``` bash
pm2 start npm --name "plus" -- start
```

## Built With

* [Vue](https://github.com/vuejs/vue)
* [Vuex](https://github.com/vuejs/vuex)

## Contributing

We welcome your contributions. If you have an addition or correction, please fork this repository, make your change, and submit a pull-request.

## Authors

Design and build by [Zak Group](https://www.zakgroup.co.uk/).

[Rupert Dunk](https://github.com/rdunk), Teo Furtado, [Zak Kyes](https://www.zakgroup.co.uk/office/zak-kyes).

Credit to the official [Vue Hacker News Clone](https://github.com/vuejs/vue-hackernews-2.0/) for providing the original project structure and build processes.

## License

We are using the [MIT License](LICENSE).
