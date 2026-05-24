export type PasswordRule = {
  id: string;
  label: string;
  test: (pw: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  { id: 'len', label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { id: 'upper', label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { id: 'lower', label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { id: 'num', label: 'One number', test: (p) => /\d/.test(p) },
  { id: 'sym', label: 'One symbol (!@#$%…)', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export function evaluatePassword(pw: string) {
  const results = PASSWORD_RULES.map((r) => ({ ...r, passed: r.test(pw) }));
  const score = results.filter((r) => r.passed).length;
  const allValid = score === PASSWORD_RULES.length;
  return { results, score, allValid };
}
