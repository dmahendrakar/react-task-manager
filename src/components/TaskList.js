import React, { Component } from 'react';
import { Button, Checkbox, Icon, Table, Input } from 'semantic-ui-react';

import './TaskList.css';
import Aux from '../hoc/Aux/Aux';
import TaskEditor from './TaskEditor';

class TaskList extends Component {
    state = {
        openEditor: false,
        selectedTask: {}
    }

    render() {
        const {
            tasks
        } = this.props;

        const {
            openEditor,
            selectedTask
        } = this.state;

        const taskRows = tasks.map(task => {
            return (
                <Table.Row className='TableRow'>
                    <Table.Cell collapsing>
                        <Checkbox slider />
                    </Table.Cell>
                    <Table.Cell>{task.title}</Table.Cell>
                    <Table.Cell>{task.status || 'Pending'}</Table.Cell>
                </Table.Row>
            );
        });

        return (
            <div className='TaskListView'>
                <div className='TaskListOperations'>
                    <Input floated='left' icon='search' placeholder='Search by title...' />
                    <Button floated='right' icon labelPosition='left' color='teal' size='small'>
                        <Icon name='plus' /> Add
                    </Button>
                </div>
                <Table compact celled definition className='TaskListTable'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {taskRows}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='4'>
                                <Button floated='right' size='small' color='teal'>
                                    <Icon name='checkmark' /> Completed
                                </Button>
                                <Button floated='right' size='small' color='teal'>
                                    <Icon name='minus' /> Remove
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <TaskEditor open={openEditor} task={selectedTask}/>
            </div>
        );
    }
}

export default TaskList;