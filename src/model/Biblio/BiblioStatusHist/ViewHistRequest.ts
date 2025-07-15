export interface ViewHistRequest {
  bibid?: string;
  mbrid?: string;
}

export interface ViewHistSearch {
  bibid?: number;
  mbrid?: number;
}

export interface ViewHistsRequest {
  id?: string;
  bibid?: string;
  biblio_copy: {
    barcode_nmbr?: string;
  };
  member: {
    first_name: string;
    last_name: string;
  };
  biblio: {
    title?: string;
    title_remainder?: string;
  };
  copyid?: string;
  mbrid?: string;
  status_cd?: string;
  due?: string;
  limit?: number;
  status_begin_dt?: string;
  due_back_dt?: string;
  returned_at?: string;
}

export interface ViewHistsSearch {
  bibid?: number;
  copyid?: number;
  mbrid?: number;
  status_cd?: string;
  due?: string;
  limit?: number;
}
