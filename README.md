# openfaas-docker-compose

Examples for running OpenFaaS in a development environment using
Docker Compose.

All these are using officially supported templates, although these principles
are used to demonstrate how to run OpenFaaS in a live-reload environment and
could be applied to any template.

If you are using the [Classic Watchdog](https://docs.openfaas.com/architecture/watchdog/#classic-watchdog),
you won't need to change the `fprocess` environment variable as the script isn't
invoked until the function is called.

**IMPORTANT:** This does not give the full OpenFaaS suite of tools. It is
purely to allow access to the function inside the container with live-reload
support. You will still need to build the image.

## Secrets

OpenFaaS supports [secrets](https://docs.openfaas.com/reference/secrets/) by
putting the file in `/var/openfaas/secrets`. Docker Compose stores secrets in
`/run/secrets` so you will need to do some form of either/or load, appropriate
to the language. I suggest putting the OpenFaaS version as the default to
reduce load in the production environment.

**IMPORTANT:** You should never store sensitive data in a repo.

See the `docker-compose.yaml` file and the `node12` function for an example
as to how you can get this to work.

## Running

```shell script
make templates # This downloads the templates from the OpenFaaS template store
docker-compose up # This runs Docker Compose
```

This may take a few moments to run the first time (eg, the NodeJS example
has to install `nodemon`). However, once running it will update changes very
quickly indeed.

## Invoking

Running in Docker Compose, we lose all the OpenFaaS support of password
protection, routing and the like - this is purely the function and nothing
else.

To invoke the function, you may use `curl`, [Postman](https://getpostman.com)
or even your browser. Just make a call to the port - you can use `GET` or
`POST` as you would in OpenFaaS.

### NodeJS

Port: 3000

```shell script
curl -d '{ "input": "data" }' -H 'content-type: application/json' localhost:3000
```

### Python

Port: 3001

```shell script
curl -d '{"input": "data" }' -H 'content-type: application/json' localhost:3001
```
