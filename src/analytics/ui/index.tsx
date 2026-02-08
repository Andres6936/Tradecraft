import { Fragment } from 'react';
import * as Comp from './composition';

const AnalyticsView = () => {
  return (
    <Fragment>
      <Comp.Header />
      <Comp.Balance/>
    </Fragment>
  );
}

export { AnalyticsView, }
