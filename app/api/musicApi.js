import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.happi.dev/v1/music',
    headers:{
        'x-happi-key': '540d3euRyGvxsbOK13I9x1J9va641bEpBIqnGU1Gw4Cfn9L3xspEXcKT',
    }
});
