const CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB';

export default function changeActiveTab(name) {
  return {
    type: CHANGE_ACTIVE_TAB,
    name
  };
}
