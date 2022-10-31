import { UsersFormContext } from '../../lib/contexts/UsersFormContext';
import useSelectedForm from '../../lib/hooks/useSelectedForm';

const UsersFormsProvider = ({ resetFilters, children }) => {
	const { setFiltersForm, ...restSelectedForm } = useSelectedForm();

	const onSuccess = () => {
		setFiltersForm();
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
