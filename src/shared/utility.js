import moment from 'moment-timezone';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const updateArray = (oldArray, newEntries) => {
    return [
        ...oldArray,
        ...newEntries
    ];
};

export const hasOwnProperty = (object, property) => {
    return object && Object.prototype.hasOwnProperty.call(object, property);
};

export const getHumanizedTime = (unixTimestamp) => {
    return moment(unixTimestamp).tz(moment.tz.guess()).format('MMMM Do YYYY, h:mm:ss A');
};