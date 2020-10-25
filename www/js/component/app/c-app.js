// @flow

import React, {type Node} from 'react';

import appStyle from './app.scss';

export function App(): Node {
    return <div className={appStyle.app}>app</div>;
}
