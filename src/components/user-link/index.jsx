import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from '../user-avatar';
import { Link } from 'react-router-dom';

const UserLink = props => {
    let { user, size, showAvatar, link, vertical, nameStyle = {} } = props;
    if (!user) user = { name: '未知用户' };

    const children = (
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: vertical ? 'center' : 'flex-start' }}>
            {showAvatar ? <UserAvatar src={user?.avatar} name={user?.name} size={size}/> : null}
            <span style={{ marginLeft: vertical ? 0 : 8, marginTop: vertical ? 8 : 0, ...nameStyle }}>{user?.name}</span>
        </div>
    );

    if (link) {
        return (
            <Link to={`/users/${user?.id}`}>
                {children}
            </Link>
        );
    }

    return children;

};

UserLink.propTypes = {
    user: PropTypes.object,
    size: PropTypes.any,
    showAvatar: PropTypes.bool,
    link: PropTypes.bool,
    vertical: PropTypes.bool,
};

UserLink.defaultProps = {
    showAvatar: true,
    link: false,
    vertical: false,
};

export default UserLink;
