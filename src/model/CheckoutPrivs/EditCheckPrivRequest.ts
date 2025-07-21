export interface EditCheckPrivRequest {
    checkout_limit?: number
    renewal_limit?: number
    grace_period_day?: number;
}

export interface ViewCheckPrivRequest {
    id: number;
    material_cd: number | string;
    classification: number | string;
    checkout_limit: number
    renewal_limit: number
    grace_period_day: number;
    material_type_dm: {
        description: string
      },
      mbr_classify_dm: {
        description: string
      }
}