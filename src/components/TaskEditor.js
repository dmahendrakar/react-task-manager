import React, { Component } from 'react';
import { Button, Icon, Header, Modal, Form, Input, TextArea } from 'semantic-ui-react';

import './TaskEditor.css';
import Aux from '../hoc/Aux/Aux';

class TaskEditor extends Component {
    render() {
        const {
            open
        } = this.props;

        return (
            <Aux>
                <Modal open={open}>
                    <Header icon='edit' content='Task Editor' />
                    <Modal.Content>
                    <Form>
                        <Form.Field control={Input} label='Title' placeholder='Task title' />
                        <Form.Field control={TextArea} label='Description' placeholder='Task description...' />                        
                    </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button>
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button color='green'>
                            <Icon name='checkmark' /> Save
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Aux>
        );
    }
}

export default TaskEditor;