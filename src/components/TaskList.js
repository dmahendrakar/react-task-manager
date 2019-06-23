import React, { Component } from 'react';
import { Button, Checkbox, Icon, Table, Input } from 'semantic-ui-react';

import './TaskList.css';
import TaskEditor from './TaskEditor';
import {getHumanizedTime} from '../shared/utility';

class TaskList extends Component {
    state = {
        openEditor: false,
        openCreator: false,
        selectedTask: {}
    }

    render() {
        const {
            tasks,
            onCreate,
            onUpdate,
            onDelete
        } = this.props;

        const {
            openEditor,
            openCreator,
            selectedTask
        } = this.state;

        const taskRows = tasks.map(task => {
            const ClickableCell = (props) => {
                return (
                    <Table.Cell onClick={()=>{this.setState({
                        openEditor: true,
                        selectedTask: task
                    })}}>{props.value}</Table.Cell>
                );
            }

            return (
                <Table.Row 
                    className='TableRow' 
                    key={task.id}
                    >
                    <Table.Cell collapsing>
                        <Checkbox slider />
                    </Table.Cell>                
                    <ClickableCell value={task.title}/>
                    <ClickableCell value={getHumanizedTime(task.creationTime)}/>
                    <ClickableCell value={task.status || 'PENDING'}/>
                </Table.Row>
            );
        });

        return (
            <div className='TaskListView'>
                <div className='TaskListOperations'>
                    <Input floated='left' icon='search' placeholder='Search by title...' />
                    <Button floated='right' icon labelPosition='left' color='teal' size='small'
                        onClick={()=>{
                            this.setState({openCreator: true});
                        }}
                    >
                        <Icon name='plus' /> Add
                    </Button>
                </div>
                <Table compact celled definition className='TaskListTable'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Created Date</Table.HeaderCell>
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
                                    <Icon name='minus' /> Remove
                                </Button>
                                <Button floated='right' size='small' color='teal'>
                                    <Icon name='paper plane' /> Completed
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <TaskEditor 
                    open={openCreator} 
                    onClose={()=>{this.setState({openCreator:false})}}
                    onSubmit={(newTask)=>{this.setState({openCreator:false}); onCreate(newTask);}}
                />
                <TaskEditor 
                    open={openEditor} 
                    task={selectedTask}
                    onClose={()=>{this.setState({openEditor:false})}}
                    onSubmit={(newTask)=>{this.setState({openEditor:false}); onUpdate(newTask);}}
                />
            </div>
        );
    }
}

export default TaskList;