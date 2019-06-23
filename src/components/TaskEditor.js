import React, { Component } from 'react';
import { Icon, Header, Modal, Form, Input, TextArea, Label } from 'semantic-ui-react';

import './TaskEditor.css';
import Aux from '../hoc/Aux/Aux';
import {updateObject, getHumanizedTime} from '../shared/utility';

class TaskEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
            status
        } = this.state;

        return (
            <Aux>
                <Modal 
                    open={open} 
                    closeIcon 
                    onClose={()=>{this.setState({}, ()=>{
                        onClose()
                    })}}
                    >
                    <Header icon='edit' content='Task Editor' />
                    <Modal.Content>
                    <Form onSubmit={(e) => {
                            e.preventDefault();
                            const data = Object.assign({}, this.state);
                            this.setState({}, ()=>{
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
                            style={{display: task ? 'block' : 'none'}}
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
                        <Label style={{display: task ? 'inline' : 'none'}}>
                            <Icon name='calendar' /> Created on: {getHumanizedTime(creationTime)}
                        </Label>  
                        <Label style={{display: task ? 'inline' : 'none'}}>
                            <Icon name='calendar' /> Modified on: {getHumanizedTime(lastModifiedTime)}
                        </Label>        
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