export interface LoginStaffResponse {
  id: number;
  first_name: string;
  last_name: string;
  token: string;
  admin_flg: boolean; 
  catalog_flg: boolean;
  circ_flg: boolean;
  circ_mbr_flg: boolean;
  reports_flg: boolean;
}