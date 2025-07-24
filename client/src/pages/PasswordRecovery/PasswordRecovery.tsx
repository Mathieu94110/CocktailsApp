import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToasts } from 'context';
import AuthApi from 'api/auth';
import * as yup from 'yup';
import styles from './PasswordRecovery.module.scss';

const defaultValues = {
  email: ''
};

const schema = yup.object({
  email: yup
    .string()
    .email('Veuillez entrer une adresse e-mail valide.')
    .required('L\'adresse e-mail est requise.')
}).required();

export const PasswordRecovery = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { pushToast } = useToasts();

  const submit = handleSubmit(async (data: { email: string }) => {
    try {
      await AuthApi.sendPassword(data.email);
      pushToast({
        title: 'Succès',
        type: 'success',
        content: 'Un email a été envoyé à votre boite mail',
        duration: 2,
      });
    } catch {
      pushToast({
        title: 'Erreur',
        type: 'danger',
        content: 'Une erreur est survenue. Veuillez réessayer.',
        duration: 2,
      });
    }
  });

  return (
    <div className="auth-body-wrapper">
      <div className={styles.formContainer}>
        <form className={styles.card} onSubmit={submit}>
          <div className={styles.cardHeader}>Réinitialiser le mot de passe</div>
          <div className={styles.cardBody}>

            <div className={styles.formGroup}>
              <label htmlFor="email">Adresse e-mail</label>
              <input
                className={styles.formControl}
                id="email"
                {...register('email')}
              />
              <p className={styles.textDanger}>
                {errors.email && (
                  <span>
                    {errors.email.message}
                  </span>)
                }
              </p>
            </div>

            <div className={styles.formFooter}>
              <input
                type="submit"
                value="Réinitialiser le mot de passe"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
