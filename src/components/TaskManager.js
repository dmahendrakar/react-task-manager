import React, {Component} from 'react';
import {Menu, Icon} from 'semantic-ui-react';

import './TaskManager.css';
import Aux from '../hoc/Aux/Aux';
import TaskList from '../containers/TaskList';

class TaskManager extends Component {
    render() {
        return (
            <Aux>
                <Menu className='AppMenu'>
                    <div className='AppName'>
                        <Icon name='tasks' />
                        <span>Task Manager</span>
                    </div>
                </Menu>
                <TaskList/>
            </Aux>
        );
    }
}

export default TaskManager;