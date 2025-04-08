import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useToasts } from 'context';
import { Button } from 'components';
import AuthApi from 'api/auth';
import { User } from 'interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required('Il faut préciser votre nom').min(2, 'Au moins 2 caractères'),
    email: yup.string().required('Il faut préciser votre email').email("L'email n'est pas valide"),
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
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { pushToast } = useToasts();

  const submit = handleSubmit(async (user: User) => {
    try {
      clearErrors();
      const data = await AuthApi.createUser(user);
      const response = await data.json();
      if (data.ok) {
        navigate('/signin');
      }
      return response;
    } catch {
      pushToast({
        title: 'Erreur',
        type: 'danger',
        content: 'Problème rencontré lors de la création du compte',
        duration: 2,
      });
    }
  });
  return (
    <div className="auth-body-wrapper">
      <form onSubmit={submit} className="auth-form card">
        <h2 className="mb-10">Inscription</h2>
        <div className="auth-form-items">
          <label className="mb-10" htmlFor="name">
            Nom
          </label>
          <input
            data-cy="registration-name"
            className="auth-form-inputs"
            type="text"
            {...register('name')}
          />
          {errors.name && <p className="auth-form-error">{errors.name.message}</p>}
        </div>
        <div className="auth-form-items">
          <label className="mb-10" htmlFor="email">
            Email
          </label>
          <input
            data-cy="registration-email"
            className="auth-form-inputs"
            type="text"
            {...register('email')}
          />
          {errors.email && <p className="auth-form-error">{errors.email.message}</p>}
        </div>
        <div className="auth-form-items">
          <label className="mb-10" htmlFor="password">
            Mot de passe
          </label>
          <input
            data-cy="registration-password"
            className="auth-form-inputs"
            type="password"
            {...register('password')}
          />
          {errors.password && <p className="auth-form-error">{errors.password.message}</p>}
        </div>
        {errors.generic && <p className="auth-form-error">{errors.generic.message}</p>}
        <div>
          <Button disabled={isSubmitting} className="btn-primary" data-cy="registration-btn">
            Inscription
          </Button>
        </div>
      </form>
    </div>
  );
};
