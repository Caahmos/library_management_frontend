export interface RegisterBiblioRequest {
    material_cd: string; 
    collection_cd: string; 
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