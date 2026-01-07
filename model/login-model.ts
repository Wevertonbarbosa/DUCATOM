export interface LoginInputsProps {
    email: string;
    password: string;
    setEmail: (v: string) => void;
    setPassword: (v: string) => void;
}

export interface LoginActionsProps {
    onSubmit: () => void;
    loading: boolean;
}
