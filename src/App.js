import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';

import './App.css';
import TaskManager from './components/TaskManager';
import * as actions from './store/actions';
import rootSaga from './store/sagas';
import rootReducer from './store/reducers';

export class App extends Component {
  constructor(props) {
      super(props);

      this.initStore();
  }

  componentWillMount() {
    this.store.dispatch(actions.fetchTasks());
  }

  /**
   * Initialises the redux store if not present
   */
  initStore = () => {
      const {store} = this.props;

      this.store = store;
      if (!store) {
          const sagaMiddleware = createSagaMiddleware();
          const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
          this.store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
          sagaMiddleware.run(rootSaga);
      }
  };

  render() {
      return (
          <Provider store={this.store}>
              <TaskManager />
          </Provider>
      );
  }
}

export default App;
