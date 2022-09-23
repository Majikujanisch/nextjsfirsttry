import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../styles/DropdownItem.module.css';

const DropdownItem = forwardRef(({
    item,
    highlighted,
    selected,
    className,
    ...rest
}, ref) => {
    const itemClasses = classNames(
    styles.item,
    {
        [styles.highlighted]: highlighted,
        [styles.selected]: selected,
    },
    className);

    return (
        <button { ...rest } ref={ ref } className={ itemClasses }>
            { item.label }
        </button>
    );
})

DropdownItem.propTypes = {
    selected: PropTypes.bool,
    highlighted: PropTypes.bool,
    className: PropTypes.string,
    item: PropTypes.object.isRequired,
};

DropdownItem.defaultProps = {
    selected: false,
    highlighted: false,
};

export default DropdownItem;