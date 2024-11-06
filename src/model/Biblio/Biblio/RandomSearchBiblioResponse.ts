export interface ApiResponse {
  type: string;
  message: string;
  biblios: Biblio[];
}

export interface Biblio {
    bibid: number;
    title: string;
    title_remainder: string;
    author: string;
    responsibility_stmt: string;
    material_cd: number;
    collection_cd: number;
    call_nmbr1: string;
    call_nmbr2: string;
    call_nmbr3: string;
    topic1: string;
    topic2: string;
    topic3: string;
    topic4: string;
    topic5: string;
    last_change_userid: number;
    opac_flg: boolean;
    createdAt: string;
    updatedAt: string;
    biblio_copy: BiblioCopy[];
    BiblioMedia?: BiblioMedia[];
};

export interface RandomBiblio{
    collection: Collection
    biblios: Biblio[]
}

export interface BiblioCopy {
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
}

export interface BiblioMedia {
  id: number;
  bibid: number;
  imageUrl: string;
  rank: number;
  count_ranks: number;
  description: string | null;
}

export interface Collection {
  code: number;
  description: string;
  default_flg: boolean;
  days_due_back: number;
  daily_late_fee: string;
}
