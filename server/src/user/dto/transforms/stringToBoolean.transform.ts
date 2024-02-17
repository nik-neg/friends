import { isBoolean } from 'lodash';
import { BadRequestException } from '@nestjs/common';

export const stringToBoolean = ({ value, key, obj, type }) => {
  return (isBoolean(value) || value === 'true' || value === 'false') || new BadRequestException(`${key} must be a boolean`);
};