import styles from './Signup.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUser } from '../../api/users';
import { useNavigate } from 'react-router';
import { UsersInterface } from '../../interfaces';

function Signup() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Il faut préciser votre nom')
      .min(2, 'Au moins 2 caractères'),
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
    name: '',
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

  const submit = handleSubmit(async (user: UsersInterface) => {
    try {
      clearErrors();
      await createUser(user);
      navigate('/signin');
    } catch (message: any) {
      setError('generic', { type: 'generic', message });
    }
  });
  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      <form
        onSubmit={submit}
        className={`${styles.form} d-flex flex-column card p-20`}
      >
        <h2 className="mb-10">Inscription</h2>
        <div className="mb-10  d-flex flex-column">
          <label htmlFor="name">Nom</label>
          <input className="form-input" type="text" {...register('name')} />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="email">Email</label>
          <input className="form-input" type="text" {...register('email')} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            {...register('password')}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        {errors.generic && (
          <p className="form-error">{errors.generic.message}</p>
        )}
        <div>
          <button disabled={isSubmitting} className="btn btn-primary">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
