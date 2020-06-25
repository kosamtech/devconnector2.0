import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisable, toggleToDate] = useState(false);

  const {school, degree, fieldOfStudy, from, to, current, description} = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

  return (
    <Fragment>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        addEducation(formData, history);
      }}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
           type="text" 
           placeholder="Field Of Study" 
           name="fieldOfStudy" 
           value={fieldOfStudy}
           onChange={e => handleChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
           type="date" 
           name="from" 
           value={from}
           onChange={e => handleChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input
             type="checkbox" 
             name="current" 
             value={current} 
             checked={current}
             onChange={e => {setFormData({ ...formData, current: !current})
             toggleToDate(!toDateDisable)} } /> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
           type="date" 
           name="to" 
           value={to}
           onChange={e => handleChange(e)}
           disabled={toDateDisable ? 'disabled': ''}
           />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => handleChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  );
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation));