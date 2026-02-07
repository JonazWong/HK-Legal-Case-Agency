/**
 * Tests for date utilities
 */
import { describe, it, expect, beforeAll, vi } from 'vitest'
import {
  nowInHK,
  formatDateHK,
  formatDateShort,
  formatDateLong,
  formatTime,
  isPast,
  isFuture,
  addBusinessDays,
  calculateDueDate,
  daysUntil,
  isOverdue,
} from '@looper-hq/nexus-utils'

describe('Date Utilities', () => {
  describe('formatDateHK', () => {
    it('should format dates in Hong Kong timezone', () => {
      const date = new Date('2026-02-06T10:30:00Z')
      const formatted = formatDateHK(date)
      expect(formatted).toContain('2026')
      expect(formatted).toContain('02')
      expect(formatted).toContain('06')
    })

    it('should handle ISO string input', () => {
      const result = formatDateHK('2026-02-06T10:30:00Z', 'yyyy-MM-dd')
      expect(result).toMatch(/2026-02-\d{2}/)
    })

    it('should use custom format string', () => {
      const date = new Date('2026-02-06')
      const result = formatDateHK(date, 'dd/MM/yyyy')
      expect(result).toMatch(/\d{2}\/02\/2026/)
    })
  })

  describe('formatDateShort', () => {
    it('should format dates in dd/MM/yyyy format', () => {
      const date = new Date('2026-02-06')
      const result = formatDateShort(date)
      expect(result).toMatch(/\d{2}\/02\/2026/)
    })
  })

  describe('formatDateLong', () => {
    it('should format dates in long format with time', () => {
      const date = new Date('2026-02-06T14:30:00Z')
      const result = formatDateLong(date)
      expect(result).toContain('Feb')
      expect(result).toContain('2026')
    })
  })

  describe('formatTime', () => {
    it('should format time only', () => {
      const date = new Date('2026-02-06T14:30:00Z')
      const result = formatTime(date)
      expect(result).toMatch(/\d{2}:\d{2}/)
    })
  })

  describe('nowInHK', () => {
    it('should return current date in HK timezone', () => {
      const now = nowInHK()
      expect(now).toBeInstanceOf(Date)
      expect(now.getTime()).toBeGreaterThan(0)
    })
  })

  describe('isPast', () => {
    it('should detect past dates', () => {
      const pastDate = new Date('2020-01-01')
      expect(isPast(pastDate)).toBe(true)
    })

    it('should detect future dates as not past', () => {
      const futureDate = new Date('2030-01-01')
      expect(isPast(futureDate)).toBe(false)
    })
  })

  describe('isFuture', () => {
    it('should detect future dates', () => {
      const futureDate = new Date('2030-01-01')
      expect(isFuture(futureDate)).toBe(true)
    })

    it('should detect past dates as not future', () => {
      const pastDate = new Date('2020-01-01')
      expect(isFuture(pastDate)).toBe(false)
    })
  })

  describe('addBusinessDays', () => {
    it('should add business days excluding weekends', () => {
      // Friday 2026-02-06
      const friday = new Date('2026-02-06')
      // Adding 1 business day from Friday -> Monday
      const result = addBusinessDays(friday, 1)
      expect(result.getDay()).toBe(1) // Monday
    })

    it('should handle multiple business days', () => {
      const date = new Date('2026-02-02') // Monday
      const result = addBusinessDays(date, 5)
      expect(result.getDay()).toBe(1) // Next Monday (skipping weekend)
    })
  })

  describe('calculateDueDate', () => {
    it('should add 30 days to issue date', () => {
      const issueDate = new Date('2026-02-01')
      const dueDate = calculateDueDate(issueDate)
      expect(dueDate.getDate()).toBe(3) // March 3rd
      expect(dueDate.getMonth()).toBe(2) // March (0-indexed)
    })
  })

  describe('daysUntil', () => {
    it('should calculate days until a date', () => {
      const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      const days = daysUntil(futureDate)
      expect(days).toBeGreaterThanOrEqual(6)
      expect(days).toBeLessThanOrEqual(7)
    })

    it('should return negative for past dates', () => {
      const pastDate = new Date('2020-01-01')
      const days = daysUntil(pastDate)
      expect(days).toBeLessThan(0)
    })
  })

  describe('isOverdue', () => {
    it('should detect overdue invoices', () => {
      const pastDate = new Date('2020-01-01')
      expect(isOverdue(pastDate, 'PENDING')).toBe(true)
      expect(isOverdue(pastDate, 'DRAFT')).toBe(true)
    })

    it('should not mark paid invoices as overdue', () => {
      const pastDate = new Date('2020-01-01')
      expect(isOverdue(pastDate, 'PAID')).toBe(false)
      expect(isOverdue(pastDate, 'CANCELLED')).toBe(false)
    })

    it('should not mark future dates as overdue', () => {
      const futureDate = new Date('2030-01-01')
      expect(isOverdue(futureDate, 'PENDING')).toBe(false)
    })
  })
})
