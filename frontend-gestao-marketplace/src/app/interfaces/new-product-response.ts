export interface INewProductResponse {
  message: string;
  data: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    status: string;
    imageBase64: string;
  }[];
}
//as interfaces tem que ter o mesmo nome dos atributos que vem no body da resposta
