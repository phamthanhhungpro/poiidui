const apiUrl = 'https://localhost:7124/';

// const apiUrl = 'http://113.160.187.187:1118/';
const hrmFrontEndUrl = 'https://poihrmui.vercel.app';
const prjFrontEndUrl = 'https://poiprjui.vercel.app';
const idFrontEndUrl = 'https://poiidui.vercel.app';

export const environment = {
    production: false,
    apiUrl: apiUrl,
    idApiUrl: apiUrl + 'id/api/',
    idApiUrlWithOutEndding: apiUrl + 'id',
    hrmFrontEndUrl: hrmFrontEndUrl,
    prjFrontEndUrl: prjFrontEndUrl,
    idFrontEndUrl: idFrontEndUrl,
};
