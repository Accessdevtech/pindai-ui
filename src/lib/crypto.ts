import crypto from "crypto"

interface EncryptionConfig {
  algorithm: string
  keyLength: number
  ivLength: number
  tagLength: number
}

interface CryptoResult {
  success: boolean
  data?: string
  error?: string
}

class CryptoService {
  private static config: EncryptionConfig = {
    algorithm: "aes-256-gcm",
    keyLength: 32,
    ivLength: 12,
    tagLength: 16,
  }

  private static encryptionKey: string =
    process.env.NEXT_PUBLIC_SECURE_DATA_KEY || ""

  private static secretKey: string =
    process.env.NEXT_PUBLIC_SECURE_API_KEY || ""

  constructor() {
    this.validateEncryptionKey()
  }

  private validateEncryptionKey(): void {
    if (
      !CryptoService.encryptionKey ||
      CryptoService.encryptionKey.length !== CryptoService.config.keyLength
    ) {
      throw new Error(
        `Encryption key must be ${CryptoService.config.keyLength} characters long.`,
      )
    }
  }

  public encrypt(data: any): CryptoResult {
    try {
      const iv = crypto.randomBytes(CryptoService.config.ivLength)

      const cipher = crypto.createCipheriv(
        CryptoService.config.algorithm,
        CryptoService.encryptionKey,
        iv,
      ) as crypto.CipherGCM

      const encryptedData = Buffer.concat([
        cipher.update(data, "utf8"),
        cipher.final(),
      ])

      const authTag = cipher.getAuthTag()

      const result = Buffer.concat([iv, authTag, encryptedData]).toString(
        "base64",
      )
      return { success: true, data: result }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Encryption failed",
      }
    }
  }

  public decrypt(encryptedData: string): CryptoResult {
    try {
      const bufferData = Buffer.from(encryptedData, "base64")
      const iv = bufferData.slice(0, CryptoService.config.ivLength)
      const tag = bufferData.slice(
        CryptoService.config.ivLength,
        CryptoService.config.ivLength + CryptoService.config.tagLength,
      )
      const encrypted = bufferData.slice(
        CryptoService.config.ivLength + CryptoService.config.tagLength,
      )

      const decipher = crypto.createDecipheriv(
        CryptoService.config.algorithm,
        CryptoService.encryptionKey,
        iv,
      ) as crypto.DecipherGCM

      decipher.setAuthTag(tag)

      const decryptedData = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ])

      return { success: true, data: decryptedData.toString("utf8") }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Decryption failed",
      }
    }
  }

  public createTimestamp(): number {
    return Math.floor(Date.now() / 1000)
  }

  public createSignature(payload: string): string {
    return crypto
      .createHmac("sha256", CryptoService.secretKey)
      .update(payload)
      .digest("hex")
  }

  public createPayload(
    timestamp: number,
    salt: string,
    payload: string,
  ): string {
    return `${timestamp}${salt}${payload}`
  }

  public createSalt(): string {
    return crypto.randomBytes(16).toString("hex")
  }
}

export const cryptoService = new CryptoService()
export const {
  encrypt,
  decrypt,
  createTimestamp,
  createSignature,
  createPayload,
  createSalt,
} = cryptoService
