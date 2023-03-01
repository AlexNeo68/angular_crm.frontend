export interface ResponseHttp {
  status: boolean;
  errors: Object;
  data: {
    items: any[];
    item?: any;
    number?: number;
    history?: any[];
    exist?: boolean;
  };
}
