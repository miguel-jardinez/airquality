import dayjs from 'dayjs';
import { dateDefaultFormat, dateFromNow } from '../dates';

describe('dates', () => {
  describe('dateFromNow', () => {
    it('Should return the number of elapsed days if the date is greater than one day.', () => {
      // Arrange
      const date = dayjs().subtract(2, 'days').toDate();

      // Assertion
      expect(dateFromNow(date)).toBe('2 Days Ago');
    });

    it('Should return the number of elapsed minutes if the date is greater than one minute but less than an hour.', () => {
      // Arrange
      const date = dayjs().subtract(30, 'minutes').toDate();

      // Assertion
      expect(dateFromNow(date)).toMatch('30 Minutes Ago');
    });

    it('Should return the number of elapsed hours if the date is greater than one hour but less than a day.', () => {
      // Arrange
      const date = dayjs().subtract(5, 'hours').toDate();

      // Assertion
      expect(dateFromNow(date)).toMatch('5 Hours Ago');
    });

    it('Should return undefined if the date is equal to or later than the current date.', () => {
      // Arrange
      const date = dayjs().toDate();

      // Assertion
      expect(dateFromNow(date)).toBeUndefined();
    });
  });

  describe('dateDefaultFormat', () => {
    it('Should format the date in the DD/MM/YYYY format.', () => {
      // Arrange
      const fechaEjemplo = dayjs('02-10-2024').toDate();

      // Act
      const resultado = dateDefaultFormat(fechaEjemplo);

      // Assertion
      expect(resultado).toBe('10/02/2024');
    });
  });
});
