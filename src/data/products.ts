export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "books" | "combos" | "cards";
  bgColor: string;
}

export const products: Product[] = [
  {
    id: "book-1",
    name: "Vùng Đất Cảm Xúc I",
    description: "Vui vẻ - Buồn bã - Ngạc nhiên",
    price: 175000,
    category: "books",
    bgColor: "bg-blue-100",
  },
  {
    id: "book-2",
    name: "Vùng Đất Cảm Xúc II",
    description: "Tức giận - Sợ hãi - Yêu thương",
    price: 175000,
    category: "books",
    bgColor: "bg-pink-100",
  },
  {
    id: "combo-1",
    name: "ĐÀO TẠO",
    description: "Trọn bộ 2 MOODOOBOOKs (1 & 2)",
    price: 315000,
    category: "combos",
    bgColor: "bg-yellow-100",
  },
  {
    id: "combo-2",
    name: "HIỂU BIẾT CƠ BẢN",
    description: "1 MOODOOBOOK (Tặng kèm 1 Pack Cards + 1 Sổ tay)",
    price: 240000,
    category: "combos",
    bgColor: "bg-yellow-100",
  },
  {
    id: "card-1",
    name: "TỰ TIN",
    description: "Bộ thẻ giúp bé tự tin hơn",
    price: 12000,
    category: "cards",
    bgColor: "bg-cyan-100",
  },
  {
    id: "card-2",
    name: "TÔN TRỌNG SỰ KHÁC BIỆT",
    description: "Bộ thẻ giáo dục sự thấu hiểu",
    price: 12000,
    category: "cards",
    bgColor: "bg-purple-100",
  },
];
