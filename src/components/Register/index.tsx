import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from 'src/actions';
import { AppState } from 'src/reducers';
import { object, string, ref } from 'yup';

export type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const RegisterSchema = object().shape({
  email: string()
    .email('Email is invalid')
    .required('Email is required'),
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  password: string().required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const Register: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<RegisterFormData>({
    validationSchema: RegisterSchema,
  });
  const error = useSelector((state: AppState) => state.auth.error);
  const dispatch = useDispatch();

  const onSubmit = (data: RegisterFormData): void => {
    dispatch(registerUser(data));
  };

  return (
    <div className="form-align-middle row">
      <div className="col-md-4 offset-md-4">
        <form
          name="form"
          data-testid="register-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              data-testid="register-email-input"
              className="form-control"
              name="email"
              ref={register}
            />
            {errors.email && (
              <span className="text-danger" data-testid="email-errors">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              data-testid="register-firstName-input"
              className="form-control"
              name="firstName"
              ref={register}
            />
            {errors.firstName && (
              <span className="text-danger" data-testid="firstName-errors">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              data-testid="register-lastName-input"
              className="form-control"
              name="lastName"
              ref={register}
            />
            {errors.lastName && (
              <span className="text-danger" data-testid="lastName-errors">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              data-testid="register-password-input"
              className="form-control"
              name="password"
              ref={register}
            />
            {errors.password && (
              <span className="text-danger" data-testid="password-errors">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              data-testid="register-confirmPassword-input"
              className="form-control"
              name="confirmPassword"
              ref={register}
            />
            {errors.confirmPassword && (
              <span
                className="text-danger"
                data-testid="confirmPassword-errors"
              >
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="form-group text-center">
            <button
              type="submit"
              data-testid="register-button"
              className="btn btn-block btn-primary"
            >
              Register
            </button>
            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
