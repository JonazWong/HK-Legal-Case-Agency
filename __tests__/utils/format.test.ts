/**
 * Tests for formatting utilities
 */
import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatNumber,
  formatFileSize,
  formatPhoneHK,
  formatCaseNumber,
  truncate,
  titleCase,
  formatPercentage,
} from '@looper-hq/nexus-utils'

describe('Formatting Utilities', () => {
  describe('formatCurrency', () => {
    it('should format HKD currency', () => {
      expect(formatCurrency(1000)).toBe('HK$1,000.00')
      expect(formatCurrency(99.5)).toBe('HK$99.50')
      expect(formatCurrency(1234567.89)).toBe('HK$1,234,567.89')
    })

    it('should handle string input', () => {
      expect(formatCurrency('500')).toBe('HK$500.00')
      expect(formatCurrency('1234.56')).toBe('HK$1,234.56')
    })

    it('should handle negative values', () => {
      expect(formatCurrency(-100)).toBe('-HK$100.00')
    })
  })

  describe('formatNumber', () => {
    it('should format numbers with thousand separators', () => {
      expect(formatNumber(1000)).toBe('1,000')
      expect(formatNumber(1234567)).toBe('1,234,567')
      expect(formatNumber(999)).toBe('999')
    })
  })

  describe('formatFileSize', () => {
    it('should format file sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1024 * 1024)).toBe('1 MB')
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(10485760)).toBe('10 MB') // 10MB
    })
  })

  describe('formatPhoneHK', () => {
    it('should format Hong Kong mobile numbers', () => {
      expect(formatPhoneHK('51234567')).toBe('5123 4567')
      expect(formatPhoneHK('69876543')).toBe('6987 6543')
    })

    it('should format numbers with country code', () => {
      expect(formatPhoneHK('85251234567')).toBe('+852 5123 4567')
    })

    it('should return original for invalid formats', () => {
      expect(formatPhoneHK('123')).toBe('123')
      expect(formatPhoneHK('invalid')).toBe('invalid')
    })

    it('should handle numbers with existing formatting', () => {
      expect(formatPhoneHK('5123-4567')).toBe('5123 4567')
    })
  })

  describe('formatCaseNumber', () => {
    it('should convert to uppercase', () => {
      expect(formatCaseNumber('hca-2026-001')).toBe('HCA-2026-001')
      expect(formatCaseNumber('HCA-2026-001')).toBe('HCA-2026-001')
    })
  })

  describe('truncate', () => {
    it('should truncate long text', () => {
      expect(truncate('This is a very long text', 10)).toBe('This is...')
      expect(truncate('Hello', 10)).toBe('Hello')
      expect(truncate('Exactly ten!', 12)).toBe('Exactly ten!')
    })

    it('should handle exact length', () => {
      expect(truncate('Test', 4)).toBe('Test')
    })
  })

  describe('titleCase', () => {
    it('should convert to title case', () => {
      expect(titleCase('hello world')).toBe('Hello World')
      expect(titleCase('LOUD TEXT')).toBe('Loud Text')
      expect(titleCase('mixed CASE text')).toBe('Mixed Case Text')
    })
  })

  describe('formatPercentage', () => {
    it('should format percentages', () => {
      expect(formatPercentage(50)).toBe('50%')
      expect(formatPercentage(75.5)).toBe('76%')
      expect(formatPercentage(33.333, 2)).toBe('33.33%')
    })

    it('should handle decimal places', () => {
      expect(formatPercentage(50.123, 0)).toBe('50%')
      expect(formatPercentage(50.123, 1)).toBe('50.1%')
      expect(formatPercentage(50.123, 2)).toBe('50.12%')
    })
  })
})
