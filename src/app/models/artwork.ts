export class Artwork{
  private _titolo:string;
  private _anno:string;
  private _descrizione:string;
  private _artista:string;
  private _periodo:string;
  private _scansioni:number;
  private _ubicazione:string;
  private _ubicazione_citta:string;
  private _tipologia:string;
  private _dimensioni:string;
  private _img:string;
  private _img_prev:string;
  private _dataScansione?:Date;
  private _like?:boolean;
  private _id:string;


  constructor(titolo: string, anno: string, descrizione: string, artista: string, periodo: string, scansioni: number, ubicazione: string, ubicazione_citta:string, tipologia: string, dimensioni: string, img: string, img_prev: string,id:string) {
    this._titolo = titolo;
    this._anno = anno;
    this._descrizione = descrizione;
    this._artista = artista;
    this._periodo = periodo;
    this._scansioni = scansioni;
    this._ubicazione = ubicazione;
    this._ubicazione_citta=ubicazione_citta;
    this._tipologia = tipologia;
    this._dimensioni = dimensioni;
    this._img = img;
    this._img_prev = img_prev;
    this._id=id;
  }

  get titolo(): string {
    return this._titolo;
  }

  set titolo(value: string) {
    this._titolo = value;
  }

  get anno(): string {
    return this._anno;
  }

  set anno(value: string) {
    this._anno = value;
  }

  get descrizione(): string {
    return this._descrizione;
  }

  set descrizione(value: string) {
    this._descrizione = value;
  }

  get artista(): string {
    return this._artista;
  }

  set artista(value: string) {
    this._artista = value;
  }

  get periodo(): string {
    return this._periodo;
  }

  set periodo(value: string) {
    this._periodo = value;
  }

  get scansioni(): number {
    return this._scansioni;
  }

  set scansioni(value: number) {
    this._scansioni = value;
  }

  get ubicazione(): string {
    return this._ubicazione;
  }

  set ubicazione(value: string) {
    this._ubicazione = value;
  }

  get tipologia(): string {
    return this._tipologia;
  }

  set tipologia(value: string) {
    this._tipologia = value;
  }

  get dimensioni(): string {
    return this._dimensioni;
  }

  set dimensioni(value: string) {
    this._dimensioni = value;
  }

  get img(): string {
    return this._img;
  }

  set img(value: string) {
    this._img = value;
  }

  get img_prev(): string {
    return this._img_prev;
  }

  set img_prev(value: string) {
    this._img_prev = value;
  }

  get dataScansione(): Date {
    return this._dataScansione;
  }

  set dataScansione(value: Date) {
    this._dataScansione = value;
  }

  get like(): boolean {
    return this._like;
  }

  set like(value: boolean) {
    this._like = value;
  }

  get ubicazione_citta(): string {
    return this._ubicazione_citta;
  }

  set ubicazione_citta(value: string) {
    this._ubicazione_citta = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
