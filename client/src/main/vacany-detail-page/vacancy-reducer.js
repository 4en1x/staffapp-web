const vacancyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_VACANCY_LIST':
      return { ...state, vacancyList: action.list };

    case 'ADD_CURRENT_VACANCY':
      return { ...state, currentVacancy: action.vacancy };

    default:
      return state;
  }
};

export default vacancyReducer;
