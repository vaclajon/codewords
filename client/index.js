import React from 'react';
import ReactDOM from 'react-dom';
import './index.html';
import './style.scss';
import CardTable from './components/CardTable';

ReactDOM.render(
  <CardTable
    words={ ["tříkoruna","synonymie","Ostravanka","autokar","Ľubochňa","fasáda","robota","hypotéza","spolužačka","šatovka","atak","exorcistka","mansarda","spolupodpis","obměna","streptokok","dvounožka","zpráva","drůbežářka","klimax","sklenice","stomarkovka","hrouda","romantička","ptygmatit"] }
    map={ ["R","B","R","R","R","E","B","E","X","R","R","E","E","B","R","R","B","B","R","E","E","E","B","B","B"] }
  />,
  document.getElementById('root')
);