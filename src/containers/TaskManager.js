import {connect} from 'react-redux';

import * as actions from '../store/actions/index';
import TaskManager from '../components/TaskManager';

const mapStateToProps = state => {
    return {
        tasks: state.tasks.list
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         handleKeywordsExtractedChange: keywords => dispatch(actions.updateKeywordsExtracted(keywords)),
//         handleKeywordsManualChange: keywords => dispatch(actions.updateSmartKeywords(keywords)),
//         initAutoTag: () => dispatch(actions.initAutoTag())
//     };
// };

export default connect(mapStateToProps, null)(TaskManager);