import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelect } from 'downshift';
import classNames from 'classnames';
import DropdownItem from './DropdownItem.js';

import styles from '../styles/Dropdown.module.css';

const itemToString = (item) => item?.value ?? '';
const placeholderLabel = 'Choose your option';

const Dropdown = ({
    id,
    items,
    className,
    onStateChange,
    placeholderLabel,
    defaultSelectedItem,
    ...rest
}) => {
    const {
        isOpen,
        selectedItem,
        highlightedIndex,
        getMenuProps,
        getItemProps,
        getToggleButtonProps,
    } = useSelect({ id, itemToString, items, onStateChange, defaultSelectedItem });

    const renderDropdownItems = useCallback(() => items.map((item, index) => (
        <DropdownItem
            item={ item }
            key={ `dropdown-item-${index}` }
            selected={ selectedItem === item }
            highlighted={ highlightedIndex === index }
            { ...getItemProps({ item, index }) } />
    )), [highlightedIndex, getItemProps, selectedItem, items]);

    return (
        <div { ...rest } className={ classNames(styles.container, className) }>
            <button
                className={ classNames(styles.trigger, { [styles.isOpen]: isOpen }) }
                { ...getToggleButtonProps() }>
                { selectedItem?.label ?? placeholderLabel }
            </button>
            <ul className={ styles.menu } { ...getMenuProps() }>
                { isOpen && renderDropdownItems() }
            </ul>
        </div>
    );
};

Dropdown.propTypes = {
    className: PropTypes.string,
    onStateChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    defaultSelectedItem: PropTypes.any,
    placeholderLabel: PropTypes.string,
};

export default Dropdown;