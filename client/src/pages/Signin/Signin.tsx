import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from 'context';
import { UsersInterface } from 'interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/Button/Button';

export const Signin = () => {
  const { signin, user } = useContext<any>(AuthContext);

  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Il faut préciser votre email')
      .email("L'email n'est pas valide"),
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

  const submit = handleSubmit(async (credentials: UsersInterface) => {
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
        <div className="flex-fill d-flex align-items-center justify-content-center">
          <form
            onSubmit={submit}
            className="auth-form card"
          >
            <h2 className="mb-10">Connexion</h2>
            <div className="auth-form-items">
              <label className="mb-10" htmlFor="email">Email</label>
              <input
                className="auth-form-inputs"
                type="text"
                {...register('email')}
              />
              {errors.email && (
                <p className="auth-form-error">{errors.email.message}</p>
              )}
            </div>
            <div className="auth-form-items">
              <label className="mb-10" htmlFor="password">Mot de passe</label>
              <input
                className="auth-form-inputs"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <p className="auth-form-error">{errors.password.message}</p>
              )}
            </div>
            {errors.generic && (
              <p className="auth-form-error">{errors.generic.message}</p>
            )}
            <div>

              <Button disabled={isSubmitting} className="btn-primary">
                Connexion
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};