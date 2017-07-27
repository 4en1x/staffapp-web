const vacancyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_VACANCY_LIST':
      return { ...state, vacancyList: action.list };

    case 'ADD_CURRENT_VACANCY':
      return { ...state, currentVacancy: action.vacancy };

    case 'ADD_FILTER':
      return { ...state, filter: action.filter };

    default:
      return state;
  }
};

export default vacancyReducer;
