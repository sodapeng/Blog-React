import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from "../actions/index";

class PostsNew extends Component {
  renderField(field) {
    // Destruct the property from nested object
    // First get meta from field object, then get touched and error from meta object
    const { meta : { touched, error } } = field;
    const className = `form-group ${touched && error? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.labelToShow}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='text-help'>
          {touched? error: ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {

    this.props.createPost(values, () => {
      this.props.history.push('/');
    })
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      // handleSubmit is redux-form end of stuff
      // Perform all form validation etc, and when is pass all validation, it call the callback function that
      // we create to handle form submission.
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          labelToShow='Title'
          name='title'
          component={this.renderField}
        />
        <Field
          labelToShow='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
        labelToShow='Post Content'
        name='content'
        component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'  >Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  // error title, categories, and content is connect/same with the 'name' property come from field
  // Validate the inputs from values
  if (!values.title) {
    errors.title = 'Enter a title';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content';
  }
  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux form assumes form is invalid.
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);