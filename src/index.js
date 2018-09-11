import React, { Fragment } from 'react';
import { HomeScreen } from './container';
import { RenderStatusBar } from './component';

const AppContainer = () => (
  <Fragment>
    <RenderStatusBar />
    <HomeScreen />
  </Fragment>
)
export default AppContainer;