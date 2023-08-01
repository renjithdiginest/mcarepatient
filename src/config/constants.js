


export const env = "dev"

const URLS = {
    live: "https://api.fast2fastpay.com/",
    dev: "http://18.220.19.226:3010/"
}
const url = {
    dev: "https://apimcare.diginestsolutions.in/public/api/",
    // dev:  "http://localhost/mcare/public/api/",
    live: "https://paladmin.dnsappdemo.com/public/api"
}

const key = {
    live: "nGw3tbaew9KgjGiXf3JwVnNEDUS4pmsA",
    dev: "nGw3tbaew9KgjGiXf3JwVnNEDUS4pmsA"
}

const imgUrl = {
    dev: "https://apimcare.diginestsolutions.in/public",
    live: "https://apimcare.diginestsolutions.in/public"
}


const pdfUrl = {
    dev: "https://apimcare.diginestsolutions.in/public",
    live: "https://apimcare.diginestsolutions.in/public"
}

//'https://apidev.myfutton.com' //Dev mode= http://apidev.myfutton.com //Live Mode='http://api.myfutton.com';
//Dev mode= http://apidev.myfutton.com/api/v1/student //Live Mode=http://api.myfutton.com/api/v1/student';

export const BASE_URL = URLS[env]

export const PDF_URL = pdfUrl[env]

export const IMG_URL = imgUrl[env]


export const API_URL = `${url[env]}`
export const API_KEY = `${key[env]}`