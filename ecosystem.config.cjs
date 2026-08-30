module.exports = {
  apps: [
    {
      name: "ems",
      cwd: "/var/www/ems",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3080",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3080",
      },
    },
  ],
};
