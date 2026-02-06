import { useState, useEffect } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { BsGithub, BsLinkedin, BsMedium } from "react-icons/bs";
import { useNavigateAndScroll } from "../hooks/useNavigateAndScroll";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const navigateAndScroll = useNavigateAndScroll();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark') ||
                (localStorage.getItem('theme') === 'dark');
            setIsDarkMode(isDark);
        };

        setMounted(true);
        checkDarkMode();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    const menuOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path, section) => {
        navigateAndScroll(path, section);
        setActiveSection(section);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'tech', 'experience', 'projects', 'oss', 'papershelf', 'contact'];
            let largestVisibleSection = null;
            let maxVisibleHeight = 0;

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

                    if (visibleHeight > maxVisibleHeight) {
                        maxVisibleHeight = visibleHeight;
                        largestVisibleSection = section;
                    }
                }
            });

            if (largestVisibleSection && largestVisibleSection !== activeSection) {
                setActiveSection(largestVisibleSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);


    const getNavItemClass = (section) => {
        const baseClasses = "cursor-pointer transition-all duration-300 flex items-center";

        if (section === activeSection) {
            return `${baseClasses} text-gray-900 dark:text-white opacity-100 font-medium transform scale-125`;
        }

        return `${baseClasses} text-gray-700 dark:text-white opacity-70 hover:opacity-100`;
    };

    const logoSrc = isDarkMode ? "/aditya-logo-light.svg" : "/aditya-logo-dark.svg";

    return (
        <div className="fixed top-0 w-full flex justify-center z-10 px-4">
            <div className="w-full max-w-6xl mx-auto rounded-b-xl border-b border-x border-gray-300 dark:border-gray-700 bg-gray-100/80 dark:bg-black/80 px-8 py-4 backdrop-blur-md flex items-center justify-between">
                <div onClick={() => handleNavigation("/", "hero")} className="cursor-pointer">
                    {mounted && (
                        <img src={logoSrc} alt="Aditya Logo" className="h-10 w-10" />
                    )}
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-8 items-center">
                    <li onClick={() => handleNavigation("/", "hero")} className={getNavItemClass("hero")}>Home</li>
                    <li onClick={() => handleNavigation("/", "tech")} className={getNavItemClass("tech")}>Tech</li>
                    <li onClick={() => handleNavigation("/", "experience")} className={getNavItemClass("experience")}>Experience</li>
                    <li onClick={() => handleNavigation("/", "oss")} className={getNavItemClass("oss")}>OSS</li>
                    <li onClick={() => handleNavigation("/", "projects")} className={getNavItemClass("projects")}>Projects</li>
                    <li onClick={() => handleNavigation("/", "papershelf")} className={getNavItemClass("papershelf")}>Papershelf</li>
                    {/* <li onClick={() => handleNavigation("/", "stats")} className={getNavItemClass("stats")}>Stats</li> */}
                    <li onClick={() => handleNavigation("/", "contact")} className={getNavItemClass("contact")}>Contact</li>
                </ul>

                {/* Social Links and Theme Toggle */}
                <ul className="hidden md:flex gap-5 items-center">
                    <li className="cursor-pointer opacity-70 transition-all duration-300 hover:text-orange-500 hover:opacity-100">
                        <a href="https://github.com/arbhalerao" target="_blank" rel="noopener noreferrer">
                            <BsGithub className="text-xl text-gray-800 dark:text-white" />
                        </a>
                    </li>
                    <li className="cursor-pointer opacity-70 transition-all duration-300 hover:text-green-500 hover:opacity-100">
                        <a href="https://arbhalerao.medium.com/" target="_blank" rel="noopener noreferrer">
                            <BsMedium className="text-xl text-gray-800 dark:text-white" />
                        </a>
                    </li>
                    <li className="cursor-pointer opacity-70 transition-all duration-300 hover:text-blue-500 hover:opacity-100">
                        <a href="https://www.linkedin.com/in/arbhalerao/" target="_blank" rel="noopener noreferrer">
                            <BsLinkedin className="text-xl text-gray-800 dark:text-white" />
                        </a>
                    </li>
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>

                {/* Mobile Menu Icon */}
                {isOpen ? (
                    <div className="flex items-center md:hidden">
                        <ThemeToggle />
                        <BiX className="block md:hidden text-4xl text-gray-800 dark:text-white ml-3" onClick={menuOpen} />
                    </div>
                ) : (
                    <div className="flex items-center md:hidden">
                        <ThemeToggle />
                        <BiMenu className="block md:hidden text-4xl text-gray-800 dark:text-white ml-3" onClick={menuOpen} />
                    </div>
                )}

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="fixed top-20 left-0 right-0 mx-4 bg-gray-100 dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 shadow-md z-50">
                        <div className="p-4">
                            <nav className="flex flex-col space-y-3 text-center">
                                <div onClick={() => { menuOpen(); handleNavigation("/", "hero"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "hero" ? "font-bold" : ""}`}>
                                    Home
                                </div>
                                <div onClick={() => { menuOpen(); handleNavigation("/", "tech"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "tech" ? "font-bold" : ""}`}>
                                    Tech
                                </div>
                                <div onClick={() => { menuOpen(); handleNavigation("/", "experience"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "experience" ? "font-bold" : ""}`}>
                                    Experiences
                                </div>
                                <div onClick={() => { menuOpen(); handleNavigation("/", "oss"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "oss" ? "font-bold" : ""}`}>
                                    OSS
                                </div>
                                <div onClick={() => { menuOpen(); handleNavigation("/", "projects"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "projects" ? "font-bold" : ""}`}>
                                    Projects
                                </div>
                                <div onClick={() => { menuOpen(); handleNavigation("/", "papershelf"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "papershelf" ? "font-bold" : ""}`}>
                                    Papershelf
                                </div>
                                {/* <div onClick={() => { menuOpen(); handleNavigation("/", "stats"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "stats" ? "font-bold" : ""}`}>
                                    Stats
                                </div> */}
                                <div onClick={() => { menuOpen(); handleNavigation("/", "contact"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "contact" ? "font-bold" : ""}`}>
                                    Contact
                                </div>
                            </nav>

                            <div className="flex justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <a href="https://github.com/arbhalerao" target="_blank" rel="noopener noreferrer" className="mx-3">
                                    <BsGithub className="text-2xl text-orange-400" />
                                </a>
                                <a href="https://arbhalerao.medium.com/" target="_blank" rel="noopener noreferrer" className="mx-3">
                                    <BsMedium className="text-2xl text-green-400" />
                                </a>
                                <a href="https://www.linkedin.com/in/arbhalerao/" target="_blank" rel="noopener noreferrer" className="mx-3">
                                    <BsLinkedin className="text-2xl text-blue-400" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
