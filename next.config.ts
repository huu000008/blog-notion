import withMDX from "@next/mdx";

// RemotePattern 타입 직접 정의
// next/image의 공식 타입 구조와 동일하게 맞춤
// https://github.com/vercel/next.js/blob/canary/packages/next/types/index.ts 참고

type RemotePattern = {
  protocol?: "http" | "https";
  hostname: string;
  port?: string;
  pathname?: string;
};

const remotePatterns: RemotePattern[] = [
  { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
  { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
  { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com", pathname: "/**" },
];

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns,
  },
  turbopack: {
    resolveExtensions: [".mdx", ".md", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
};

export default withMDX({
  extension: /\.mdx?$/,
})(nextConfig);
