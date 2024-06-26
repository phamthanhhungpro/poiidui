const apiUrl = 'https://api.poi.vn:1118/';
const hrmFrontEndUrl = 'https://poihrmui.vercel.app';
const prjFrontEndUrl = 'https://poiprjui.vercel.app';
const idFrontEndUrl = 'https://poiidui.vercel.app/';


export const environment = {
    production: true,
    apiUrl: apiUrl,
    idApiUrl: apiUrl + 'id/api/',
    idApiUrlWithOutEndding: apiUrl + 'id',
    hrmFrontEndUrl: hrmFrontEndUrl,
    prjFrontEndUrl: prjFrontEndUrl,
    idFrontEndUrl: idFrontEndUrl,
};
