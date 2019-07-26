export enum AuthDialogTab {
  Login,
  Register,
  ForgotPassword
}

export interface AuthDialogOptions {
  tab?: AuthDialogTab;
}
