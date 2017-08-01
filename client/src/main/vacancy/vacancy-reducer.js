const vacancyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_VACANCY_LIST':
      return {
        ...state,
        vacancyList: action.list,
        isFormLoaded: false,
        isEditFormSubmitted: false,
        isAddFormSubmitted: false
      };

    case 'ADD_CURRENT_VACANCY':
      return {
        ...state,
        currentVacancy: action.vacancy,
        isFormLoaded: false,
        isEditFormSubmitted: false,
        isAddFormSubmitted: false
      };

    case 'FILTER_VALUES':
      return { ...state, filterValues: action.values};

    case 'ADD_FILTER':
      return { ...state, filter: action.filter };

    case 'FORM_LOADED':
      return Object.assign({}, state, {
        formValues: action.data,
        isFormLoaded: true
      });

    case 'ADD_FORM_SUBMITTED':
      return { ...state, isAddFormSubmitted: true };

    case 'EDIT_FORM_SUBMITTED':
      return { ...state, isEditFormSubmitted: true };

    default:
      return state;
  }
};

export default vacancyReducer;
