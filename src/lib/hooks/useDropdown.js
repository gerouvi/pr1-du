import { useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
	const [dropdownOpened, setDropdownOpened] = useState(false);
	const dropdownRef = useRef(null);

	const openDropdown = () => setDropdownOpened(true);
	const closeDropdown = () => setDropdownOpened(false);

	const handleCloseDropdown = ev => {
		if (!dropdownRef.current.contains(ev.target)) closeDropdown();
	};

	useEffect(() => {
		if (!dropdownOpened) return;
		window.addEventListener('click', handleCloseDropdown, { capture: true });

		return () =>
			window.removeEventListener('click', handleCloseDropdown, {
				capture: true
			});
	}, [dropdownOpened]);

	return {
		dropdownOpened,
		dropdownRef,
		openDropdown,
		closeDropdown
	};
};
