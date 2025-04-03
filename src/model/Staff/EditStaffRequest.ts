export interface EditStaffRequest{
    first_name?: string
    last_name?: string
    username?: string
    suspended_flg?: boolean
    admin_flg?: boolean
    circ_flg?: boolean
    circ_mbr_flg?: boolean
    catalog_flg?: boolean
    reports_flg?: boolean
}