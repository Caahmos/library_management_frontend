export interface RegisterStaffRequest{
    first_name: string
    last_name: string
    username: string
    password: string
    last_change_userid?: number
    confirmPassword?: string
    admin_flg?: boolean
    circ_flg?: boolean
    circ_mbr_flg?: boolean
    catalog_flg?: boolean
    reports_flg?: boolean
}

export interface SeeStaffs{
    userid: number
    first_name: string
    last_name: string
    username: string
    admin_flg: string
    circ_flg: string
    circ_mbr_flg: string
    catalog_flg: string
    suspended_flg: string
}