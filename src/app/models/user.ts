import {Artwork} from "./artwork";

export class User{

  private _username:string;
  private _password:string;
  private _liked?:Array<Artwork>;
  private _scanned?:Array<Artwork>;
  private _nome?:string;
  private _cognome?:string;
  private _nazionalita?:string;
  private _informazioni?:string;
  private _mail?:string;
  private _sesso?:string;
  private _image?:string;

  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get liked(): Array<Artwork> {
    return this._liked;
  }

  set liked(value: Array<Artwork>) {
    this._liked = value;
  }

  get scanned(): Array<Artwork> {
    return this._scanned;
  }

  set scanned(value: Array<Artwork>) {
    this._scanned = value;
  }
  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get cognome(): string {
    return this._cognome;
  }

  set cognome(value: string) {
    this._cognome = value;
  }

  get nazionalita(): string {
    return this._nazionalita;
  }

  set nazionalita(value: string) {
    this._nazionalita = value;
  }

  get informazioni(): string {
    return this._informazioni;
  }

  set informazioni(value: string) {
    this._informazioni = value;
  }

  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }


  get sesso(): string {
    return this._sesso;
  }

  set sesso(value: string) {
    this._sesso = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }
}
