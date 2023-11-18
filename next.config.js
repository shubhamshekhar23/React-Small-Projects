/** @type {import('next').NextConfig} */
const nextConfig = {
  /* enable custom routes */
  useFileSystemPublicRoutes: false,

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home/home",
      },
      {
        source: "/memory-card-game",
        destination: "/memory-card-game/memory-card-game",
      },
      {
        source: "/tic-tac-toe-game",
        destination: "/tic-tac-toe-game/tic-tac-toe-game",
      },
    ];
  },
};

module.exports = nextConfig;