import { z } from "zod"
import {
  academicYearValidation,
  createRequiredString,
  createTextAreaValidation,
  semesterValidation
} from "./validation-utils"

/**
 * Base penelitian schema containing common validation logic
 * This schema serves as the foundation for both draft and final submission validations
 */

// Common field definitions that are shared between draft and final schemas
export const penelitianBaseFields = {
  // Required fields that are always needed
  tahun_akademik: academicYearValidation,
  semester: semesterValidation,

  // Core penelitian fields with proper validation
  judul: createRequiredString("Judul penelitian", 10),
  bidang: createRequiredString("Bidang penelitian"),
  jenis_penelitian: createRequiredString("Jenis penelitian"),
  deskripsi: createTextAreaValidation("Deskripsi penelitian", 2000),
  luaran_kriteria: createRequiredString("Luaran kriteria")
} as const

// Optional field definitions for draft scenarios
// Only tahun_akademik and semester are required for drafts
export const penelitianOptionalFields = {
  // Required fields for drafts - only academic year and semester
  tahun_akademik: academicYearValidation,
  semester: semesterValidation,

  // All other fields are completely optional for drafts
  judul: z.string().optional(),
  bidang: z.string().optional(),
  jenis_penelitian: z.string().optional(),
  deskripsi: z.string().optional(),
  luaran_kriteria: z.string().optional()
} as const

/**
 * Final submission schema - all fields are required
 */
export const penelitianFinalSchema = z.object(penelitianBaseFields)

/**
 * Draft submission schema - most fields are optional
 */
export const penelitianDraftSchema = z.object(penelitianOptionalFields)

/**
 * Union type for handling both draft and final submissions
 */
export const penelitianUnionSchema = z.union([
  penelitianFinalSchema.extend({ is_draft: z.literal(false) }),
  penelitianDraftSchema.extend({ is_draft: z.literal(true) })
])

/**
 * Discriminated union schema that automatically validates based on draft status
 */
export const penelitianDiscriminatedSchema = z.discriminatedUnion("is_draft", [
  z.object({
    is_draft: z.literal(false),
    ...penelitianBaseFields
  }),
  z.object({
    is_draft: z.literal(true),
    ...penelitianOptionalFields
  })
])

/**
 * Type definitions
 */
export type PenelitianFinalType = z.infer<typeof penelitianFinalSchema>
export type PenelitianDraftType = z.infer<typeof penelitianDraftSchema>
export type PenelitianUnionType = z.infer<typeof penelitianUnionSchema>
export type PenelitianDiscriminatedType = z.infer<
  typeof penelitianDiscriminatedSchema
>

/**
 * Utility function to create a penelitian schema based on draft status
 * @param isDraft - Boolean indicating if this is a draft submission
 * @returns Appropriate schema for the submission type
 */
export const createPenelitianSchema = (isDraft: boolean) => {
  return isDraft ? penelitianDraftSchema : penelitianFinalSchema
}

/**
 * Validation helper to check if penelitian data is valid for final submission
 * @param data - Penelitian data to validate
 * @returns Validation result with detailed error information
 */
export const validatePenelitianForFinalSubmission = (data: unknown) => {
  const result = penelitianFinalSchema.safeParse(data)

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
 * @param data - Draft penelitian data to validate
 * @returns Validation result with completion information
 */
export const validatePenelitianDraft = (data: unknown) => {
  const draftResult = penelitianDraftSchema.safeParse(data)

  if (!draftResult.success) {
    return {
      isValid: false,
      errors: draftResult.error.issues,
      completionPercentage: 0
    }
  }

  // Calculate completion percentage based on filled fields
  const totalFields = Object.keys(penelitianBaseFields).length
  const filledFields = Object.entries(draftResult.data).filter(
    ([_, value]) => value && value.toString().trim() !== ""
  ).length

  const completionPercentage = Math.round((filledFields / totalFields) * 100)

  // Check if ready for final submission
  const finalValidation = validatePenelitianForFinalSubmission(data)

  return {
    isValid: true,
    data: draftResult.data,
    completionPercentage,
    readyForFinalSubmission: finalValidation.isValid,
    missingForFinal: finalValidation.missingFields,
    errors: []
  }
}
