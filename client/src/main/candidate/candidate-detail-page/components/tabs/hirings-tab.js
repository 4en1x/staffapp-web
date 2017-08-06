import React from 'react';
import { Accordion } from 'semantic-ui-react';
import HiringItem from './components/hiring-item';

const HiringsTab = props =>
  <div className="content-tab">
    <Accordion>
      {props.hirings.map(item => <HiringItem hiring={item} />)}
    </Accordion>
  </div>;

export default HiringsTab;
