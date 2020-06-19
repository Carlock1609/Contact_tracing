import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentDashboard } from '../../actions/dashboard';

const Dashboard = ({ getCurrentDashboard, auth: { user }, dashboard: { dashboard, loading } }) => {
    useEffect(() => {
        getCurrentDashboard();
    }, []);
            
    return loading && dashboard === null ? <Spinner /> : <Fragment>
        <h1 className="large text-dark">Dashboard</h1>
        <p>
            <i className="fas fa-user"></i> {' '}
            Welcome { user && user.name }
        </p>
        { dashboard !== null ? <Fragment>Has</Fragment> : <Fragment>Has not</Fragment> }
    </Fragment>
};

Dashboard.propTypes = {
    getCurrentDashboard: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    dashboard: state.dashboard
})

export default connect(
    mapStateToProps,
    { getCurrentDashboard }
)(Dashboard);