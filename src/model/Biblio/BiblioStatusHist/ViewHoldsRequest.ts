export interface ViewHoldsRequest {
  id: number
  holdid: number
  copyid: number
  mbrid: number
  bibid: number
  biblio_copy: {
    barcode_nmbr: string
  }
  biblio: {
    title: string
  }
}

export interface ViewAllHoldsRequest {
  id: number
  holdid: number
  copyid: number
  mbrid: number
  bibid: number
  biblio_copy: {
    barcode_nmbr: string
  }
  member: {
    first_name: string
    last_name: string
    barcode_nmbr: string
    mbrid: string
  }
  biblio: {
    title: string
  }
}