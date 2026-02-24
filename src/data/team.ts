import atImg from "@/assets/at.jpg";
import bkImg from "@/assets/bk.jpg";
import kqImg from "@/assets/kq.jpg";
import taImg from "@/assets/ta.jpg";
import btImg from "@/assets/bt.jpg";

export interface TeamMember {
  name: string;
  role: string;
  emoji: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  { name: "Khánh Quỳnh", role: "Founder", emoji: "👩‍💼", image: kqImg },
  { name: "Bích Trâm", role: "Co-Founder - Head of Content", emoji: "👩‍🎨", image: btImg },
  { name: "Trâm Anh", role: "Head of Design", emoji: "👩‍🔬", image: taImg },
  { name: "Anh Thư", role: "Head of Marketing", emoji: "👩‍💻", image: atImg },
  { name: "Bảo Khánh", role: "Head of Digital", emoji: "👨‍💻", image: bkImg },
];
