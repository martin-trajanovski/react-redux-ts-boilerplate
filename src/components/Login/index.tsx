import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from 'src/actions';
import { AppState } from 'src/reducers';
import { object, string } from 'yup';

export type LoginFormData = {
  email: string;
  password: string;
};

const LoginSchema = object().shape({
  email: string()
    .email('Email is invalid')
    .required('Email is required'),
  password: string().required('Password is required'),
});

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<LoginFormData>({
    validationSchema: LoginSchema,
  });
  const error = useSelector((state: AppState) => state.auth.error);
  const dispatch = useDispatch();

  const onSubmit = (data: LoginFormData): void => {
    dispatch(login(data));
  };

  return (
    <div className="form-align-middle row">
      <div className="col-md-4 offset-md-4">
        <form
          name="form"
          data-testid="login-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              data-testid="login-email-input"
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              data-testid="login-password-input"
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
          <div className="form-group text-center">
            <button
              type="submit"
              data-testid="login-button"
              className="btn btn-block btn-primary"
            >
              Login
            </button>
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
