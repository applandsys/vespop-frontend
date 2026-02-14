import React from 'react';
import PropTypes from 'prop-types';

const UiCard = ({ children, className }) => {
    return (
        <div className={`bg-white border border-gray-50 p-4 shadow-md rounded-md ${className}`}>
            {children}
        </div>
    );
};

UiCard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UiCard;
