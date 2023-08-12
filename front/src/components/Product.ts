const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description: string,
    public stock: number,
    public image: File | null,
    public imageURL: string = ""
  ) {
    this.date = formattedDate;
    this.ogstock = stock;
  }
  ogstock: number;
  date: string;
}
