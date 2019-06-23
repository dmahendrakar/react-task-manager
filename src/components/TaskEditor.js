import React, { Component } from 'react';
import { Icon, Header, Modal, Form, Input, TextArea, Label } from 'semantic-ui-react';

import './TaskEditor.css';
import Aux from '../hoc/Aux/Aux';
import {updateObject, getHumanizedTime} from '../shared/utility';

class TaskEditor extends Component {
    constructor(props) {
        super(props);
        this.state = this.initializeState();
    }

    initializeState = () => {
        return {
            title: '', 
            description: ''
        };
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
            JSON.stringify(this.state) !== JSON.stringify(nextState);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(JSON.stringify(this.state) === JSON.stringify(prevState) && this.props.task) {
            this.setState(this.props.task || this.initializeState());
        }
    }

    render() {
        const {
            open,
            onClose,
            onSubmit
        } = this.props;

        const {
            title,
            description,
            creationTime,
            lastModifiedTime,
            status
        } = this.state;

        return (
            <Aux>
                <Modal 
                    open={open} 
                    closeIcon 
                    onClose={()=>{this.setState(this.initializeState(), ()=>{
                        onClose()
                    })}}
                    >
                    <Header icon='edit' content='Task Editor' />
                    <Modal.Content>
                    <Form onSubmit={(e) => {
                            e.preventDefault();
                            const data = Object.assign({}, this.state);
                            this.setState(this.initializeState(), ()=>{
                                onSubmit(updateObject(data, {
                                    creationTime: data.creationTime || Date.now(),
                                    lastModifiedTime: Date.now(),
                                    status: data.status || 'PENDING'
                                }));
                            });                        
                        }}>
                        <Form.Field 
                            name='title'
                            value={title}
                            control={Input}
                            label='Title' 
                            placeholder='Task title' 
                            onChange={this.handleChange}/>
                        <Form.Field 
                            name='description'
                            value={description}
                            control={TextArea} 
                            label='Description' 
                            placeholder='Task description...' 
                            onChange={this.handleChange}/>
                        <Form.Checkbox 
                            name='status'
                            checked={status === 'COMPLETED'}
                            className='EditorStatusCheckbox' 
                            label='The task completed' 
                            toggle
                            onChange={(e)=>this.handleChange(e, {
                                name: 'status',
                                value: status === 'PENDING' ? 'COMPLETED' : 'PENDING'
                            })}    
                            />
                        <Label>
                            <Icon name='calendar' /> Created on: {getHumanizedTime(creationTime)}
                        </Label>  
                        <Label>
                            <Icon name='calendar' /> Modified on: {getHumanizedTime(lastModifiedTime)}
                        </Label>        
                        <Form.Button className='EditorSubmitButton' color='green'>
                            <Icon name='checkmark' /> Save
                        </Form.Button>
                    </Form>
                    </Modal.Content>
                </Modal>
            </Aux>
        );
    }
}

export default TaskEditor;