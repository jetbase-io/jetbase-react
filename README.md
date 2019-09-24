# JetBase React Dashboard

Web client application with dashboard

## Getting Started

### Enviroment

Use .env file for enviroment variables.

Example, .env.sample.local
```
REACT_APP_API_SERVER=http://server_api_url
```

### Installing

```
npm install
```

### Running

```
npm start
```

### Build

```
npm run build
```
---
## Run in docker

### Building 

```
docker build -t jetbase-react .
```

### Runing 

```
docker run -p 9900:3000 jetbase-react
```

now you can access jetbase-react app on port `:9900`
