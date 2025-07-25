import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from 'context';
import { Button } from 'components';
import { User } from 'interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const Signin = () => {
  const { signin, user } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup.string().required('Il faut préciser votre email').email("L'email n'est pas valide"),
    password: yup
      .string()
      .required('Il faut préciser votre mot de passe')
      .min(4, 'Mot de passe trop court'),
  });

  const defaultValues = {
    email: '',
    password: '',
    generic: '',
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (credentials: User) => {
    try {
      clearErrors();
      await signin(credentials);
    } catch (error: any) {
      setError('generic', {
        type: 'generic',
        message: "Problème d'adresse mail ou de mot de passe",
      });
    }
  });
  return (
    <>
      {user ? (
        <Navigate to="/"></Navigate>
      ) : (
        <div className="auth-body-wrapper">
          <form onSubmit={submit} className="auth-form card">
            <h2 className="mb-10">Connexion</h2>
            <div className="auth-form-items">
              <label className="mb-10" htmlFor="email">
                Email
              </label>
              <input
                className="auth-form-inputs"
                type="text"
                data-cy="email"
                {...register('email')}
              />
              {errors.email && <p className="auth-form-error">{errors.email.message}</p>}
            </div>
            <div className="auth-form-items">
              <label className="mb-10" htmlFor="password">
                Mot de passe
              </label>
              <input
                className="auth-form-inputs"
                type="password"
                data-cy="password"
                {...register('password')}
              />
              {errors.password && <p className="auth-form-error">{errors.password.message}</p>}
            </div>
            {errors.generic && <p className="auth-form-error">{errors.generic.message}</p>}
            <div className='d-flex flex-row'>
              <Button disabled={isSubmitting} className="btn-primary mt-10">
                Connexion
              </Button>
              <Link to="/password-recovery" className="forgot-password-link">Vous avez oublié votre mot de passe ?</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
