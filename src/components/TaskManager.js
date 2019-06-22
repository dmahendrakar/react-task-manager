import React, {Component} from 'react';
import {Menu, Button, Grid, Icon} from 'semantic-ui-react';

import './TaskManager.css';
import Aux from '../hoc/Aux/Aux';
import TaskList from './TaskList';

class TaskManager extends Component {
    render() {
        // const {
        //     taxonomyMetadata,
        //     classifications,
        //     handleKeywordsExtractedChange,
        //     handleKeywordsManualChange,
        //     initAutoTag
        // } = this.props;

        return (
            <Aux>
                <Menu>
                    <div className='AppName'>
                        <Icon name='tasks' />
                        Task Manager
                    </div>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button positive>Save</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Grid id='TaskViewGrid'>
                    <Grid.Row>
                        <Grid.Column>
                            <TaskList/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Aux>
        );
    }
}

export default TaskManager;