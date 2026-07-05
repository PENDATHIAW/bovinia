import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B4332",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            color: "#C9A962",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "Georgia, serif",
          }}
        >
          B
        </div>
      </div>
    ),
    { ...size }
  );
}
