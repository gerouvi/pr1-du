import { UsersFormContext } from '../../lib/contexts/UsersFormContext';
import useSelectedForm from '../../lib/hooks/useSelectedForm';

const UsersFormsProvider = ({ dispatchFilters, children }) => {
	const { setFiltersForm, ...restSelectedForm } = useSelectedForm();

	const onSuccess = () => {
		setFiltersForm();
		dispatchFilters({ type: 'reset' });
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
