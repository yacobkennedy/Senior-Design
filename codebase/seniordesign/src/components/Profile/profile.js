import React from 'react';
import styles from './profile.module.css'; // Import CSS file for styling

const Profile = ({ initial } ) => {
  return (
    <div className={styles.profileBubble}>
        <span className={styles.initial}>{initial}</span>
    </div>
  );
};

export default Profile;