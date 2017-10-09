/**
 * Created by desaim on 4/22/2017.
 */
import React  from 'react';
import PropType from 'prop-types';
function PlayerPreview({username,children}) {
    return(
        <div>
            <div className="column">
                <img
                    className="avatar"
                    src={avatar}
                    alt={'Avatar for'+username}
                />
                <h2 className="username">@{ username}</h2>
                {children}
            </div>
        </div>
    )
}
PlayerPreview.propTypes = {
    avatar: PropType.string.isRequired,
    username: PropType.string.isRequired
}

export default  PlayerPreview;