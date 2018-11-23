'use strict';

const obtainGeneralStatus = (status) => {

    let notStarted   = true;
    let finished     = true;

    let statusReturn = null;

    if (status && status instanceof Array) {
        status.forEach((element) => {

            if (element.status === 0) {
                finished = false;
            }
            else if (element.status === 1) {
                notStarted = false;
                finished = false;
            } else {
                notStarted = false;
            }
        });

        if (notStarted) {
            statusReturn = 0;
        }
        else if (finished) {
            statusReturn = 2;
        }
        else {
            statusReturn = 1;
        }
        return statusReturn;
    }

    return statusReturn;

};

module.exports = {
    obtainGeneralStatus
};
