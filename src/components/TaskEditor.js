import React, { Component } from 'react';
import { Icon, Header, Modal, Form, Input, TextArea } from 'semantic-ui-react';

import './TaskEditor.css';
import Aux from '../hoc/Aux/Aux';
import {updateObject} from '../shared/utility';

class TaskEditor extends Component {
    constructor(props) {
        super(props);
        this.state = this.initializeState();
    }

    initializeState = () => {
        return {
            title: '', 
            description: '',
            status: 'PENDING'
        };
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
            JSON.stringify(this.state) !== JSON.stringify(nextState);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.task) {
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
            description
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
                                    creationTime: Date.now(),
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