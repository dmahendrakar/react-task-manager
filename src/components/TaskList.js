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
        // const {
        //     taxonomyMetadata,
        //     classifications,
        //     handleKeywordsExtractedChange,
        //     handleKeywordsManualChange,
        //     initAutoTag
        // } = this.props;

        const {
            openEditor,
            selectedTask
        } = this.state;

        return (
            <Aux>
                <div className='TaskListOperations'>
                    <Input floated='left' icon='search' placeholder='Search by title...' />
                    <Button floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='plus' /> Add
                    </Button>
                </div>
                <Table compact celled definition className='TaskListTable'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Due Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row className='TableRow'>
                            <Table.Cell collapsing>
                                <Checkbox slider onClick={event => {
                                    alert('checkbox clicked')
                                }} />
                            </Table.Cell>
                            <Table.Cell  onClick={() => {
                            alert('clicked row')
                        }}>Receiving assignment from M</Table.Cell>
                            <Table.Cell>May 11, 2014</Table.Cell>
                            <Table.Cell>Completed</Table.Cell>
                        </Table.Row>
                        <Table.Row className='TableRow'>
                            <Table.Cell collapsing>
                                <Checkbox slider />
                            </Table.Cell>
                            <Table.Cell>Technical briefing with Q</Table.Cell>
                            <Table.Cell>May 11, 2014</Table.Cell>
                            <Table.Cell>Pending</Table.Cell>
                        </Table.Row>
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='4'>
                                <Button floated='right' size='small' primary>
                                    <Icon name='checkmark' /> Completed
                                </Button>
                                <Button floated='right' size='small' primary>
                                    <Icon name='minus' /> Remove
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <TaskEditor open={openEditor} task={selectedTask}/>
            </Aux>
        );
    }
}

export default TaskList;