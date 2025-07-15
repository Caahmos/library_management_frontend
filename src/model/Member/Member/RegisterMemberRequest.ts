import type { ViewFieldsRequest } from "../MemberFieldsDM/ViewFieldsRequest"

export interface RegisterMemberRequest {
    first_name?: string
    last_name?: string
    barcode_nmbr?: string
    address?: string
    home_phone?: string
    work_phone?: string
    email?: string
    code?: string[]
    data?: string[]
    classification: number
    member_fields?: ViewFieldsRequest[]
}