export interface Social {
  id: 'linkedin' | 'github';
  label: string;
  href: string;
}

export const socials: readonly Social[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/moralesr2299' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/MarceRyan' },
];
