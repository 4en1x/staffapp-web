const vacancyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_VACANCY_LIST':
      return { ...state, vacancyList: action.list };

    case 'ADD_CURRENT_VACANCY':
      return { ...state, currentVacancy: action.vacancy };

    case 'FILTER_VALUES':
      return { ...state, filterValues: action.values };

    case 'ADD_FILTER':
      return { ...state, filter: action.filter };

    case 'ADD_FORM_VALUES':
      return { ...state, formValues: action.formValues };

    case 'FORM_SUBMIT':
      return { ...state, isFormSubmitted: true };

    case 'RESET_FORM':
      return { ...state, formValues: null, isFormSubmitted: false };

    case 'RESET_VACANCY_LIST':
      return { ...state, vacancyList: null };

    case 'RESET_CURRENT_VACANCY':
      return { ...state, currentVacancy: null, isVacancyDeleted: true };

    case 'RESET_DELETED_VACANCY':
      return { ...state, isVacancyDeleted: false };

    default:
      return state;
  }
};

export default vacancyReducer;
