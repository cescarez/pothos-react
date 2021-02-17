import React from 'react';
import moment from 'moment';

const Timestamp = (props) => {
    const time = moment.utc(props.time);
    const absolute = time.format('MMMM Do YYYY, h:mm:ss a');
    const absoluteLocal = time.format('l');
    const relative = time.fromNow();
    const inboxThreshold = moment.utc().subtract(1, 'days')

    const returnTime = () => {
        if (props.inbox && time < inboxThreshold) {
           return absoluteLocal 
        } else {
            return relative
        }
    }

    return <span title={absolute}>{returnTime()}</span>;
};


export default Timestamp;
