/**
 * Shared types for HK Legal Case Agency
 */

// Export all type modules
export * from './user';
export * from './case';
export * from './client';
export * from './document';
export * from './api';

// Re-export for convenience
export { UserRole } from './user';
export { CaseStatusEnum, Priority, CaseCategory } from './case';
export { ClientType, MembershipTierEnum } from './client';
export { DocumentCategory } from './document';
