import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/store/store';


const ProfileWidget: React.FC = () => {

    const user = useSelector((state: RootState) => state.auth);

    return (
        <div>
            {/* <div className='auth-text-sidebar'><span className='sub-text-sidebar'>Имя:</span>  {user.username} </div> */}
            <div className='auth-text-sidebar'><span className='sub-text-sidebar'>Логин:</span>  {user.email}</div>

            {user.isModerator ? (
                <>
                    <div className='auth-text-sidebar'><span className='sub-text-sidebar'>Привелегия:</span>  [модератор]</div>
                </>
            ) : (
                <div className='auth-text-sidebar'><span className='sub-text-sidebar'>Привелегия:</span>  [пользователь]</div>
            )}
        </div>

    );
};

export default ProfileWidget;