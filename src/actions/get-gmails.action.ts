import { gmailApi } from '@/api'
import type { GmailsReponse } from '@/types'

export const getGmailsAction = async (
  email: string
): Promise<GmailsReponse[]> => {
  const { data } = await gmailApi.fetchEmails({ email })

  return data
}

// code: "5934"
//
// date: "Wed, 26 Nov 2025 13:15:17 +0000"
//
// from: "info@account.netflix.com"
//
// id: "19ac04ddcba6668f"
//
// service: "Netflix"
//
// snippet: "Ingresa este código para iniciar sesión ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏"
//
// subject: "Netflix: Tu código de inicio de sesión"
//
// threadId: "19ac04ddcba6668f"
