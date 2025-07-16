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
