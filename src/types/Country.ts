interface Flags {
    png: string;
    svg: string;
    alt: string;
  }
  
  export interface Country {
    name: {
      common: string;
      official: string;
    };
    capital: string[];
    flags: Flags;
}
  