interface ILoginFormProps {
  isLoading: boolean;
  onSubmit(values: IAuthForm): void;
  theme: ITheme;
}

interface ILoginFormState {
  auth: IAuthForm;
  formErrors: IAuthFormError;
  formTouched: IAuthFormTouched;
  isValid: boolean;
}

interface ILoginFormError {
  email?: string;
  password?: string;
}
