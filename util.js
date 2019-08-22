const util = {};

util.SuccessResponse = (data) => {
    return {status: 'SUCCESS', data: data};
};

module.exports = util;
