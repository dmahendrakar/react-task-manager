import {connect} from 'react-redux';

import * as actions from '../store/actions';
import TaskList from '../components/TaskList';
import {getTaskList} from '../store/selectors';

const mapStateToProps = state => {
    return {
        tasks: getTaskList(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreate: newTask => dispatch(actions.createTask(newTask)),
        onUpdate: task => dispatch(actions.updateTask(task)),
        onBulkUpdate: tasks => dispatch(actions.bulkUpdateTasks(tasks)),
        onDelete: tasks => dispatch(actions.deleteTasks(tasks))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);