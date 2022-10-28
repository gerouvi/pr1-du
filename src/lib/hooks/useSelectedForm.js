import { useState } from 'react';
import { USERS_FORMS } from '../../constants/usersForms';

const useSelectedForm = () => {
	const [currentForm, setCurrentForm] = useState({ form: USERS_FORMS.FILTERS });

	const setFiltersForm = () => setCurrentForm({ form: USERS_FORMS.FILTERS });
	const setCreateForm = () => setCurrentForm({ form: USERS_FORMS.CREATE });
	const setEditForm = user =>
		setCurrentForm({
			form: USERS_FORMS.EDIT,
			user
		});
	const setDeleteForm = user =>
		setCurrentForm({ form: USERS_FORMS.DELETE, user });

	return {
		currentForm: currentForm.form,
		currentUser: currentForm.user,
		setFiltersForm,
		setCreateForm,
		setEditForm,
		setDeleteForm
	};
};
export default useSelectedForm;
