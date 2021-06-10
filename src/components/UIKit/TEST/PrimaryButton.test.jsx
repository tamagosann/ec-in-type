import React from 'react';
import { render, screen } from '@testing-library/react';
import PrimaryButton from '../PrimaryButton';

test('PrimaryButton test', () => {
  const conponent = render(<PrimaryButton label={'決定'} />);
});