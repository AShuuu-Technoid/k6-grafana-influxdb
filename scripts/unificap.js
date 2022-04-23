//
// A generic load test script provided for example purposes and testing
//

import { check, group, fail, sleep } from 'k6'
import http from 'k6/http'

//import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { htmlReport } from './bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'

const TARGET_URL = __ENV.TEST_TARGET || 'https://blazedemo.com/'
const RAMP_TIME = __ENV.RAMP_TIME || '10s'
const RUN_TIME = __ENV.RUN_TIME || '10s'
const USER_COUNT = __ENV.USER_COUNT || 200
const SLEEP = __ENV.SLEEP || 0.5

export function handleSummary(data) {
    return {
        'summary4.html': htmlReport(data, { debug: false }),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    }
}

export let options = {
    stages: [
        { duration: RAMP_TIME, target: USER_COUNT },
        { duration: RUN_TIME, target: USER_COUNT },
        { duration: RUN_TIME, target: USER_COUNT },
        { duration: RUN_TIME, target: USER_COUNT },
        // { duration: RUN_TIME, target: USER_COUNT },
        // { duration: RUN_TIME, target: USER_COUNT },
        // { duration: RUN_TIME, target: USER_COUNT },
        // { duration: RUN_TIME, target: USER_COUNT },
        // { duration: RUN_TIME, target: USER_COUNT },
        // { duration: RUN_TIME, target: USER_COUNT },
    ],
    thresholds: {
        http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
        iteration_duration: ['max<4000'],
    },
}

export default function() {
    // let url = Math.random() > 0.8 ? TARGET_URL : TARGET_URL + '/gibberish'
    // let res = http.get(TARGET_URL)

    // if (!check(res, {
    //         'status code MUST be 200': (res) => res.status == 200,
    //     })) {
    //     fail('status code was *not* 200');
    // }

    // sleep(SLEEP)
    let res = http.get(TARGET_URL)

    check(res, {
        // 'NOT 500': (r) => r.status !== 500,
        'status was 200': r => r.status === 200,
        'Failed 200': r => r.status !== 200,
        'response time OK': r => r.timings.duration < 2000
    })

    sleep(SLEEP)

    // group('Check Status', () => {
    //     let res = http.get(TARGET_URL)

    //     check(res, {
    //         'NOT 500': (r) => r.status !== 500,
    //         'status was 200': r => r.status === 200,
    //         // 'Failed 200': r => r.status !== 200,
    //         // 'response time OK': r => r.timings.duration < 2000
    //     })

    //     sleep(SLEEP)
    // })
}