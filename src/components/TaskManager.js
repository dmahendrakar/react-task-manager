import React, {Component} from 'react';
import {Menu, Button, Grid, Icon} from 'semantic-ui-react';

import './TaskManager.css';
import Aux from '../hoc/Aux/Aux';
import TaskList from './TaskList';

class TaskManager extends Component {
    render() {
        const {
            tasks
        } = this.props;

        return (
            <Aux>
                <Menu className='AppMenu'>
                    <div className='AppName'>
                        <Icon name='tasks' />
                        <span>Task Manager</span>
                    </div>
                </Menu>
                <TaskList tasks={tasks}/>
            </Aux>
        );
    }
}

export default TaskManager;