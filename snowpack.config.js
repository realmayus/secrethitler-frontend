/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: { url: "/" },
        src: { url: "/dist" },
    },
    plugins: ["@snowpack/plugin-react-refresh", "@snowpack/plugin-dotenv", "@snowpack/plugin-sass"],
    routes: [
        {
            match: "routes",
            src: ".*",
            dest: "/index.html",
        },
    ],
};
