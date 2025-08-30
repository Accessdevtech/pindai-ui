import { z } from "zod"
import {
  anggotaArrayDraftSchema,
  anggotaArrayFinalSchema
} from "./anggota-validation"
import { penelitianDraftSchema, penelitianFinalSchema } from "./penelitian-base"

/**
 * Comprehensive penelitian schemas that include both penelitian data and anggota data
 * These schemas represent the complete data structure for penelitian submissions
 */

/**
 * Complete penelitian schema for final submissions
 * Includes all required penelitian fields plus required anggota data
 */
export const penelitianCompleteFinalSchema = z.object({
  // Penelitian base fields (all required)
  ...penelitianFinalSchema.shape,
  // Anggota array (required with at least one member)
  anggota: anggotaArrayFinalSchema
})

/**
 * Complete penelitian schema for draft submissions
 * Includes optional penelitian fields plus optional anggota data
 */
export const penelitianCompleteDraftSchema = z.object({
  // Penelitian base fields (mostly optional)
  ...penelitianDraftSchema.shape,
  // Anggota array (optional, can be empty)
  anggota: anggotaArrayDraftSchema
})

/**
 * Union schema for handling both complete draft and final submissions
 */
export const penelitianCompleteUnionSchema = z.union([
  penelitianCompleteFinalSchema.extend({ is_draft: z.literal(false) }),
  penelitianCompleteDraftSchema.extend({ is_draft: z.literal(true) })
])

/**
 * Discriminated union schema for complete penelitian based on draft status
 */
export const penelitianCompleteDiscriminatedSchema = z.discriminatedUnion(
  "is_draft",
  [
    z.object({
      is_draft: z.literal(false),
      ...penelitianCompleteFinalSchema.shape
    }),
    z.object({
      is_draft: z.literal(true),
      ...penelitianCompleteDraftSchema.shape
    })
  ]
)

/**
 * Type definitions for complete penelitian data
 */
export type PenelitianCompleteFinalType = z.infer<
  typeof penelitianCompleteFinalSchema
>
export type PenelitianCompleteDraftType = z.infer<
  typeof penelitianCompleteDraftSchema
>
export type PenelitianCompleteUnionType = z.infer<
  typeof penelitianCompleteUnionSchema
>
export type PenelitianCompleteDiscriminatedType = z.infer<
  typeof penelitianCompleteDiscriminatedSchema
>

/**
 * Utility function to create complete penelitian schema based on draft status
 * @param isDraft - Boolean indicating if this is a draft submission
 * @returns Appropriate complete schema for the submission type
 */
export const createCompletePenelitianSchema = (isDraft: boolean) => {
  return isDraft ? penelitianCompleteDraftSchema : penelitianCompleteFinalSchema
}

/**
 * Validation helper to check if complete penelitian data is ready for final submission
 * @param data - Complete penelitian data to validate
 * @returns Validation result with detailed information
 */
export const validateCompletePenelitianForFinalSubmission = (data: unknown) => {
  const result = penelitianCompleteFinalSchema.safeParse(data)

  if (!result.success) {
    const penelitianErrors = result.error.issues.filter(
      issue => !issue.path.includes("anggota")
    )
    const anggotaErrors = result.error.issues.filter(issue =>
      issue.path.includes("anggota")
    )

    return {
      isValid: false,
      penelitianErrors,
      anggotaErrors,
      allErrors: result.error.issues
    }
  }

  return {
    isValid: true,
    data: result.data,
    penelitianErrors: [],
    anggotaErrors: []
  }
}

/**
 * Validation helper for complete draft submissions with completion analysis
 * @param data - Complete draft penelitian data to validate
 * @returns Validation result with completion information
 */
export const validateCompletePenelitianDraft = (data: unknown) => {
  const draftResult = penelitianCompleteDraftSchema.safeParse(data)

  if (!draftResult.success) {
    return {
      isValid: false,
      errors: draftResult.error.issues,
      completionPercentage: 0
    }
  }

  // Calculate overall completion percentage
  const penelitianFields = Object.keys(penelitianFinalSchema.shape).length
  const filledPenelitianFields = Object.entries(draftResult.data).filter(
    ([key, value]) =>
      key !== "anggota" && value && value.toString().trim() !== ""
  ).length

  const penelitianCompletion = (filledPenelitianFields / penelitianFields) * 100

  // Calculate anggota completion
  const anggotaCount = draftResult.data.anggota?.length || 0
  const anggotaCompletion = anggotaCount > 0 ? 50 : 0 // Basic completion if any anggota exists

  const overallCompletion = Math.round(
    penelitianCompletion * 0.7 + anggotaCompletion * 0.3
  )

  // Check if ready for final submission
  const finalValidation = validateCompletePenelitianForFinalSubmission(data)

  return {
    isValid: true,
    data: draftResult.data,
    completionPercentage: overallCompletion,
    penelitianCompletion: Math.round(penelitianCompletion),
    anggotaCompletion,
    readyForFinalSubmission: finalValidation.isValid,
    errors: []
  }
}
