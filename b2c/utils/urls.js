var Config = require('config.js');
var HOST = Config.host;

var Urls = {
    REST_HOME:    HOST + '/rest/microapphome',
    REST_BANNERS: HOST + '/rest/banners',
    REST_COURSES: HOST + '/rest/courses/{courseId}',
    REST_COURSES_OF_CATEGORY: HOST + '/rest/categories/{categoryId}/courses',
    REST_COMMENTS_OF_COURSE:  HOST + '/rest/courses/{courseId}/comments'
};

module.exports = {
    Urls: Urls
};
