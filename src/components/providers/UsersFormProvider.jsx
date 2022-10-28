import { UsersFormContext } from '../../lib/contexts/UsersFormContext';
import useSelectedForm from '../../lib/hooks/useSelectedForm';

const UsersFormsProvider = ({ reloadUsers, resetFilters, children }) => {
	const { setFiltersForm, ...restSelectedForm } = useSelectedForm();

	const onSuccess = () => {
		setFiltersForm();
		reloadUsers();
		resetFilters();
	};

	return (
		<UsersFormContext.Provider
			value={{ setFiltersForm, onSuccess, ...restSelectedForm }}
		>
			{children}
		</UsersFormContext.Provider>
	);
};

export default UsersFormsProvider;
