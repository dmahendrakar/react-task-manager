import React, { Component } from 'react';
import { Dimmer, Loader, Button, Checkbox, Icon, Table, Input } from 'semantic-ui-react';
import { Slide, ToastContainer } from 'react-toastify';

import './TaskList.css';
import TaskEditor from './TaskEditor';
import {getHumanizedTime} from '../shared/utility';

class TaskList extends Component {
    state = {
        openEditor: false,
        openCreator: false,
        clickedTask: {},
        checkedTasks: {},
        searchValue: '',
        loaderText: ''
    }

    resetCreator = (next = ()=>{}) => this.setState({openCreator:false, clickedTask: {}}, next);
    resetEditor = (next = ()=>{}) => this.setState({openEditor:false, clickedTask: {}}, next);

    render() {
        const {
            loading,
            tasks,
            operationInProgress,
            onCreate,
            onUpdate,
            onBulkUpdate,
            onDelete
        } = this.props;

        const {
            openEditor,
            openCreator,
            clickedTask,
            checkedTasks,
            searchValue,
            loaderText
        } = this.state;

        if(loading) {
            return (
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            )
        }

        const filteredTasks = tasks.filter(task => task.title.includes(searchValue));
        const taskRows = filteredTasks.map((task, index) => {
            const ClickableCell = (props) => {
                return (
                    <Table.Cell onClick={() => {
                        this.setState({
                        openEditor: true,
                        clickedTask: task
                    })}}>{props.value}</Table.Cell>
                );
            }

            return (
                <Table.Row 
                    className='TableRow' 
                    key={task.id}
                    >
                    <Table.Cell collapsing>
                        <Checkbox slider checked={Object.keys(checkedTasks).includes(String(index))} onClick={()=>{                            
                            const _checkedTasks = Object.assign({}, checkedTasks);
                            if (!Object.keys(_checkedTasks).includes(String(index))) {
                                _checkedTasks[index] = task;
                            } else {
                                delete _checkedTasks[index];
                            }

                            this.setState({
                                checkedTasks: _checkedTasks
                            })
                        }} />
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
                    <Input floated='left' icon='search' placeholder='Search by title...' value={searchValue} onChange={(e, { name, value })=>{
                        this.setState({searchValue: value});
                    }}/>
                    <Button floated='right' icon labelPosition='left' color='teal' size='small'
                        onClick={()=>{
                            this.setState({openCreator: true, loaderText: 'Adding task...'});
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
                                <span style={{display: operationInProgress && loaderText.length ? 'inline': 'none'}}>
                                    <Loader active inline/>&nbsp;&nbsp;{loaderText}
                                </span>
                                <Button floated='right' size='small' color='teal' onClick={()=>{
                                    if(!Object.keys(checkedTasks).length) return;
                                    this.setState({checkedTasks: {}, loaderText: 'Removing tasks...'}, ()=>{
                                        onDelete(Object.values(checkedTasks));
                                    });
                                }}>
                                    <Icon name='minus' /> Remove
                                </Button>
                                <Button floated='right' size='small' color='teal' onClick={()=>{
                                    if(!Object.keys(checkedTasks).length) return;
                                    this.setState({checkedTasks: {}, loaderText: 'Updating tasks...'}, ()=>{
                                        onBulkUpdate(Object.values(checkedTasks).map(task => {
                                            task.status = 'COMPLETED';
                                            return task
                                        }))
                                    });
                                }}>
                                    <Icon name='check' /> Completed
                                </Button>                        
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <TaskEditor 
                    open={openCreator} 
                    onClose={()=>{this.resetCreator()}}
                    onSubmit={newTask => {this.resetCreator(()=>{
                        onCreate(newTask)
                    })}}
                />
                <TaskEditor 
                    open={openEditor} 
                    task={clickedTask}
                    onClose={()=>{this.resetEditor()}}
                    onSubmit={task => {this.resetEditor(()=>{
                        onUpdate(task)
                    })}}
                />
                <ToastContainer transition={Slide} />
            </div>
        );
    }
}

export default TaskList;