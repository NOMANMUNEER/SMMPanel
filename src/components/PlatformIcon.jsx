import React from 'react';
import Icon from './Icon';

const PlatformIcon = ({ platform }) => (
  <div className={`platform-icon platform-${platform?.toLowerCase()}`}>
    <Icon name={platform?.toLowerCase()} size={14} color="white" />
  </div>
);

export default PlatformIcon;
