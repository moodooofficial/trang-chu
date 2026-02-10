export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tag?: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Tại sao trẻ hay \"ăn vạ\" và ba mẹ nên làm gì?",
    excerpt: "\"Ăn vạ\" không phải là hư, mà là cách trẻ giao tiếp khi chưa biết gọi tên cảm xúc. Cùng Moodoo giải mã cơn giận của bé nhé!",
    date: "15 Tháng 02, 2026",
    tag: "KIẾN THỨC CẢM XÚC",
    featured: true,
  },
  {
    id: "2",
    title: "5 Trò chơi giúp phát triển EQ cho trẻ mầm non",
    excerpt: "Vừa chơi vừa học, giúp bé nhận biết và gọi tên cảm xúc dễ dàng hơn bao giờ hết.",
    date: "12 Tháng 02, 2026",
  },
  {
    id: "3",
    title: "Hướng dẫn sử dụng bộ học liệu MOODOO",
    excerpt: "Phụ huynh nói gì về bộ sách tương tác đầu tay của nhà Moodoo? Cùng xem nhé!",
    date: "10 Tháng 02, 2026",
  },
  {
    id: "4",
    title: "Làm bạn cùng con: Khó hay Dễ?",
    excerpt: "Những chia sẻ tâm huyết từ đội ngũ sáng lập Moodoo về hành trình đồng hành cùng trẻ.",
    date: "08 Tháng 02, 2026",
  },
];
