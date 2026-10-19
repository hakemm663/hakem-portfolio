import { ImageResponse } from "next/og";
export const alt = "Mohamed Hakem — Full-Stack Engineer & Flutter Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (<div style={{ width: "100%", height: "100%", background: "#08090B", color: "#F4F1EA", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80 }}>
      <div style={{ fontSize: 96, fontWeight: 700 }}>Mohamed Hakem</div>
      <div style={{ fontSize: 40, color: "#7DE3D0", marginTop: 12 }}>Full-Stack Engineer & Flutter Developer</div>
      <div style={{ fontSize: 28, color: "#9AA0A6", marginTop: 24 }}>Flutter · React · NestJS · PostgreSQL — creator of Raqimo</div>
    </div>), size);
}
