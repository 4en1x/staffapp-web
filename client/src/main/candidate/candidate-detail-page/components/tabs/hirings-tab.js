import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Header } from 'semantic-ui-react';
import HiringItem from './components/hiring-item';

const HiringsTab = props =>
  <div className="content-tab background padded">
    <Link to="/hiring/add">
      <Header dividing as="h3" className="custom-header">
        Add
      </Header>
    </Link>
    {props.hirings.map(item => <HiringItem hiring={item} />)}
  </div>;

export default HiringsTab;
