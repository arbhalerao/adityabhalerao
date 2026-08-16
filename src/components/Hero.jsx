import { motion } from "framer-motion";
import { MapPin, Clock, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
    const { theme } = useTheme();
    const currentTime = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
    });

    const navigateAndScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div id="hero" className="px-16 flex min-h-screen w-full items-center justify-center py-28 md:px-32 relative">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 text-gray-900 dark:text-white bg-[#f3f3f3] border border-black hover:border-brand transition-colors rounded-2xl px-10 py-8 md:px-16 md:py-12 lg:px-28 lg:py-16">
                {/* Profile Image */}
                <div>
                    <img
                        src="/aditya-bhalerao.webp"
                        alt="Aditya Bhalerao, software engineer"
                        width="800"
                        height="800"
                        // lowercase on purpose: React 18 passes it through as-is (camelCase is React 19+)
                        // eslint-disable-next-line react/no-unknown-property
                        fetchpriority="high"
                        decoding="async"
                        className="w-[300px] cursor-pointer rounded-2xl shadow-xl shadow-gray-400/50 dark:shadow-black/50 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/50 dark:hover:shadow-black/70 md:w-[350px]"
                    />
                </div>

                {/* Hero Text */}
                <div
                    className="flex max-w-[600px] flex-col items-center lg:items-start justify-center gap-3 text-center lg:text-left"
                >
                    <h1 className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent text-5xl font-medium md:text-7xl leading-tight py-2">
                        Aditya Bhalerao
                    </h1>
                    <h2 className="text-brand text-2xl md:text-3xl leading-relaxed py-1">
                        Software Engineer
                    </h2>

                    {/* Location & Time */}
                    <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-lg text-gray-700 dark:text-gray-300">
                        <span className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-brand" />
                            Pune, MH, India
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-brand" />
                            {currentTime} IST
                        </span>
                    </div>

                    {/* About Section */}
                    <p className="mt-4 md:text-base text-pretty text-sm text-gray-700 dark:text-gray-300">
                        I'm a Software Engineer with a focus on backend development, passionate about building scalable, efficient, and reliable systems.
                        <br /><br />
                        I specialize in crafting APIs, managing databases, and optimizing server-side performance to deliver seamless user experiences.
                        <br /><br />
                        Currently at{" "}
                        <a href="https://geminus.space/" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                            Geminus Space
                        </a>
                        , building backend services for satellite ground operations.
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 flex-col items-center cursor-pointer hidden sm:flex"
                onClick={() => navigateAndScroll("tech")}
                initial={{ y: 10, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
                <ChevronDown className="h-10 w-10 text-brand animate-bounce stroke-[2.5]" />
            </motion.div>
        </div>
    );
};

export default Hero;
