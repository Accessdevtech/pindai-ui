import { z } from "zod"

/**
 * Common validation utilities for reusable field validations
 * These utilities provide consistent validation logic across the application
 */

// Base string validation with custom error messages
export const createRequiredString = (fieldName: string, minLength = 1) => {
  return z.string().min(minLength, `${fieldName} harus diisi`).trim()
}

// Optional string validation for draft scenarios
export const createOptionalString = (fieldName: string, minLength = 1) => {
  return z
    .string()
    .min(minLength, `${fieldName} harus diisi`)
    .trim()
    .optional()
    .or(z.literal(""))
}

// Email validation with proper format checking
export const emailValidation = z
  .string()
  .email("Format email tidak valid")
  .min(1, "Email harus diisi")

// Optional email validation for draft scenarios
export const optionalEmailValidation = z
  .string()
  .email("Format email tidak valid")
  .optional()
  .or(z.literal(""))

// Phone number validation (Indonesian format)
export const phoneValidation = z
  .string()
  .regex(/^(\+62|62|0)[0-9]{9,13}$/, "Format nomor telepon tidak valid")
  .min(1, "Nomor telepon harus diisi")

// Optional phone validation for draft scenarios
export const optionalPhoneValidation = z
  .string()
  .regex(/^(\+62|62|0)[0-9]{9,13}$/, "Format nomor telepon tidak valid")
  .optional()
  .or(z.literal(""))

// NIDN validation (specific Indonesian academic identifier)
export const nidnValidation = z
  .string()
  .regex(/^[0-9]{10}$/, "NIDN harus terdiri dari 10 digit angka")
  .min(1, "NIDN harus diisi")

// Optional NIDN validation for draft scenarios
export const optionalNidnValidation = z
  .string()
  .regex(/^[0-9]{10}$/, "NIDN harus terdiri dari 10 digit angka")
  .optional()
  .or(z.literal(""))

// Academic year conversion utilities
export const formatAcademicYearForDisplay = (backendFormat: string): string => {
  // Convert "20242025" to "2024/2025"
  if (backendFormat.length === 8 && /^[0-9]{8}$/.test(backendFormat)) {
    const startYear = backendFormat.substring(0, 4)
    const endYear = backendFormat.substring(4, 8)
    return `${startYear}/${endYear}`
  }
  return backendFormat
}

export const formatAcademicYearForBackend = (displayFormat: string): string => {
  // Convert "2024/2025" to "20242025"
  if (displayFormat.includes('/')) {
    return displayFormat.replace('/', '')
  }
  return displayFormat
}

// Academic year validation - accepts both display (2024/2025) and backend (20242025) formats
export const academicYearValidation = z
  .string()
  .refine(
    (value) => {
      // Accept display format: 2024/2025
      const displayFormatRegex = /^[0-9]{4}\/[0-9]{4}$/
      // Accept backend format: 20242025
      const backendFormatRegex = /^[0-9]{8}$/
      
      return displayFormatRegex.test(value) || backendFormatRegex.test(value)
    },
    {
      message: "Format tahun akademik tidak valid (contoh: 2024/2025 atau 20242025)"
    }
  )
  .transform((value) => {
    // Always transform to backend format for consistent storage
    return formatAcademicYearForBackend(value)
  })
  .refine(
    (value) => {
      // Validate that the years are consecutive
      if (value.length === 8) {
        const startYear = parseInt(value.substring(0, 4))
        const endYear = parseInt(value.substring(4, 8))
        return endYear === startYear + 1
      }
      return false
    },
    {
      message: "Tahun akademik harus berurutan (contoh: 2024/2025)"
    }
  )
  .refine(
    (value) => value.length > 0,
    {
      message: "Tahun akademik harus diisi"
    }
  )

// Semester validation
export const semesterValidation = z
  .string()
  .refine(
    value => ["1", "2", "ganjil", "genap"].includes(value.toLowerCase()),
    "Semester harus berupa 1, 2, ganjil, atau genap"
  )

// URL validation for optional fields like Scholar ID, Scopus ID
export const urlValidation = z
  .string()
  .url("Format URL tidak valid")
  .optional()
  .or(z.literal(""))

// Text area validation with length limits
export const createTextAreaValidation = (
  fieldName: string,
  maxLength = 1000
) => {
  return z
    .string()
    .max(maxLength, `${fieldName} maksimal ${maxLength} karakter`)
    .min(1, `${fieldName} harus diisi`)
}

// Optional text area validation for draft scenarios
export const createOptionalTextAreaValidation = (
  fieldName: string,
  maxLength = 1000
) => {
  return z
    .string()
    .max(maxLength, `${fieldName} maksimal ${maxLength} karakter`)
    .optional()
    .or(z.literal(""))
}

/**
 * Utility function to create conditional validation based on draft status
 * @param isDraft - Boolean indicating if this is a draft submission
 * @param requiredSchema - Schema to use for final submissions
 * @param optionalSchema - Schema to use for draft submissions
 */
