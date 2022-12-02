import React from 'react';
import { connect } from 'react-redux'
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl'

class ManageSchedule extends React.Component {
    render() {
        return (
            <>
                <div className="manage-schedule-container">
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title"/>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule)