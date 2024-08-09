'use server'

import { VerificationLevel } from '@worldcoin/idkit-core'
import { verifyCloudProof } from '@worldcoin/idkit-core/backend'

export type VerifyReply = {
  success: boolean
  code?: string
  attribute?: string | null
  detail?: string
}

interface IVerifyRequest {
  proof: {
    nullifier_hash: string
    merkle_root: string
    proof: string
    verification_level: VerificationLevel
  }
  signal?: string
}

const app_id = process.env.NEXT_PUBLIC_WORLDID_CLIENT_ID
const action = process.env.NEXT_PUBLIC_WORLDID_ACTION

export async function verify(
  proof: IVerifyRequest['proof'],
  signal?: string,
): Promise<VerifyReply | null> {
  if (!app_id || !action) return null
  const verifyRes = await verifyCloudProof(proof, app_id as `app_${string}`, action, signal)
  if (verifyRes.success) {
    return { success: true }
  } else {
    return {
      success: false,
      code: verifyRes.code,
      attribute: verifyRes.attribute,
      detail: verifyRes.detail,
    }
  }
}
