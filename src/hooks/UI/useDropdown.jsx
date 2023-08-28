import { useState, useEffect, useRef } from 'react';

function useDropdown(initialState = false) {
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(initialState);

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdownOpen || !dropdownRef.current) return;

            const isClickInsideDropdown = dropdownRef.current.contains(target) || triggerRef.current.contains(target);
            if (isClickInsideDropdown) return;

            setDropdownOpen(false);
        };

        const keyHandler = ({ keyCode }) => {
            if (dropdownOpen && keyCode === 27) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', clickHandler);
        document.addEventListener('keydown', keyHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
            document.removeEventListener('keydown', keyHandler);
        };
    }, [dropdownOpen]);

    return {
        dropdownRef,
        triggerRef,
        dropdownOpen,
        setDropdownOpen,
    };
}

export default useDropdown;
