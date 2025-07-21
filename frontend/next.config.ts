import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: false,
  },
};

export default withFlowbiteReact(nextConfig);
