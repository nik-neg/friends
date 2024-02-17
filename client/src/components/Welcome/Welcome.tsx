import { AuthContainer, AuthForm, AuthFormWrapper, Input, SLink, SWarningSpan } from './Welcome.styles.ts';
import { useState } from 'react';
import { Spacer } from '../common/Spacer/Spacer.styles.ts';
// @ts-ignore
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IWelcome } from './types.ts';
import { loginSchema, registerSchema } from './validation/schema.ts';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {

  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();


  const defaultValues: IWelcome = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues,
    resolver: yupResolver(isRegistered ? loginSchema : registerSchema),
  });


  const handleLogin = async () => {
    if (isValid) {
      try {
        let userData;
        if (isRegistered) {

        } else {

        }
        localStorage.setItem('user', JSON.stringify(userData));

        navigate('/menu');
      } catch (error) {
        console.log({ error });
      }
    }
  };
  return (
    <AuthContainer>
      <h1>Welcome</h1>
      <AuthFormWrapper>
        <AuthForm onSubmit={handleSubmit(handleLogin)}>
          {!isRegistered && (
            <>
              <Input
                type="text"
                placeholder="FirstName"
                id={'firstName'}
                {...register('firstName')}
              />
              {errors.firstName && (
                <SWarningSpan>{errors.firstName.message}</SWarningSpan>
              )}
              <Input
                type="text"
                placeholder="LastName"
                id={'lastName'}
                {...register('lastName')}
              />
              {errors.lastName && (
                <SWarningSpan>{errors.lastName.message}</SWarningSpan>
              )}
            </>
          )}
          <Input
            type="email"
            placeholder="Email"
            id={'email'}
            {...register('email')}
          />
          {errors.email && <SWarningSpan>{errors.email.message}</SWarningSpan>}
          <Input
            type="password"
            placeholder="Password"
            id={'password'}
            {...register('password')}
          />
          {errors.password && (
            <SWarningSpan>{errors.password.message}</SWarningSpan>
          )}
          <Input
            type="submit"
            value={isRegistered ? 'Login' : 'Register'}
            name={'submit'}
            id={'submit'}
            isSubmit
            onClick={handleLogin}
          />
        </AuthForm>
      </AuthFormWrapper>
      <Spacer height={1} />
      <SLink onClick={() => setIsRegistered(!isRegistered)}>
        {!isRegistered
          ? 'Already user? Login here...'
          : 'Not user yet? Register!'}
      </SLink>
      <Spacer height={1} />
    </AuthContainer>
  );
};
