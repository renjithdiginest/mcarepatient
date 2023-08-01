import React, { useState } from 'react';
import Context from './index';
const NotificationProvider = (props) => {

    const [notificationList, setNotificationList] = useState(0);
    return (
        <Context.Provider
            value={{
                ...props,
                notificationList,
                setNotificationList: setNotificationList,
            }}
        >
            {props.children}
        </Context.Provider>
    )
}

export default NotificationProvider