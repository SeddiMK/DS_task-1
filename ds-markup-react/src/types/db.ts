export interface RootObject {
  menu: Menu;
  sections: Sections;
  contacts: ContactsType;
  logo: string;
}

export interface ContactsType {
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  links: HeaderType[];
  subscription: Subscription2;
}

export interface Subscription2 {
  "email-placeholder": string;
  "submit-text": string;
}

export interface Sections {
  main: Main;
  content: Content;
  proposals: Proposals;
  subscription: Subscription;
}

export interface Subscription {
  title: string;
  text: string;
  "email-placeholder": string;
  "submit-text": string;
  "agreement-text": string;
  ticker: Ticker;
}

export interface Proposals {
  title: string;
  "browse-all-text": string;
  items: Item4[];
  ticker: Ticker;
}

export interface Item4 {
  background: string;
  author: Author;
  text: string;
  tags: string[];
  date_from: string;
  date_to: string;
  time: string;
}

export interface Author {
  img: string;
  name: string;
  position: string;
}

export interface Content {
  items: Item3[];
  ticker: Ticker;
}

export interface Item3 {
  title: string;
  text: string;
  accent: string;
  date: string;
  duration: number;
  size: string;
  tags: string[];
  img: Img;
  stamp: Stamp;
}

export interface Main {
  items: Item2[];
  ticker: Ticker;
}

export interface Ticker {
  text: string;
  "color:": string;
}

export interface Item2 {
  title: string;
  text: string;
  accent: string;
  date: string;
  duration: number;
  "browse-text": string;
  size: string;
  tags: string[];
  img: Img;
  stamp: Stamp;
}

export interface Stamp {
  word: string;
  type: string;
  position: string;
}

export interface Img {
  url: string;
  shape: string;
}

export interface Menu {
  logo: string;
  header: HeaderType[];
  footer: FooterType[];
}

export interface FooterType {
  label: string;
  items: Item[];
}

export interface Item {
  label: string;
  url?: string;
}

export interface HeaderType {
  label: string;
  url: string;
}
