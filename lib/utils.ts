/**
 * Utility functions for formatting and common operations
 * Now using shared @looper-hq/nexus-utils package
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 * Used by Premier Design System components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Re-export utilities from shared packages
export { formatCurrency, formatDateShort, formatDateHK, formatPhoneHK } from '@looper-hq/nexus-utils';

/**
 * Format a full name in "lastName, firstName" format
 */
export function formatFullName(lastName: string, firstName: string): string {
  return `${lastName}, ${firstName}`;
}

/**
 * Format a date string to en-GB locale (DD/MM/YYYY)
 * Returns 'N/A' if date is null or invalid
 * @deprecated Use formatDateShort from @looper-hq/nexus-utils instead
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-GB');
  } catch {
    return 'N/A';
  }
}

/**
 * Convert ISO date string to YYYY-MM-DD format for date inputs
 * Returns empty string if date is null or invalid
 */
export function toDateInputValue(dateString: string | null | undefined): string {
  if (!dateString) return '';
  try {
    return new Date(dateString).toISOString().split('T')[0];
  } catch {
    return '';
  }
}
