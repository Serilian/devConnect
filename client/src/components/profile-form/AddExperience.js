import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { withRouter, Link } from "react-router-dom";

const AddExperience = ({addExperience, history}) => {


  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: ''
  });

  const {title, company, location, from, current, to, description} = formData;

  const onChange = (e)=> {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [toDateDisabled, toggleDisabled] = useState({
    toDateDisabled: false
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };



  return (
    <>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            onChange={(e)=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            value={company}
            onChange={(e)=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e)=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from}
                 onChange={(e)=>onChange(e)}/>
        </div>
        <div className="form-group">
          <p><input type="checkbox"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={()=>
                    {setFormData({...formData, current: !current});
                    toggleDisabled(!toDateDisabled)}}/> {" "}Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to"
                 value={to}
                 onChange={(e)=>onChange(e)}
                 disabled={toDateDisabled ? '': 'disabled'}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e)=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1"/>
        <Link className="btn btn-light my-1" to={"/dashboard"}>Go Back</Link>
      </form>
    </>
  );
};

AddExperience.propTypes = {};

export default connect(null, {addExperience})(withRouter(AddExperience));