export const createConditionalValidation = <T>(
  isDraft: boolean,
  requiredSchema: z.ZodType<T>,
  optionalSchema: z.ZodType<T | undefined>
) => {
  return isDraft ? optionalSchema : requiredSchema
}

/**
 * Draft validation utilities for pre-save validation
 */
export interface DraftValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  completionPercentage: number
  missingCriticalFields: string[]
}

/**
 * Validates draft fields before saving to ensure minimum requirements are met
 * @param data - Draft data to validate
 * @returns Validation result with detailed feedback
 */
export const validateDraftBeforeSave = (data: {
  judul?: string
  deskripsi?: string
  tahun_akademik?: string
  semester?: string
  bidang?: string
  jenis_penelitian?: string
}): DraftValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []
  const missingCriticalFields: string[] = []
  
  // Critical field validation - these should be filled even for drafts
  if (!data.judul || data.judul.trim().length === 0) {
    errors.push("Judul penelitian harus diisi")
    missingCriticalFields.push("judul")
  } else if (data.judul.trim().length < 10) {
    errors.push("Judul penelitian minimal 10 karakter")
  }
  
  if (!data.deskripsi || data.deskripsi.trim().length === 0) {
    errors.push("Abstrak penelitian harus diisi")
    missingCriticalFields.push("deskripsi")
  } else if (data.deskripsi.trim().length < 50) {
    warnings.push("Abstrak penelitian sebaiknya lebih dari 50 karakter untuk memberikan deskripsi yang memadai")
  }
  
  // Important field warnings
  if (!data.tahun_akademik || data.tahun_akademik.trim().length === 0) {
    warnings.push("Tahun akademik belum dipilih")
  }
  
  if (!data.semester || data.semester.trim().length === 0) {
    warnings.push("Semester belum dipilih")
  }
  
  if (!data.bidang || data.bidang.trim().length === 0) {
    warnings.push("Bidang penelitian belum diisi")
  }
  
  if (!data.jenis_penelitian || data.jenis_penelitian.trim().length === 0) {
    warnings.push("Jenis penelitian belum dipilih")
  }
  
  // Calculate completion percentage
  const totalFields = 6 // judul, deskripsi, tahun_akademik, semester, bidang, jenis_penelitian
  const filledFields = Object.values(data).filter(value => 
    value && value.toString().trim().length > 0
  ).length
  const completionPercentage = Math.round((filledFields / totalFields) * 100)
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completionPercentage,
    missingCriticalFields
  }
}

/**
 * Validates title field specifically with detailed feedback
 * @param title - Title to validate
 * @returns Validation result for title
 */
export const validateTitle = (title: string): { isValid: boolean; message?: string } => {
  if (!title || title.trim().length === 0) {
    return { isValid: false, message: "Judul penelitian harus diisi" }
  }
  
  if (title.trim().length < 10) {
    return { isValid: false, message: "Judul penelitian minimal 10 karakter" }
  }
  
  if (title.trim().length > 200) {
    return { isValid: false, message: "Judul penelitian maksimal 200 karakter" }
  }
  
  return { isValid: true }
}

/**
 * Validates abstract field specifically with detailed feedback
 * @param abstract - Abstract to validate
 * @returns Validation result for abstract
 */
export const validateAbstract = (abstract: string): { isValid: boolean; message?: string; warning?: string } => {
  if (!abstract || abstract.trim().length === 0) {
    return { isValid: false, message: "Abstrak penelitian harus diisi" }
  }
  
  if (abstract.trim().length < 50) {
    return { 
      isValid: true, 
      warning: "Abstrak sebaiknya lebih dari 50 karakter untuk memberikan deskripsi yang memadai" 
    }
  }
  
  if (abstract.trim().length > 2000) {
    return { isValid: false, message: "Abstrak penelitian maksimal 2000 karakter" }
  }
  
  return { isValid: true }
}

/**
 * Common validation messages in Indonesian
 */
export const ValidationMessages = {
  REQUIRED: "Field ini harus diisi",
  INVALID_EMAIL: "Format email tidak valid",
  INVALID_PHONE: "Format nomor telepon tidak valid",
  INVALID_NIDN: "NIDN harus terdiri dari 10 digit angka",
  INVALID_ACADEMIC_YEAR:
    "Format tahun akademik tidak valid (contoh: 2024/2025 atau 20242025)",
  INVALID_SEMESTER: "Semester harus berupa 1, 2, ganjil, atau genap",
  INVALID_URL: "Format URL tidak valid",
  MAX_LENGTH: (field: string, length: number) =>
    `${field} maksimal ${length} karakter`,
  MIN_LENGTH: (field: string, length: number) =>
    `${field} minimal ${length} karakter`,
  DRAFT_SAVE_SUCCESS: "Draft berhasil disimpan",
  DRAFT_VALIDATION_FAILED: "Validasi draft gagal. Periksa field yang wajib diisi.",
  TITLE_REQUIRED: "Judul penelitian harus diisi sebelum menyimpan draft",
  ABSTRACT_REQUIRED: "Abstrak penelitian harus diisi sebelum menyimpan draft"
} as const
