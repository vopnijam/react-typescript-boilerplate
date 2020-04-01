export const convertFormToPost = (customer: IAuthForm): IAuthPost => ({
  email: customer.email as string,
  password: customer.password as string,
});
