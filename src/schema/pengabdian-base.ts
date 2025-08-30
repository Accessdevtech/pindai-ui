import { z } from "zod"
import {
  academicYearValidation,
  createRequiredString,
  createTextAreaValidation,
  semesterValidation
} from "./validation-utils"

/**
 * Base pengabdian schema containing common validation logic
 * This schema serves as the foundation for both draft and final submission validations
 */

// Common field definitions that are shared between draft and final schemas
export const pengabdianBaseFields = {
  // Required fields that are always needed
  tahun_akademik: academicYearValidation,
  semester: semesterValidation,

  // Core pengabdian fields with proper validation
  judul: createRequiredString("Judul pengabdian", 10),
  bidang: createRequiredString("Bidang pengabdian"),
  jenis_pengabdian: createRequiredString("Jenis pengabdian"),
  deskripsi: createTextAreaValidation("Deskripsi pengabdian", 2000),
  luaran_kriteria: createRequiredString("Luaran kriteria")
} as const

// Optional field definitions for draft scenarios
// Only tahun_akademik and semester are required for drafts
export const pengabdianOptionalFields = {
  // Required fields for drafts - only academic year and semester
  tahun_akademik: academicYearValidation,
  semester: semesterValidation,

  // All other fields are completely optional for drafts
  judul: z.string().optional(),
  bidang: z.string().optional(),
  jenis_pengabdian: z.string().optional(),
  deskripsi: z.string().optional(),
  luaran_kriteria: z.string().optional()
} as const

/**
 * Final submission schema - all fields are required
 */
export const pengabdianFinalSchema = z.object(pengabdianBaseFields)

/**
 * Draft submission schema - most fields are optional
 */
export const pengabdianDraftSchema = z.object(pengabdianOptionalFields)

/**
 * Union type for handling both draft and final submissions
 */
export const pengabdianUnionSchema = z.union([
  pengabdianFinalSchema.extend({ is_draft: z.literal(false) }),
  pengabdianDraftSchema.extend({ is_draft: z.literal(true) })
])

/**
 * Discriminated union schema that automatically validates based on draft status
 */
export const pengabdianDiscriminatedSchema = z.discriminatedUnion("is_draft", [
  z.object({
    is_draft: z.literal(false),
    ...pengabdianBaseFields
  }),
  z.object({
    is_draft: z.literal(true),
    ...pengabdianOptionalFields
  })
])

/**
 * Type definitions
 */
export type PengabdianFinalType = z.infer<typeof pengabdianFinalSchema>
export type PengabdianDraftType = z.infer<typeof pengabdianDraftSchema>
export type PengabdianUnionType = z.infer<typeof pengabdianUnionSchema>
export type PengabdianDiscriminatedType = z.infer<
  typeof pengabdianDiscriminatedSchema
>

/**
 * Utility function to create a pengabdian schema based on draft status
 * @param isDraft - Boolean indicating if this is a draft submission
 * @returns Appropriate schema for the submission type
 */
export const createPengabdianSchema = (isDraft: boolean) => {
  return isDraft ? pengabdianDraftSchema : pengabdianFinalSchema
}

/**
 * Validation helper to check if pengabdian data is valid for final submission
 * @param data - Pengabdian data to validate
 * @returns Validation result with detailed error information
 */
export const validatePengabdianForFinalSubmission = (data: unknown) => {
  const result = pengabdianFinalSchema.safeParse(data)

  if (!result.success) {
    const missingFields = result.error.issues
      .filter(
        issue => issue.code === "invalid_type" && issue.received === "undefined"
      )
      .map(issue => issue.path.join("."))

    const invalidFields = result.error.issues
      .filter(
        issue => issue.code !== "invalid_type" || issue.received !== "undefined"
      )
      .map(issue => ({
        field: issue.path.join("."),
        message: issue.message
      }))

    return {
      isValid: false,
      missingFields,
      invalidFields,
      errors: result.error.issues
    }
  }

  return {
    isValid: true,
    data: result.data,
    missingFields: [],
    invalidFields: []
  }
}

/**
 * Validation helper for draft submissions with completion percentage
 * @param data - Draft pengabdian data to validate
 * @returns Validation result with completion information
 */
export const validatePengabdianDraft = (data: unknown) => {
  const draftResult = pengabdianDraftSchema.safeParse(data)

  if (!draftResult.success) {
    return {
      isValid: false,
      errors: draftResult.error.issues,
      completionPercentage: 0
    }
  }

  // Calculate completion percentage based on filled fields
  const totalFields = Object.keys(pengabdianBaseFields).length
  const filledFields = Object.entries(draftResult.data).filter(
    ([_, value]) => value && value.toString().trim() !== ""
  ).length

  const completionPercentage = Math.round((filledFields / totalFields) * 100)

  // Check if ready for final submission
  const finalValidation = validatePengabdianForFinalSubmission(data)

  return {
    isValid: true,
    data: draftResult.data,
    completionPercentage,
    readyForFinalSubmission: finalValidation.isValid,
    missingForFinal: finalValidation.missingFields,
    errors: []
  }
}
