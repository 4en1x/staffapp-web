import React from 'react';
import TableComponent from '../../../../../components/table/table-component';

const HistoryTab = props => {
  return (
    <div className="content-tab background padded">
      <TableComponent history={props.history} />
    </div>
  );
};

export default HistoryTab;
