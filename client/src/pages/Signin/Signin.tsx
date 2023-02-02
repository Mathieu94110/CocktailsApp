import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Signin.module.scss';
import { useForm } from 'react-hook-form';
import { AuthContext } from 'context';
import { UsersInterface } from 'interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
            className={`${styles.form} d-flex flex-column card p-20`}
          >
            <h2 className="mb-10">Connexion</h2>
            <div className="mb-10 d-flex flex-column">
              <label htmlFor="email">Email</label>
              <input
                className="form-input"
                type="text"
                {...register('email')}
              />
              {errors.email && (
                <p className={styles.formError}>{errors.email.message}</p>
              )}
            </div>
            <div className="mb-10 d-flex flex-column">
              <label htmlFor="password">Password</label>
              <input
                className="form-input"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <p className={styles.formError}>{errors.password.message}</p>
              )}
            </div>
            {errors.generic && (
              <p className={styles.formError}>{errors.generic.message}</p>
            )}
            <div>
              <button disabled={isSubmitting} className="btn btn-primary">
                Connexion
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};