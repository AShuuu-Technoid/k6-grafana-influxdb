const http = require('k6/http');
const { check, sleep, group } = require('k6');

export const options = {
    stages: [
        { duration: '15s', target: 150 },
        { duration: '15s', target: 150 },
        { duration: '15s', target: 0 },
    ]
};

export default function() {
    group('load test1', () => {
        const res = http.batch([
            ['GET', 'https://blazedemo.com/']
            // ['GET', 'https://']
        ]);
        check(res[0], {
            'status was 200': r => r.status === 200,
            'is NOT status 200': r => r.status !== 200,
            'response time OK': r => r.timings.duration < 2000
        });
        sleep(1);
    })
}