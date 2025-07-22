interface Biblio {
  title: string;
  title_remainder: string;
  collection: {
    description: string;
  };
}

export interface DetailedItem {
  id: number;
  bibid: number;
  copyid: number;
  create_dt: string;
  copy_desc: string;
  barcode_nmbr: string;
  status_cd: string;
  status_begin_dt: string;
  due_back_dt: string | null;
  mbrid: number | null;
  renewal_count: number;
  biblio: Biblio;
}

export interface DetailedBalance {
  type: "success";
  message: string;
  balance: {
    statusCount: number;
    detailed: DetailedItem[];
  };
}
