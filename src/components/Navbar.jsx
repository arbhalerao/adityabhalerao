import { useState, useEffect } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { TbBrandGithub, TbBrandLinkedin, TbBrandMedium } from "react-icons/tb";
import { useNavigateAndScroll } from "../hooks/useNavigateAndScroll";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const navigateAndScroll = useNavigateAndScroll();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    const RESUME_URL = "https://drive.google.com/file/d/12k8htg9CS3fOwn5GKpeUynS15ZxbMGE2/view";

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
            const sections = ['hero', 'tech', 'experience', 'projects', 'oss', 'blogs', 'papershelf', 'contact'];
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
        <div className="fixed top-0 w-full flex justify-center z-10">
            <div className="w-full border-b border-black hover:border-brand transition-colors bg-[#f3f3f3]">
              <div className="w-full px-8 py-4 flex items-center">
                <div className="flex-1 flex justify-center">
                  <span className="text-brand text-3xl select-none">&lt;</span>
                </div>
                <div className="flex items-center gap-10">
                <div onClick={() => handleNavigation("/", "hero")} className="cursor-pointer">
                    {mounted && (
                        <img src={logoSrc} alt="Aditya Logo" className="h-10 w-10" />
                    )}
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-8 items-center">
                    <li onClick={() => handleNavigation("/", "hero")} className={getNavItemClass("hero")}>Intro</li>
                    <li onClick={() => handleNavigation("/", "tech")} className={getNavItemClass("tech")}>Tech</li>
                    <li onClick={() => handleNavigation("/", "experience")} className={getNavItemClass("experience")}>Experience</li>
                    <li onClick={() => handleNavigation("/", "oss")} className={getNavItemClass("oss")}>OSS</li>
                    <li onClick={() => handleNavigation("/", "projects")} className={getNavItemClass("projects")}>Projects</li>
                    <li onClick={() => handleNavigation("/", "blogs")} className={getNavItemClass("blogs")}>Blogs</li>
                    <li onClick={() => handleNavigation("/", "papershelf")} className={getNavItemClass("papershelf")}>Papershelf</li>
                    <li>
                        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
                            className="cursor-pointer transition-all duration-300 text-gray-700 dark:text-white opacity-70 hover:opacity-100">
                            Resume
                        </a>
                    </li>
                    <li onClick={() => handleNavigation("/", "contact")} className={getNavItemClass("contact")}>Contact</li>
                </ul>

                {/* Social Links */}
                <ul className="hidden md:flex gap-5 items-center">
                    <li className="cursor-pointer opacity-70 transition-all duration-300 hover:text-brand hover:opacity-100">
                        <a href="https://www.linkedin.com/in/arbhalerao/" target="_blank" rel="noopener noreferrer">
                            <TbBrandLinkedin className="text-2xl text-brand" strokeWidth={2.2} />
                        </a>
                    </li>
                    <li className="cursor-pointer opacity-70 transition-all duration-300 hover:text-brand hover:opacity-100">
                        <a href="https://github.com/arbhalerao" target="_blank" rel="noopener noreferrer">
                            <TbBrandGithub className="text-2xl text-brand" strokeWidth={2.2} />
                        </a>
                    </li>
                    <li className="cursor-pointer opacity-70 transition-all duration-300 hover:text-brand hover:opacity-100">
                        <a href="https://arbhalerao.medium.com/" target="_blank" rel="noopener noreferrer">
                            <TbBrandMedium className="text-2xl text-brand" strokeWidth={2.2} />
                        </a>
                    </li>
                </ul>

                {/* Mobile Menu Icon */}
                {isOpen ? (
                    <div className="flex items-center md:hidden">
                        <BiX className="block md:hidden text-4xl text-gray-800 dark:text-white" onClick={menuOpen} />
                    </div>
                ) : (
                    <div className="flex items-center md:hidden">
                        <BiMenu className="block md:hidden text-4xl text-gray-800 dark:text-white" onClick={menuOpen} />
                    </div>
                )}
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-brand text-3xl select-none">&gt;</span>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <div className="fixed top-20 left-0 right-0 mx-4 bg-[#f3f3f3] dark:bg-black rounded-lg border border-black shadow-md z-50">
                        <div className="p-4">
                            <nav className="flex flex-col space-y-3 text-center">
                                <div onClick={() => { menuOpen(); handleNavigation("/", "hero"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "hero" ? "font-bold" : ""}`}>
                                    Intro
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
                                <div onClick={() => { menuOpen(); handleNavigation("/", "blogs"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "blogs" ? "font-bold" : ""}`}>
                                    Blogs
                                </div>
                                <div onClick={() => { menuOpen(); handleNavigation("/", "papershelf"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "papershelf" ? "font-bold" : ""}`}>
                                    Papershelf
                                </div>
                                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" onClick={menuOpen}
                                    className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white">
                                    Resume
                                </a>
                                <div onClick={() => { menuOpen(); handleNavigation("/", "contact"); }}
                                    className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-lg text-gray-900 dark:text-white ${activeSection === "contact" ? "font-bold" : ""}`}>
                                    Contact
                                </div>
                            </nav>

                            <div className="flex justify-center mt-4 pt-4 border-t border-black dark:border-gray-800">
                                <a href="https://www.linkedin.com/in/arbhalerao/" target="_blank" rel="noopener noreferrer" className="mx-3">
                                    <TbBrandLinkedin className="text-2xl text-brand" strokeWidth={2.2} />
                                </a>
                                <a href="https://github.com/arbhalerao" target="_blank" rel="noopener noreferrer" className="mx-3">
                                    <TbBrandGithub className="text-2xl text-brand" strokeWidth={2.2} />
                                </a>
                                <a href="https://arbhalerao.medium.com/" target="_blank" rel="noopener noreferrer" className="mx-3">
                                    <TbBrandMedium className="text-2xl text-brand" strokeWidth={2.2} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
              </div>
            </div>
        </div>
    );
};

export default Navbar;