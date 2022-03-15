import React from "react";
// import ImageUploader from "react-images-upload";

// const Test = (props: any) => {
//   const [pictures, setPictures] = useState<any[]>([[[]]]);

//   const onDrop = (picture: any) => {
//     setPictures([picture]);
//     localStorage.setItem("image", picture[0][0])
//   };
//   return (
//     <div>
//       <ImageUploader
//         {...props}
//         withIcon={true}
//         onChange={onDrop}
//         imgExtension={[".jpg", ".gif", ".png", ".gif"]}
//         maxFileSize={5242880}
//       />
//       {console.log(pictures[0][0], localStorage.image)}
//     </div>
//   );
// };

// export default Test;

// type myProps = {  };
// type myState = { file: any }

// export default class Test extends React.Component<myProps, myState> {
//   constructor(props: any){
//     super(props)
//     this.state = {
//       file: ''
//     }
//     this.handleChange = this.handleChange.bind(this)
//   }
//   handleChange(event: any) {
//     this.setState({
//       file: URL.createObjectURL(event.target.files[0])
//     })
//   }
//   render() {
//     localStorage.setItem("objUrl", this.state.file);
//     console.log(localStorage.objUrl);
//     return (
//       <div>
//         <input type="file" onChange={this.handleChange}/>
//         <img src={this.state.file}/>
//         <p>{ this.state.file }</p>
//         <a href={ this.state.file }>pic</a>
//       </div>
//     );
//   }
// }

import * as Yup from 'yup';
import ReactDOM from 'react-dom';
import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
// import styled from '@emotion/styled';

const MyTextInput: React.FC<any> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox: React.FC<any> = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// const StyledSelect = styled.select`
//    /** ... * /
//  `;
 
//  const StyledErrorMessage = styled.div`
//    /** ... * /
//  `;
 
//  const StyledLabel = styled.label`
//   /** ...* /
//  `;

// const MySelect: React.FC<any> = ({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
//       <StyledSelect {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <StyledErrorMessage>{meta.error}</StyledErrorMessage>
//       ) : null}
//     </>
//   );
// };

// And now we can use these
export default function Test() {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false, // added for our checkbox
          jobType: '', // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
          // jobType: Yup.string()
          //   .oneOf(
          //     ['designer', 'development', 'product', 'other'],
          //     'Invalid Job Type'
          //   )
          //   .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          {/* <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect> */}
          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>
          <button type="button">check</button>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};