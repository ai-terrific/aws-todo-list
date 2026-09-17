module.exports = {
  apps: [
    {
      name: "frontend",
      script: "node_modules/vite/bin/vite.js",
      interpreter: "node",
      args: "--port=3000 --host=0.0.0.0",
    },
  ],
};
