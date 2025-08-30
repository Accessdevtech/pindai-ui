import { z } from "zod"
import {
  createRequiredString,
  createOptionalString,
  emailValidation,
  optionalEmailValidation,
  phoneValidation,
  optionalPhoneValidation,
  nidnValidation,
  optionalNidnValidation,
  urlValidation,
} from "./validation-utils"

/**
 * Comprehensive anggota (research member) validation schemas
 * Supports both draft and final submission scenarios with proper validation
 */

// Base anggota field definitions for final submissions
export const anggotaBaseFields = {
  nidn: nidnValidation,
  name: createRequiredString("Nama"),
  name_with_title: createRequiredString("Nama dengan gelar"),
  fakultas: createRequiredString("Fakultas"),
  prodi: createRequiredString("Program studi"),
  phone_number: phoneValidation,
  email: emailValidation,
  scholar_id: urlValidation,
  scopus_id: urlValidation,
  job_functional: createRequiredString("Jabatan fungsional"),
  affiliate_campus: createRequiredString("Afiliasi kampus"),
} as const

// Optional anggota field definitions for draft submissions
export const anggotaOptionalFields = {
  nidn: optionalNidnValidation,
  name: createOptionalString("Nama"),
  name_with_title: createOptionalString("Nama dengan gelar"),
  fakultas: createOptionalString("Fakultas"),
  prodi: createOptionalString("Program studi"),
  phone_number: optionalPhoneValidation,
  email: optionalEmailValidation,
  scholar_id: urlValidation,
  scopus_id: urlValidation,
  job_functional: createOptionalString("Jabatan fungsional"),
  affiliate_campus: createOptionalString("Afiliasi kampus"),
} as const

/**
 * Final submission anggota schema - all required fields must be filled
 */
export const anggotaFinalSchema = z.object(anggotaBaseFields)

/**
 * Draft submission anggota schema - most fields are optional
 */
export const anggotaDraftSchema = z.object(anggotaOptionalFields)

/**
 * Array schemas for multiple anggota
 */
export const anggotaArrayFinalSchema = z.array(anggotaFinalSchema).min(1, "Minimal harus ada satu anggota penelitian")
export const anggotaArrayDraftSchema = z.array(anggotaDraftSchema)

/**
 * Discriminated union schema for anggota based on draft status
 */
export const anggotaDiscriminatedSchema = z.discriminatedUnion("is_draft", [
  z.object({
    is_draft: z.literal(false),
    anggota: anggotaArrayFinalSchema
  }),
  z.object({
    is_draft: z.literal(true),
    anggota: anggotaArrayDraftSchema
  })
])

/**
 * Enhanced anggota schema with leadership information
 */
export const anggotaWithLeadershipSchema = anggotaFinalSchema.extend({
  is_leader: z.number().int().min(0).max(1),
})

export const anggotaDraftWithLeadershipSchema = anggotaDraftSchema.extend({
  is_leader: z.number().int().min(0).max(1).optional(),
})

/**
 * Type definitions
 */
export type AnggotaFinalType = z.infer<typeof anggotaFinalSchema>
export type AnggotaDraftType = z.infer<typeof anggotaDraftSchema>
export type AnggotaWithLeadershipType = z.infer<typeof anggotaWithLeadershipSchema>
export type AnggotaDraftWithLeadershipType = z.infer<typeof anggotaDraftWithLeadershipSchema>
export type AnggotaArrayFinalType = z.infer<typeof anggotaArrayFinalSchema>
export type AnggotaArrayDraftType = z.infer<typeof anggotaArrayDraftSchema>

/**
 * Utility function to create anggota schema based on draft status
 * @param isDraft - Boolean indicating if this is a draft submission
 * @param includeLeadership - Whether to include leadership information
 * @returns Appropriate schema for the submission type
 */
export const createAnggotaSchema = (isDraft: boolean, includeLeadership = false) => {
  if (includeLeadership) {
    return isDraft ? anggotaDraftWithLeadershipSchema : anggotaWithLeadershipSchema
  }
  return isDraft ? anggotaDraftSchema : anggotaFinalSchema
}

/**
 * Utility function to create anggota array schema based on draft status
 * @param isDraft - Boolean indicating if this is a draft submission
 * @returns Appropriate array schema for the submission type
 */
export const createAnggotaArraySchema = (isDraft: boolean) => {
  return isDraft ? anggotaArrayDraftSchema : anggotaArrayFinalSchema
}

/**
 * Validation helper to check anggota data completeness
 * @param anggotaList - Array of anggota data to validate
 * @param isDraft - Whether this is a draft validation
 * @returns Validation result with detailed information
 */
export const validateAnggotaCompleteness = (anggotaList: unknown[], isDraft = false) => {
  const schema = createAnggotaArraySchema(isDraft)
  const result = schema.safeParse(anggotaList)
  
  if (!result.success) {
    return {
      isValid: false,
      errors: result.error.issues,
      incompleteMembers: []
    }
  }
  
  // For draft validation, check completion percentage for each member
  if (isDraft) {
    const totalRequiredFields = Object.keys(anggotaBaseFields).length
    const incompleteMembers = result.data.map((member, index) => {
      const filledFields = Object.entries(member)
        .filter(([_, value]) => value && value.toString().trim() !== '')
        .length
      
      const completionPercentage = Math.round((filledFields / totalRequiredFields) * 100)
      
      return {
        index,
        name: member.name || `Anggota ${index + 1}`,
        completionPercentage,
        isComplete: completionPercentage === 100
      }
    })
    
    return {
      isValid: true,
      data: result.data,
      incompleteMembers,
      overallCompletion: Math.round(
        incompleteMembers.reduce((sum, member) => sum + member.completionPercentage, 0) / 
        incompleteMembers.length
      )
    }
  }
  
  return {
    isValid: true,
    data: result.data,
    incompleteMembers: []
  }
}

/**
 * Validation helper to ensure at least one leader exists
 * @param anggotaList - Array of anggota with leadership information
 * @returns Validation result
 */
export const validateLeadershipRequirement = (anggotaList: AnggotaWithLeadershipType[]) => {
  const leaders = anggotaList.filter(member => member.is_leader === 1)
  
  if (leaders.length === 0) {
    return {
      isValid: false,
      error: "Minimal harus ada satu ketua penelitian"
    }
  }
  
  if (leaders.length > 1) {
    return {
      isValid: false,
      error: "Hanya boleh ada satu ketua penelitian"
    }
  }
  
  return {
    isValid: true,
    leader: leaders[0]
  }
}

/**
 * Helper to transform existing anggota data to match new schema
 * @param existingData - Existing anggota data from API
 * @returns Transformed data compatible with new schema
 */
export const transformExistingAnggotaData = (existingData: any[]): AnggotaWithLeadershipType[] => {
  return existingData.map(member => ({
    nidn: member.nidn || "",
    name: member.name || "",
    name_with_title: member.name_with_title || "",
    fakultas: member.fakultas || "",
    prodi: member.prodi || "",
    phone_number: member.phone_number || "",
    email: member.email || "",
    scholar_id: member.scholar_id || "",
    scopus_id: member.scopus_id || "",
    job_functional: member.job_functional || "",
    affiliate_campus: member.affiliate_campus || "",
    is_leader: member.is_leader || 0
  }))
}