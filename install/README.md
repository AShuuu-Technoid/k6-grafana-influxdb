# K6 Load Test

-   ## STEP 1:

    `git clone `

-   ## STEP 2:

    `cd `

-   ## STEP 3:

    `docker-compose up -d influxdb grafana`

-   ## STEP 4:

    Modify JS script file to run load test. PATH: `$PWD/scripts/test.js`

-   ## STEP 5:

    `docker-compose run k6 run /scripts/test.js`

-   ## STEP 5:
    Open Browser `http://localhost:3000`

### Referance URL: [Docker-K6-Grafana-Influxdb](https://k6.io/docs/results-visualization/influxdb-+-grafana/#using-our-docker-compose-setup)
