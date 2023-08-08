import { v4 as uuid } from "uuid";

const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

export class Product {
  constructor(
    public name: string,
    public price: number,
    public description: string,
    public stock: number,
    public image: string
  ) {
    this.id = uuid();
    this.date = formattedDate;
    this.ogstock = stock;
  }
  id: string;
  ogstock: number;
  date: string;
}
