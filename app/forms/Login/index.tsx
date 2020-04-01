import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import { Button } from 'components/Button';
import { FormInput } from 'components/FormInput';
import { Link } from 'components/Link';

import { validateEmail } from 'utils/validate';

const INITIAL_STATE: ILoginFormState = {
  auth: {},
  formErrors: {},
  formTouched: {},
  isValid: false,
};

const StyledForm = styled.form`
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

class LoginForm extends React.PureComponent<ILoginFormProps> {
  public readonly state: ILoginFormState = INITIAL_STATE;

  public readonly handleSetFormErrors = (
    formErrors: ILoginFormError, isValid: boolean, touch?: boolean,
  ) => {
    this.setState((prevState: ILoginFormState) => ({
      ...prevState,
      formErrors,
      formTouched: {
        email: touch ? true : prevState.formTouched.email,
        password: touch ? true : prevState.formTouched.password,
      },
      isValid,
    }));
  }

  public readonly handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = this.handleValidate(true);

    if (valid) {
      this.props.onSubmit(this.state.auth);
    }
  }

  private readonly handleChangeValue = (key: keyof IAuthForm, value: string) => {
    this.setState((prevState: ILoginFormState) => ({
      ...prevState,
      auth: {
        ...prevState.auth,
        [key]: value,
      },
      formTouched: {
        ...prevState.formTouched,
        [key]: true,
      },
    }), this.handleValidate);
  }

  private readonly handleValidate = (touch?: boolean) => {
    const auth = this.state.auth;
    const emailCheck = validateEmail((auth || {}).email);

    const formErrors = {
      email: !emailCheck.valid ? emailCheck.reason : undefined,
      password: !auth?.password ? 'Please enter a password' : undefined,
    };

    const isValid = Object.values(formErrors).reduce((acc, error) => (acc && !error), true);

    this.handleSetFormErrors(formErrors, isValid, touch);

    return isValid;
  }

  public render = () => (
    <StyledForm onSubmit={this.handleSubmit} autoComplete="off">
      <FormInput
        name="email"
        placeholder="Enter your email"
        isDisabled={this.props.isLoading}
        isRequired
        error={this.state.formErrors.email}
        touched={this.state.formTouched.email}
        value={this.state.auth.email}
        handleChange={(value) => { this.handleChangeValue('email', value); }}
      />

      <FormInput
        name="password"
        placeholder="Enter your password"
        isDisabled={this.props.isLoading}
        isRequired
        error={this.state.formErrors.password}
        touched={this.state.formTouched.password}
        value={this.state.auth.password}
        handleChange={(value) => { this.handleChangeValue('password', value); }}
      />

      <Buttons>
        <Link
          to="/forgotPassword"
          name="Forgot your password?"
        />

        <Button
          isDisabled={this.props.isLoading}
          fill={this.props.theme.colors.yellow[0]}
          isRound
          text="log in"
          type="submit"
        />
      </Buttons>
    </StyledForm>
  )
}

export default withTheme(LoginForm);
