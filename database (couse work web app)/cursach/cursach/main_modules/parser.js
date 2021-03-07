const fetch = require('node-fetch');

async function sendRecuest(url) {
    return fetch(url).then(data => data.text())
}

const obj = {
    async parse() {
        const requestUrl = 'https://randomus.ru/name?type=0&sex=0&count=100';
        let result = {};
        let names = [];
        let surnames = [];
        let pats = [];
        await sendRecuest(requestUrl).then(data => {
            const response = data.substring(data.indexOf('data-numbers') + 14, data.indexOf('>', data.indexOf('<textarea id="result_textarea"')) - 1);
            const response_arr = response.split(',');
            for (let i = 0; i < response_arr.length; i++) {
                names.push(response_arr[i].split(' ')[1]);
                surnames.push(response_arr[i].split(' ')[0]);
                pats.push(response_arr[i].split(' ')[2]);
            }
            result['name'] = names;
            result['surname'] = surnames;
            result['patronymic'] = pats;
        });
        return result;
    },
    async parse_words() {
        const requestUrl = 'https://sanstv.ru/randomWord/lang-en/strong-2/count-1000/word-%3F%3F%3F%3F%3F%3F';
        let first = [];
        let second = [];
        await sendRecuest(requestUrl).then(data => {
            const html = data.substring(data.indexOf(`<td id='result'><nt><ol class='words'`) + 66, data.indexOf('</ol></nt></td>', data.indexOf(`<td id='result'><nt><ol class='words'></ol>`)) - 1);
            let arr = html.split(`</span></li><li ><span class='strong' '>`);
            let s_arr = arr[arr.length - 1].split(`</span></li><li ><span class='strong2' '>`);
            arr.pop();
            s_arr.pop();
            arr = arr.concat(s_arr);
            first = arr;
        });
        await sendRecuest(requestUrl).then(data => {
            const html = data.substring(data.indexOf(`<td id='result'><nt><ol class='words'`) + 66, data.indexOf('</ol></nt></td>', data.indexOf(`<td id='result'><nt><ol class='words'></ol>`)) - 1);
            let arr = html.split(`</span></li><li ><span class='strong' '>`);
            let s_arr = arr[arr.length - 1].split(`</span></li><li ><span class='strong2' '>`);
            arr.pop();
            s_arr.pop();
            arr = arr.concat(s_arr);
            second = arr;
        });
        let result = {};
        result.first = first;
        result.second = second;
        return result;
    },

}


module.exports = obj;