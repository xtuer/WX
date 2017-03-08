var HOST = 'http://192.168.10.98:8080';

var URLs = {
    REST_BANNERS: HOST + '/rest/banners',
    REST_HOME: HOST + '/rest/microapphome',
    REST_COURSES_OF_CATEGORY: HOST + '/rest/categories/{categoryId}/courses'
};

module.exports = {
    URLs: URLs
};
