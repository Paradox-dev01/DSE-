export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900">

            {/* LEFT SIDE */}
            <div className="items-center justify-center hidden w-1/2 text-white bg-gradient-to-br from-blue-600 to-purple-700 lg:flex">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Digital School Ecosystem</h1>
                    <p className="mt-2 text-sm opacity-80">Guardian Portal</p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center w-full p-6 lg:w-1/2">
                {children}
            </div>
        </div>
    );
}