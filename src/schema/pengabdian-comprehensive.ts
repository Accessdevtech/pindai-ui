import { z } from "zod"
import {
  anggotaArrayDraftSchema,
  anggotaArrayFinalSchema
} from "./anggota-validation"
import { pengabdianDraftSchema, pengabdianFinalSchema } from "./pengabdian-base"

/**
 * Comprehensive pengabdian schemas that include both pengabdian data and anggota data
 * These schemas represent the complete data structure for pengabdian submissions
 */

/**
 * Complete pengabdian schema for final submissions
 * Includes all required pengabdian fields plus required anggota data
 */
export const pengabdianCompleteFinalSchema = z.object({
  // Pengabdian base fields (all required)
  ...pengabdianFinalSchema.shape,
  // Anggota array (required with at least one member)
  anggota: anggotaArrayFinalSchema
})

/**
 * Complete pengabdian schema for draft submissions
 * Includes optional pengabdian fields plus optional anggota data
 */
export const pengabdianCompleteDraftSchema = z.object({
  // Pengabdian base fields (mostly optional)
  ...pengabdianDraftSchema.shape,
  // Anggota array (optional, can be empty)
  anggota: anggotaArrayDraftSchema
})

/**
 * Union schema for handling both complete draft and final submissions
 */
export const pengabdianCompleteUnionSchema = z.union([
  pengabdianCompleteFinalSchema.extend({ is_draft: z.literal(false) }),
  pengabdianCompleteDraftSchema.extend({ is_draft: z.literal(true) })
])

/**
 * Discriminated union schema for complete pengabdian based on draft status
 */
export const pengabdianCompleteDiscriminatedSchema = z.discriminatedUnion(
  "is_draft",
  [
    z.object({
      is_draft: z.literal(false),
      ...pengabdianCompleteFinalSchema.shape
    }),
    z.object({
      is_draft: z.literal(true),
      ...pengabdianCompleteDraftSchema.shape
    })
  ]
)

/**
 * Type definitions for complete pengabdian data
 */
export type PengabdianCompleteFinalType = z.infer<
  typeof pengabdianCompleteFinalSchema
>
export type PengabdianCompleteDraftType = z.infer<
  typeof pengabdianCompleteDraftSchema
>
export type PengabdianCompleteUnionType = z.infer<
  typeof pengabdianCompleteUnionSchema
>
export type PengabdianCompleteDiscriminatedType = z.infer<
  typeof pengabdianCompleteDiscriminatedSchema
>

/**
 * Utility function to create complete pengabdian schema based on draft status
 * @param isDraft - Boolean indicating if this is a draft submission
 * @returns Appropriate complete schema for the submission type
 */
export const createCompletePengabdianSchema = (isDraft: boolean) => {
  return isDraft ? pengabdianCompleteDraftSchema : pengabdianCompleteFinalSchema
}

/**
 * Validation helper to check if complete pengabdian data is ready for final submission
 * @param data - Complete pengabdian data to validate
 * @returns Validation result with detailed information
 */
export const validateCompletePengabdianForFinalSubmission = (data: unknown) => {
  const result = pengabdianCompleteFinalSchema.safeParse(data)

  if (!result.success) {
    const pengabdianErrors = result.error.issues.filter(
      issue => !issue.path.includes("anggota")
    )
    const anggotaErrors = result.error.issues.filter(issue =>
      issue.path.includes("anggota")
    )

    return {
      isValid: false,
      pengabdianErrors,
      anggotaErrors,
      allErrors: result.error.issues
    }
  }

  return {
    isValid: true,
    data: result.data,
    pengabdianErrors: [],
    anggotaErrors: []
  }
}

/**
 * Validation helper for complete draft submissions with completion analysis
 * @param data - Complete draft pengabdian data to validate
 * @returns Validation result with completion information
 */
export const validateCompletePengabdianDraft = (data: unknown) => {
  const draftResult = pengabdianCompleteDraftSchema.safeParse(data)

  if (!draftResult.success) {
    return {
      isValid: false,
      errors: draftResult.error.issues,
      completionPercentage: 0
    }
  }

  // Calculate overall completion percentage
  const pengabdianFields = Object.keys(pengabdianFinalSchema.shape).length
  const filledPengabdianFields = Object.entries(draftResult.data).filter(
    ([key, value]) =>
      key !== "anggota" && value && value.toString().trim() !== ""
  ).length

  const pengabdianCompletion = (filledPengabdianFields / pengabdianFields) * 100

  // Calculate anggota completion
  const anggotaCount = draftResult.data.anggota?.length || 0
  const anggotaCompletion = anggotaCount > 0 ? 50 : 0 // Basic completion if any anggota exists

  const overallCompletion = Math.round(
    pengabdianCompletion * 0.7 + anggotaCompletion * 0.3
  )

  // Check if ready for final submission
  const finalValidation = validateCompletePengabdianForFinalSubmission(data)

  return {
    isValid: true,
    data: draftResult.data,
    completionPercentage: overallCompletion,
    pengabdianCompletion: Math.round(pengabdianCompletion),
    anggotaCompletion,
    readyForFinalSubmission: finalValidation.isValid,
    errors: []
  }
}
