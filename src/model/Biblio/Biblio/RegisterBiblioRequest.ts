export interface RegisterBiblioRequest {
  material_cd: string;
  collection_cd: string;
  call_nmbr1: string;
  call_nmbr2: string;
  call_nmbr3: string;
  topic1?: string;
  topic2?: string;
  topic3?: string;
  topic4?: string;
  topic5?: string;
  values: {
    [key: string]: string;
  };
  indexes: string[];
  tags: {
    [key: string]: string;
  };
  subfields: {
    [key: string]: string;
  };
  fieldIds: {
    [key: string]: string;
  };
  requiredFlgs: {
    [key: string]: string;
  };
}
