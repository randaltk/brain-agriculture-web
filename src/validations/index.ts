import { cpf, cnpj } from 'cpf-cnpj-validator';

export const validateCPFAndCNPJ = (value: string): boolean => {
  return cpf.isValid(value) || cnpj.isValid(value);
};
