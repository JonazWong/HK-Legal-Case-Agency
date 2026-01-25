/**
 * Utility functions for formatting and common operations
 */

/**
 * Format a full name in "lastName, firstName" format
 */
export function formatFullName(lastName: string, firstName: string): string {
  return `${lastName}, ${firstName}`;
}

/**
 * Format a date string to en-GB locale (DD/MM/YYYY)
 * Returns 'N/A' if date is null or invalid
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
 * Format currency amount in HKD
 * Returns 'N/A' if amount is null or undefined
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return 'N/A';
  return `HKD ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
