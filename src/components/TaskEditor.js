import React, { Component } from 'react';
import { Icon, Header, Modal, Form, Input, TextArea, Label, Divider } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment-timezone';

import './TaskEditor.css';
import Aux from '../hoc/Aux/Aux';
import {updateObject, getHumanizedTime} from '../shared/utility';

class TaskEditor extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
    }
    
    initialState = () => {
        return { 
            title: '', 
            description: undefined,
            reminderTime: undefined,
            reminderRecipientEmail: undefined,
            status: 'PENDING'
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
            JSON.stringify(this.state) !== JSON.stringify(nextState);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(JSON.stringify(this.state) === JSON.stringify(prevState) && this.props.task) {
            this.setState(this.props.task || {});
        }
    }

    render() {
        const {
            open,
            onClose,
            onSubmit,
            task
        } = this.props;

        const {
            title,
            description,
            creationTime,
            lastModifiedTime,
            status,
            reminderTime,
            reminderRecipientEmail
        } = this.state;

        return (
            <Aux>
                <Modal 
                    open={open} 
                    closeIcon 
                    onClose={()=>{this.setState(this.initialState(), ()=>{
                        onClose()
                    })}}
                >
                    <Header icon='edit' content='Task Editor' />
                    <Modal.Content>
                    <Form onSubmit={(e) => {
                            e.preventDefault();
                            const data = Object.assign({}, this.state);
                            // Remove undefined fields
                            Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : '');

                            this.setState(this.initialState(), ()=>{
                                onSubmit(updateObject(data, {
                                    creationTime: data.creationTime || Date.now(),
                                    lastModifiedTime: Date.now(),
                                    status: data.status || 'PENDING'
                                }));
                            });                        
                        }}>
                        <Form.Checkbox 
                            style={{display: task ? 'block' : 'none'}}
                            name='status'
                            checked={status === 'COMPLETED'}
                            className='EditorStatusCheckbox' 
                            label='The task completed' 
                            toggle
                            onChange={(e)=>this.handleChange(e, {
                                name: 'status',
                                value: status === 'PENDING' ? 'COMPLETED' : 'PENDING'
                            })}/>
                        <Form.Field 
                            name='title'
                            value={title}
                            control={Input}
                            label='Title' 
                            placeholder='Task title' 
                            required
                            onChange={this.handleChange}/>
                        <Form.Field 
                            name='description'
                            value={description}
                            control={TextArea} 
                            label='Description' 
                            placeholder='Task description...' 
                            onChange={this.handleChange}/>
                        <Form.Field 
                            name='reminderTime'
                            value={reminderTime ?
                                moment(reminderTime).tz(moment.tz.guess()).format('DD-MM-YYYY HH:mm') : null}
                            control={DateTimeInput}
                            label='Reminder' 
                            iconPosition='left'
                            placeholder='Reminder Time' 
                            onChange={(e, { name, value })=>{
                                this.handleChange(e, {
                                    name: 'reminderTime',
                                    value: moment(value, 'DD-MM-YYYY HH:mm').unix() * 1000
                                })
                            }}/>
                        <Form.Field 
                            name='reminderRecipientEmail'
                            value={reminderRecipientEmail}
                            control={Input}
                            label='Reminder Recipient Email' 
                            placeholder='Email' 
                            onChange={this.handleChange}/>
                        <Label style={{display: task ? 'inline' : 'none'}}>
                            <Icon name='calendar' /> Created on: {getHumanizedTime(creationTime)}
                        </Label>  
                        <Label style={{display: task ? 'inline' : 'none'}}>
                            <Icon name='calendar' /> Modified on: {getHumanizedTime(lastModifiedTime)}
                        </Label>
                        <Divider/>
                        <Form.Button className='EditorSubmitButton' color='green' size='small'>
                            <Icon name='save outline'/> Save
                        </Form.Button>
                    </Form>
                    </Modal.Content>
                </Modal>
            </Aux>
        );
    }
}

export default TaskEditor;