/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/app',
                destination: '/app/dashboard',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
